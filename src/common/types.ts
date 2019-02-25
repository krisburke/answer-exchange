export interface QueryParams {
    include?: IncludeOpts;
}

export enum IncludeOpts {
    Questions = 'questions',
    Comments = 'comments',
    Answers = 'answers',
}
