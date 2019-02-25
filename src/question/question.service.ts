import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question } from './question.entity';
import { CreateQuestionDto, UpdateQuestionDto } from './dto';
import { UserService } from '../user/user.service';
import { IncludeOpts, QueryParams } from '../common/types';

@Injectable()
export class QuestionService {
    constructor(
        @InjectRepository(Question)
        private readonly questionRepository: Repository<Question>,
        @Inject(UserService)
        private readonly userService: UserService,
    ) {}

    async findOne(uuid: string, { include }: QueryParams): Promise<Question> {
        const options = {
            where: { uuid },
            relations: [],
        };

        if (include === IncludeOpts.Answers) {
            options.relations.push(IncludeOpts.Answers);
        }
        if (include === IncludeOpts.Comments) {
            options.relations.push(IncludeOpts.Comments);
        }

        const question = await this.questionRepository.findOne(options);

        if (!question) {
            throw new NotFoundException(
                `Question with UUID: ${uuid} does not exist.`,
            );
        }

        return question;
    }

    async findAll({ include }: QueryParams): Promise<Question[]> {
        const options = {
            relations: [],
        };

        if (include === IncludeOpts.Answers) {
            options.relations.push(IncludeOpts.Answers);
        }
        if (include === IncludeOpts.Comments) {
            options.relations.push(IncludeOpts.Comments);
        }

        return this.questionRepository.find(options);
    }

    async create(questionData: CreateQuestionDto): Promise<Question> {
        const { text, title, authorUserUuid } = questionData;

        const author = await this.userService.findOne(authorUserUuid);

        const newQuestion = await this.questionRepository.save(
            new Question({ title, text, author }),
        );

        return this.questionRepository.save(newQuestion);
    }

    async update(
        uuid: string,
        questionData: UpdateQuestionDto,
    ): Promise<Question> {
        const questionToUpdate = await this.findOne(uuid, {});
        Object.assign(questionToUpdate, questionData);
        return this.questionRepository.save(questionToUpdate);
    }

    async delete(uuid: string): Promise<void> {
        await this.questionRepository.delete({ uuid });
        return;
    }
}
