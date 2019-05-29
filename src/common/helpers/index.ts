import { BaseField } from '../types';

export function buildJoinOpts(
    baseFieldAlias: BaseField,
    expandQueryString: string,
) {
    const defaultExpandString: { [K in BaseField]: string } = {
        question: 'author,comments,answers,answers.comments,tags',
        answer: 'author,comments,question,question.comments',
        comment: 'author,question,answer',
        tag: 'questions',
        user: 'questions,answers,comments',
    };
    const expandString =
        expandQueryString || defaultExpandString[baseFieldAlias];

    const result = {
        join: {
            alias: baseFieldAlias,
            leftJoinAndSelect: {},
        },
    };

    if (expandString === 'none') {
        return {};
    }

    const expandList = expandString.split(',');
    expandList.forEach(expandItem => {
        const relationshipItems = expandItem.split('.');
        const relationshipLevels = relationshipItems.length;

        if (relationshipLevels === 2) {
            result.join.leftJoinAndSelect[relationshipItems[1]] = expandItem;
        }

        if (relationshipLevels === 1) {
            result.join.leftJoinAndSelect[
                expandItem
            ] = `${baseFieldAlias}.${expandItem}`;
        }
    });

    return result;
}
