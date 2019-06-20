import { Exclude } from 'class-transformer';
import {
    Column,
    Generated,
    Entity,
    CreateDateColumn,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    ManyToOne,
    OneToMany,
} from 'typeorm';
import { User } from '../user/user.entity';
import { Comment } from '../comment/comment.entity';
import { Question } from '../question/question.entity';
import { Vote } from '../vote/vote.entity';

@Entity()
export class Answer {
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

    @ManyToOne(type => User, user => user.answers)
    author: User;

    @OneToMany(type => Comment, comment => comment.answer, { eager: true })
    comments: Comment[];

    @ManyToOne(type => Question, question => question.answers)
    question: Question;

    @OneToMany(type => Vote, vote => vote.answer)
    votes: Vote[];

    voteCount?: number;

    constructor(partial: Partial<Answer>) {
        Object.assign(this, partial);
    }
}
