import {Request, Response, NextFunction} from 'express'
import jwt from "jsonwebtoken";

import User from "../models/User";

const getToken = (userId: string) =>
    jwt.sign({id: userId}, `${process.env.JWT_SECRET}`, {
        expiresIn: process.env.JWT_TTL
    });

// *******************   SIGNUP   ******************* \\
export const signup = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = req.$get(['username', 'email', 'password']);
        const user = await User.create(data);


        res.status(201).toJSON(user, {
            included: {
                token: getToken(user._id)
            }
        });
    } catch (err) {
        next(err);
    }
};

// *******************   SHOW   ******************* \\
export const show = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.toJSON(req.user);
    } catch (err) {
        next(err);
    }
};


// *******************   SIGNING   ******************* \\
export const signin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req.user;

        res.toJSON(user, {
            included: {
                token: getToken(user._id)
            }
        });
    } catch (err) {
        next(err);
    }
};