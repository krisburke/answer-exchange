import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './comment.entity';
import { CreateCommentDto, UpdateCommentDto } from './dto';
import { QuestionService } from '../question/question.service';
import { UserService } from '../user/user.service';

@Injectable()
export class CommentService {
    constructor(
        @InjectRepository(Comment)
        private readonly commentRepository: Repository<Comment>,
        @Inject(QuestionService)
        private readonly questionService: QuestionService,
        @Inject(UserService)
        private readonly userService: UserService,
    ) {}

    async findOne(uuid: string): Promise<Comment> {
        const comment = await this.commentRepository.findOne({ uuid });

        if (!comment) {
            throw new NotFoundException(
                `Comment with UUID: ${uuid} does not exist.`,
            );
        }

        return comment;
    }

    async create(commentData: CreateCommentDto): Promise<Comment> {
        const { text, authorUserUuid, questionUuid } = commentData;

        const author = await this.userService.findOne(authorUserUuid);
        const question = await this.questionService.findOne(questionUuid);
        const comment = new Comment({ text, author, question });

        return this.commentRepository.save(comment);
    }

    async update(
        uuid: string,
        commentData: UpdateCommentDto,
    ): Promise<Comment> {
        const commentToUpdate = await this.findOne(uuid);
        Object.assign(commentToUpdate, commentData);
        return this.commentRepository.save(commentToUpdate);
    }

    async delete(uuid: string): Promise<void> {
        await this.commentRepository.delete({ uuid });
        return;
    }
}
