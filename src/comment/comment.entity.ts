import { Exclude } from 'class-transformer';
import {
    Column,
    Generated,
    Entity,
    CreateDateColumn,
    UpdateDateColumn,
    PrimaryGeneratedColumn,
    ManyToOne,
} from 'typeorm';
import { User } from '../user/user.entity';
import { Question } from '../question/question.entity';
import { Answer } from '../answer/answer.entity';

@Entity()
export class Comment {
    @Exclude()
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Generated('uuid')
    uuid: string;

    @Column()
    text: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(type => User, user => user.comments)
    author: User;

    @ManyToOne(type => Question, question => question.comments)
    question: Question;

    @ManyToOne(type => Answer, answer => answer.comments)
    answer: Answer;

    constructor(partial: Partial<Comment>) {
        Object.assign(this, partial);
    }
}
