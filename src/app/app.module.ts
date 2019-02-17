import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
import { QuestionModule } from '../question/question.module';

@Module({
    imports: [TypeOrmModule.forRoot(), UserModule, QuestionModule],
    controllers: [],
    providers: [],
})
export class AppModule {}
