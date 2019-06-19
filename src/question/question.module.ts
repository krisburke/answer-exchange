import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionService } from './question.service';
import { QuestionController } from './question.controller';
import { Question } from './question.entity';
import { UserModule } from '../user/user.module';
import { AuthModule } from '../auth/auth.module';
import { TagModule } from '../tag/tag.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Question]),
        UserModule,
        AuthModule,
        TagModule,
    ],
    providers: [QuestionService],
    controllers: [QuestionController],
    exports: [QuestionService],
})
export class QuestionModule {}
