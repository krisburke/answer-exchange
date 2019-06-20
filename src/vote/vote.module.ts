import { Module } from '@nestjs/common';
import { VoteService } from './vote.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vote } from './vote.entity';
import { UserModule } from '../user/user.module';
import { QuestionModule } from '../question/question.module';
import { AnswerModule } from '../answer/answer.module';
import { UserService } from '../user/user.service';
import { QuestionService } from '../question/question.service';
import { AnswerService } from '../answer/answer.service';
import { VoteController } from './vote.controller';
import { VoteRepository } from './vote.repository';

@Module({
    imports: [
        TypeOrmModule.forFeature([Vote, VoteRepository]),
        UserModule,
        QuestionModule,
        AnswerModule,
    ],
    providers: [VoteService, UserService, QuestionService, AnswerService],
    controllers: [VoteController],
})
export class VoteModule {}
