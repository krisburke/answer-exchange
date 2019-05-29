import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { Answer } from './answer.entity';
import { CreateAnswerDto, UpdateAnswerDto } from './dto';
import { UserService } from '../user/user.service';
import { QuestionService } from '../question/question.service';
import { BaseField, QueryParams } from '../common/types';
import { buildJoinOpts } from '../common/helpers';

@Injectable()
export class AnswerService {
    constructor(
        @InjectRepository(Answer)
        private readonly answerRepository: Repository<Answer>,
        @Inject(QuestionService)
        private readonly questionService: QuestionService,
        @Inject(UserService)
        private readonly userService: UserService,
    ) {}

    async findOne(uuid: string, { expand }: QueryParams): Promise<Answer> {
        const findOptions: FindOneOptions = {
            where: { uuid },
            ...buildJoinOpts(BaseField.Answer, expand),
        };

        const answer = await this.answerRepository.findOne(findOptions);

        if (!answer) {
            throw new NotFoundException(
                `Answer with UUID: ${uuid} does not exist.`,
            );
        }

        return answer;
    }

    async findAll(questionUuid: string, { expand }: QueryParams) {
        const question = await this.questionService.findOne(questionUuid, {
            expand: 'none',
        });

        const findOptions: FindManyOptions = {
            where: { question },
            ...buildJoinOpts(BaseField.Answer, expand),
        };

        return this.answerRepository.find(findOptions);
    }

    async create(answerData: CreateAnswerDto): Promise<Answer> {
        const { text, authorUserUuid, questionUuid } = answerData;

        const author = await this.userService.findOne(authorUserUuid, {
            expand: 'none',
        });
        const question = await this.questionService.findOne(questionUuid, {
            expand: 'none',
        });
        const answer = new Answer({ text, author, question });

        return this.answerRepository.save(answer);
    }

    async update(uuid: string, answerData: UpdateAnswerDto): Promise<Answer> {
        const answerToUpdate = await this.findOne(uuid, { expand: 'none' });
        Object.assign(answerToUpdate, answerData);
        return this.answerRepository.save(answerToUpdate);
    }

    async delete(uuid: string): Promise<void> {
        await this.answerRepository.delete({ uuid });
        return;
    }
}
