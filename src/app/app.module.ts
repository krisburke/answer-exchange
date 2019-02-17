import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
import { QuestionModule } from '../question/question.module';
import { CommentModule } from '../comment/comment.module';
import { AnswerModule } from '../answer/answer.module';

@Module({
    imports: [
        TypeOrmModule.forRoot(),
        UserModule,
        QuestionModule,
        CommentModule,
        AnswerModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
