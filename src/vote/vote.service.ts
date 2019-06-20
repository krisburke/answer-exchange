import {
    BadRequestException,
    Inject,
    Injectable,
    NotFoundException,
    UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Vote } from './vote.entity';
import { CreateVoteDto } from './dto/create-vote-dto';
import { UserService } from '../user/user.service';
import { QuestionService } from '../question/question.service';
import { AnswerService } from '../answer/answer.service';
import { UpdateVoteDto } from './dto/update-vote-dto';
import { BaseField, QueryParams } from '../common/types';
import { buildJoinOpts } from '../common/helpers';
import { VoteRepository } from './vote.repository';
import { User } from '../user/user.entity';
import { Question } from '../question/question.entity';
import { Answer } from '../answer/answer.entity';

@Injectable()
export class VoteService {
    constructor(
        @InjectRepository(VoteRepository)
        private readonly voteRepository: VoteRepository,
        @Inject(UserService)
        private readonly userService: UserService,
        @Inject(QuestionService)
        private readonly questionService: QuestionService,
        @Inject(AnswerService)
        private readonly answerService: AnswerService,
    ) {}

    async findOne(voteUuid: string, { expand }: QueryParams): Promise<Vote> {
        const vote = await this.voteRepository.findOne({
            where: { uuid: voteUuid },
            ...buildJoinOpts(BaseField.Vote, expand),
        });

        if (!vote) {
            throw new NotFoundException(
                `Vote with UUID: ${voteUuid} does not exist.`,
            );
        }

        return vote;
    }

    async create(createVoteDto: CreateVoteDto): Promise<Vote> {
        this.validateCreateVote(createVoteDto);
        const { rating, voterUuid, questionUuid, answerUuid } = createVoteDto;
        const isQuestionVote = !!questionUuid;

        const voter = await this.userService.findOne(voterUuid, {
            expand: 'none',
        });

        return isQuestionVote
            ? this.createQuestionVote(rating, voter, questionUuid)
            : this.createAnswerVote(rating, voter, answerUuid);
    }

    async createQuestionVote(rating, voter, questionUuid) {
        const question = await this.questionService.findOne(questionUuid, {
            expand: 'none',
        });

        const existingVote = await this.getExistingVote(voter, question, null);

        if (existingVote) {
            return this.update(existingVote.uuid, { rating });
        }

        return this.voteRepository.save(
            new Vote({
                rating,
                voter,
                question,
            }),
        );
    }

    async createAnswerVote(rating, voter, answerUuid) {
        const answer = await this.answerService.findOne(answerUuid, {
            expand: 'none',
        });

        const existingVote = await this.getExistingVote(voter, null, answer);

        if (existingVote) {
            return this.update(existingVote.uuid, { rating });
        }

        return this.voteRepository.save(
            new Vote({
                rating,
                voter,
                answer,
            }),
        );
    }

    async update(voteUuid: string, { rating }: UpdateVoteDto) {
        const voteToUpdate = await this.findOne(voteUuid, { expand: 'none' });
        Object.assign(voteToUpdate, { rating });
        return this.voteRepository.save(voteToUpdate);
    }

    private async getExistingVote(
        voter: User,
        question?: Question,
        answer?: Answer,
    ): Promise<Vote> {
        return this.voteRepository.findOne({
            where: {
                voter,
                ...(question && { question }),
                ...(answer && { answer }),
            },
        });
    }

    private validateCreateVote({ questionUuid, answerUuid }: CreateVoteDto) {
        if (questionUuid && answerUuid) {
            throw new UnprocessableEntityException(
                'Error: vote should be for an answer or a question, not both.',
            );
        }

        if (!questionUuid && !answerUuid) {
            throw new BadRequestException(
                'Error: request should include the uuid of either the question or answer to vote for.',
            );
        }
    }
}
