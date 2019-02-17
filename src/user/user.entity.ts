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

    @Column({ nullable: true }) // fixme tmp
    passwordHash: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(type => Question, question => question.author)
    questions: Question[];

    @OneToMany(type => Comment, comment => comment.author)
    comments: Comment[];

    constructor(partial: Partial<User>) {
        Object.assign(this, partial);
    }
}
