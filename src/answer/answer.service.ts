import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Answer } from './answer.entity';
import { CreateAnswerDto, UpdateAnswerDto } from './dto';
import { UserService } from '../user/user.service';
import { QuestionService } from '../question/question.service';

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

    async findOne(uuid: string): Promise<Answer> {
        const answer = await this.answerRepository.findOne({ uuid });

        if (!answer) {
            throw new NotFoundException(
                `Answer with UUID: ${uuid} does not exist.`,
            );
        }

        return answer;
    }

    async create(answerData: CreateAnswerDto): Promise<Answer> {
        const { text, authorUserUuid, questionUuid } = answerData;

        const author = await this.userService.findOne(authorUserUuid);
        const question = await this.questionService.findOne(questionUuid);
        const answer = new Answer({ text, author, question });

        return this.answerRepository.save(answer);
    }

    async update(uuid: string, answerData: UpdateAnswerDto): Promise<Answer> {
        const answerToUpdate = await this.findOne(uuid);
        Object.assign(answerToUpdate, answerData);
        return this.answerRepository.save(answerToUpdate);
    }

    async delete(uuid: string): Promise<void> {
        await this.answerRepository.delete({ uuid });
        return;
    }
}
