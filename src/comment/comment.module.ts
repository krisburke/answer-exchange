import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { Comment } from './comment.entity';
import { QuestionModule } from '../question/question.module';
import { UserModule } from '../user/user.module';
import { QuestionService } from '../question/question.service';
import { UserService } from '../user/user.service';

@Module({
    imports: [TypeOrmModule.forFeature([Comment]), QuestionModule, UserModule],
    providers: [CommentService, QuestionService, UserService],
    controllers: [CommentController],
})
export class CommentModule {}
