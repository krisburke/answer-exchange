import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { Comment } from './comment.entity';
import { QuestionModule } from '../question/question.module';
import { UserModule } from '../user/user.module';
import { QuestionService } from '../question/question.service';
import { UserService } from '../user/user.service';
import { AnswerModule } from '../answer/answer.module';
import { AnswerService } from '../answer/answer.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Comment]),
        QuestionModule,
        UserModule,
        AnswerModule,
    ],
    providers: [CommentService, QuestionService, UserService, AnswerService],
    controllers: [CommentController],
})
export class CommentModule {}
