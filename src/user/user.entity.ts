import { Exclude } from 'class-transformer';
import {
    Column,
    Generated,
    Entity,
    CreateDateColumn,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Question } from '../question/question.entity';
import { Comment } from '../comment/comment.entity';
import { Answer } from '../answer/answer.entity';
import { Vote } from '../vote/vote.entity';

@Entity()
export class User {
    @Exclude()
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Generated('uuid')
    uuid: string;

    @Column()
    username: string;

    @Column({ nullable: true })
    displayName: string;

    @Column()
    email: string;

    @Exclude()
    @Column({ nullable: true })
    passwordHash: string;

    @Column({ nullable: true, default: null })
    passwordResetHash: string;

    @Column({ nullable: true, default: null, type: 'bigint' })
    passwordResetExpiry: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(type => Question, question => question.author)
    questions: Question[];

    @OneToMany(type => Answer, answer => answer.author)
    answers: Answer[];

    @OneToMany(type => Comment, comment => comment.author)
    comments: Comment[];

    @OneToMany(type => Vote, vote => vote.voter)
    votes: Vote[];

    constructor(partial: Partial<User>) {
        Object.assign(this, partial);
    }
}
