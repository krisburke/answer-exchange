import { Exclude } from 'class-transformer';
import {
    Column,
    CreateDateColumn,
    Entity,
    Generated,
    ManyToOne,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { User } from '../user/user.entity';
import { Question } from '../question/question.entity';
import { Answer } from '../answer/answer.entity';
import { VoteRating } from '../common/types';

@Entity()
export class Vote {
    @Exclude()
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Generated('uuid')
    uuid: string;

    @Column({ type: 'enum', enum: VoteRating })
    rating: VoteRating;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(type => User, user => user.votes)
    voter: User;

    @ManyToOne(type => Question, question => question.votes)
    question: Question;

    @ManyToOne(type => Answer, answer => answer.votes)
    answer: Answer;

    constructor(partial: Partial<Vote>) {
        Object.assign(this, partial);
    }
}
