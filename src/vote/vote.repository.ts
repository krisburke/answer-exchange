import { EntityRepository, Repository } from 'typeorm';
import { Vote } from './vote.entity';

@EntityRepository(Vote)
export class VoteRepository extends Repository<Vote> {
    async getQuestionVoteCount(questionUuid: string): Promise<number> {
        const result = await this.createQueryBuilder('vote')
            .select(
                `SUM(case when vote.rating = '1' then 1 else 0 end)`,
                'positiveVoteTotal',
            )
            .addSelect(
                `SUM(case when vote.rating = '-1' then 1 else 0 end)`,
                'negativeVoteTotal',
            )
            .leftJoinAndSelect('vote.question', 'question')
            .where('question.uuid = :uuid', { uuid: questionUuid })
            .groupBy('vote.questionId')
            .getRawOne();

        if (!result) {
            return 0;
        }

        const { positiveVoteTotal = 0, negativeVoteTotal = 0 } = result;
        return (
            parseInt(positiveVoteTotal, 10) - parseInt(negativeVoteTotal, 10)
        );
    }

    async getAnswerVoteCount(answerUuid: string): Promise<number> {
        const result = await this.createQueryBuilder('vote')
            .select(
                `SUM(case when vote.rating = '1' then 1 else 0 end)`,
                'positiveVoteTotal',
            )
            .addSelect(
                `SUM(case when vote.rating = '-1' then 1 else 0 end)`,
                'negativeVoteTotal',
            )
            .leftJoinAndSelect('vote.answer', 'answer')
            .where('answer.uuid = :uuid', { uuid: answerUuid })
            .groupBy('vote.answerId')
            .getRawOne();

        if (!result) {
            return 0;
        }

        const { positiveVoteTotal = 0, negativeVoteTotal = 0 } = result;
        return (
            parseInt(positiveVoteTotal, 10) - parseInt(negativeVoteTotal, 10)
        );
    }
}
