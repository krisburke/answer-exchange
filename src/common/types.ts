export interface QueryParams {
    include?: IncludeOpts;
}

export enum IncludeOpts {
    Author = 'author',
    Questions = 'questions',
    Comments = 'comments',
    Answers = 'answers',
}
