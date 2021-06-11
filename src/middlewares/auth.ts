import {Request, Response, NextFunction} from 'express'
import jwt from 'jsonwebtoken';

import User from '../models/User';

export default async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const token = req.headers['x-access-token'];
        if (!token) {
            throw {status: 401, message: 'No token provided'};
        }

        const decoded = jwt.verify(`${token}`, `${process.env.JWT_SECRET}`);

        // @ts-ignore
        const user = await User.findById(decoded.id);
        if (!user) {
            throw {status: 401, message: 'Invalid token'};
        }

        req.user = user;

        next();
    } catch (err) {
        next(err);
    }
}