import {body} from 'express-validator';

import User, {IUserDoc} from '../models/User';

// *******************   SIGNUP   ******************* \\
export const signup = [
        body('username', 'Username is required and can not be blank')
            .notEmpty()

            .custom((value) => User.findOne({username: value}).then((user: IUserDoc) => {
                if (user) {
                    return Promise.reject('Username already in use');
                }
            })),

        body('email', 'Email must be valid and can not be blank')
            .isEmail()

            .custom((value) => User.findOne({email: value}).then((user: IUserDoc) => {
                if (user) {
                    return Promise.reject('E-mail already in use');
                }
            })),

        body('password', 'Password is required and must be  alphanumeric only')
            .isAlphanumeric(),

        body('confirmPassword')
            .isAlphanumeric()

            .custom((value, {req}) => {
                if (value !== req.get('password')) {
                    throw new Error('Password confirmation does not match password');
                }
                return true;
            })
    ]
;


// *******************   SIGNING   ******************* \\
export const signin = [
    body('email', 'Email must be valid and can not be blank')
        .isEmail(),

    body('password', 'Password is required and must be alphanumeric only')
        .isAlphanumeric()

        .notEmpty()

        .custom((value, {req}) => User.findOne({email: req.get('email')}).then(async (user: IUserDoc) => {
            const rejection = {
                message: 'Credentials not found',
                code: 401
            };

            if (!user) {
                return Promise.reject(rejection);
            }

            const validPassword = await user.validatePassword(req.get('password'));
            if (!validPassword) {
                return Promise.reject(rejection);
            }
        }))
];