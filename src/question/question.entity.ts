import { Exclude } from 'class-transformer';
import {
    Column,
    Generated,
    Entity,
    CreateDateColumn,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    ManyToOne,
    ManyToMany,
    OneToMany,
    JoinTable,
} from 'typeorm';
import { User } from '../user/user.entity';
import { Comment } from '../comment/comment.entity';
import { Answer } from '../answer/answer.entity';
import { Tag } from '../tag/tag.entity';

@Entity()
export class Question {
    @Exclude()
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Generated('uuid')
    uuid: string;

    @Column()
    title: string;

    @Column()
    text: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(type => User, user => user.questions)
    author: User;

    @OneToMany(type => Comment, comment => comment.question, { eager: true })
    comments: Comment[];

    @OneToMany(type => Answer, answer => answer.question)
    answers: Answer[];

    @ManyToMany(type => Tag, tag => tag.questions)
    @JoinTable()
    tags: Tag;

    // todo add votes

    constructor(partial: Partial<Question>) {
        Object.assign(this, partial);
    }
}
