import { Exclude } from 'class-transformer';
import {
    Column,
    Generated,
    Entity,
    CreateDateColumn,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    ManyToOne,
} from 'typeorm';
import { User } from '../user/user.entity';

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

    constructor(partial: Partial<Question>) {
        Object.assign(this, partial);
    }
}
