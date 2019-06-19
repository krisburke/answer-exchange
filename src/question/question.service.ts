import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { Question } from './question.entity';
import { CreateQuestionDto, UpdateQuestionDto } from './dto';
import { UserService } from '../user/user.service';
import { BaseField, FindQuestionArgs, QueryParams } from '../common/types';
import { asyncForEach, buildJoinOpts } from '../common/helpers';
import { Pagination } from '../paginate/pagination';
import { Tag } from '../tag/tag.entity';
import { TagService } from '../tag/tag.service';

@Injectable()
export class QuestionService {
    constructor(
        @InjectRepository(Question)
        private readonly questionRepository: Repository<Question>,
        @Inject(UserService)
        private readonly userService: UserService,
        @Inject(TagService)
        private readonly tagService: TagService,
    ) {}

    async findOne(uuid: string, { expand }: QueryParams): Promise<Question> {
        const findOptions: FindOneOptions = {
            where: { uuid },
            ...buildJoinOpts(BaseField.Question, expand),
        };

        const question = await this.questionRepository.findOne(findOptions);

        if (!question) {
            throw new NotFoundException(
                `Question with UUID: ${uuid} does not exist.`,
            );
        }

        return question;
    }

    async findAll({
        expand,
        skip,
        take,
    }: FindQuestionArgs): Promise<Pagination<Question>> {
        const findOptions: FindManyOptions = {
            take,
            skip: skip * take,
            ...buildJoinOpts(BaseField.Question, expand),
        };

        const [results, total] = await this.questionRepository.findAndCount(
            findOptions,
        );

        return new Pagination<Question>({ results, total }, { take, skip });
    }

    async create(questionData: CreateQuestionDto): Promise<Question> {
        const { text, title, authorUserUuid, tagSlugs } = questionData;

        const author = await this.userService.findOne(authorUserUuid, {
            expand: 'none',
        });

        const tags = await this.handleFindOrCreateTags(tagSlugs);

        const newQuestion = new Question({
            title,
            text,
            author,
            ...(tags.length && { tags }),
        });

        return this.questionRepository.save(newQuestion);
    }

    async update(
        uuid: string,
        { text, title, tagSlugs }: UpdateQuestionDto,
    ): Promise<Question> {
        const questionToUpdate = await this.findOne(uuid, { expand: 'none' });
        const updatedFields: Partial<Question> = {
            text,
            title,
        };

        if (tagSlugs) {
            updatedFields.tags = await this.handleFindOrCreateTags(tagSlugs);
        }

        Object.assign(questionToUpdate, updatedFields);
        return this.questionRepository.save(questionToUpdate);
    }

    async delete(uuid: string): Promise<void> {
        await this.questionRepository.delete({ uuid });
        return;
    }

    private async handleFindOrCreateTags(tagSlugs: string[]): Promise<Tag[]> {
        if (!tagSlugs || !tagSlugs.length) {
            return [];
        }
        const tags = [];

        await asyncForEach(tagSlugs, async slug => {
            const tag =
                (await this.tagService.findOneBySlug(slug, {
                    expand: 'none',
                })) || (await this.tagService.create({ slug }));

            tags.push(tag);
        });

        return tags;
    }
}
