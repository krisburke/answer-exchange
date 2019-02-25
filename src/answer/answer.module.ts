import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnswerService } from './answer.service';
import { AnswerController } from './answer.controller';
import { Answer } from './answer.entity';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';
import { QuestionModule } from '../question/question.module';
import { QuestionService } from '../question/question.service';

@Module({
    imports: [TypeOrmModule.forFeature([Answer]), QuestionModule, UserModule],
    providers: [AnswerService, QuestionService, UserService],
    controllers: [AnswerController],
    exports: [AnswerService],
})
export class AnswerModule {}
