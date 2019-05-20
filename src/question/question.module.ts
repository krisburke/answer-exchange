import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionService } from './question.service';
import { QuestionController } from './question.controller';
import { Question } from './question.entity';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';

@Module({
    imports: [TypeOrmModule.forFeature([Question]), UserModule],
    providers: [QuestionService, UserService],
    controllers: [QuestionController],
    exports: [QuestionService],
})
export class QuestionModule {}
