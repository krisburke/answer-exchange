import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question } from './question.entity';
import { CreateQuestionDto, UpdateQuestionDto } from './dto';
import { UserService } from '../user/user.service';

@Injectable()
export class QuestionService {
    constructor(
        @InjectRepository(Question)
        private readonly questionRepository: Repository<Question>,
        @Inject(UserService)
        private readonly userService: UserService,
    ) {}

    async findOne(uuid: string): Promise<Question> {
        const question = await this.questionRepository.findOne({
            where: { uuid },
            relations: ['answers'],
        });

        if (!question) {
            throw new NotFoundException(
                `Question with UUID: ${uuid} does not exist.`,
            );
        }

        return question;
    }

    async findAll(): Promise<Question[]> {
        return this.questionRepository.find();
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
        const questionToUpdate = await this.findOne(uuid);
        Object.assign(questionToUpdate, questionData);
        return this.questionRepository.save(questionToUpdate);
    }

    async delete(uuid: string): Promise<void> {
        await this.questionRepository.delete({ uuid });
        return;
    }
}
