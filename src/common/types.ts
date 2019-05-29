export interface QueryParams {
    expand?: string;
}

export enum BaseField {
    Question = 'question',
    Answer = 'answer',
    Comment = 'comment',
    Tag = 'tag',
    User = 'user',
}
