import {query} from 'express-validator';

export default [
    query('sort', 'The sort value must be asc, desc, ascending or descending, by default it will always be ascending,')
        .optional({
            checkFalsy: true
        })
        .isIn(['asc', 'desc', 'ascending', 'descending']),

    query('page', 'The Page only accept integer numbers as value and can not be set to 0')
        .optional({
            checkFalsy: true
        })
        .isInt({min: 1}),

    query('limit', 'The Limit only accept integer numbers as value and can not be set to 0')
        .optional({
            checkFalsy: true
        })
        .isInt({min: 1, max: 1000})
];