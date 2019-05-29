import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { Question } from './question.entity';
import { CreateQuestionDto, UpdateQuestionDto } from './dto';
import { UserService } from '../user/user.service';
import { BaseField, QueryParams } from '../common/types';
import { buildJoinOpts } from '../common/helpers';

@Injectable()
export class QuestionService {
    constructor(
        @InjectRepository(Question)
        private readonly questionRepository: Repository<Question>,
        @Inject(UserService)
        private readonly userService: UserService,
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

    async findAll({ expand }: QueryParams): Promise<Question[]> {
        const findOptions: FindManyOptions = {
            ...buildJoinOpts(BaseField.Question, expand),
        };

        return this.questionRepository.find(findOptions);
    }

    async create(questionData: CreateQuestionDto): Promise<Question> {
        const { text, title, authorUserUuid } = questionData;

        const author = await this.userService.findOne(authorUserUuid, {
            expand: 'none',
        });

        const newQuestion = await this.questionRepository.save(
            new Question({ title, text, author }),
        );

        return this.questionRepository.save(newQuestion);
    }

    async update(
        uuid: string,
        questionData: UpdateQuestionDto,
    ): Promise<Question> {
        const questionToUpdate = await this.findOne(uuid, { expand: 'none' });
        Object.assign(questionToUpdate, questionData);
        return this.questionRepository.save(questionToUpdate);
    }

    async delete(uuid: string): Promise<void> {
        await this.questionRepository.delete({ uuid });
        return;
    }
}
