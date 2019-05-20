import { Exclude } from 'class-transformer';
import {
    Column,
    PrimaryGeneratedColumn,
    Entity,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToMany,
    Generated,
} from 'typeorm';
import { Question } from '../question/question.entity';

@Entity()
export class Tag {
    @Exclude()
    @PrimaryGeneratedColumn()
    id: number;

    @Generated('uuid')
    uuid: string;

    @Column()
    slug: string;

    @CreateDateColumn()
    createdAt: Date;

    @ManyToMany(type => Question, question => question.tags)
    questions: Question[];

    constructor(partial: Partial<Tag>) {
        Object.assign(this, partial);
    }
}
