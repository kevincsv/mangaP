import {body} from "express-validator";

import User, {IUserDoc} from "../models/User";

export const signup = [
    body('username')
        .trim(),

    body('email')
        .trim()
        .normalizeEmail()
];

export const signin = [
    body('email')
        .trim()
        .normalizeEmail()
        .customSanitizer((value, {req}) => User.findOne({email: value}).then((user: IUserDoc) => {
            req.user = user;
        }))
];


