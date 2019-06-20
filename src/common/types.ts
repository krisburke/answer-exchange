export interface QueryParams {
    expand?: string;
}

export interface FindQuestionArgs {
    expand?: string;
    skip: number;
    take: number;
}

export enum BaseField {
    Question = 'question',
    Answer = 'answer',
    Comment = 'comment',
    Tag = 'tag',
    User = 'user',
    Vote = 'vote',
}

export enum VoteRating {
    Upvote = 1,
    None = 0,
    Downvote = -1,
}
