import {Request, Express} from 'express'
import {FileFilterCallback} from "multer";

export type ImageFilter = (req: Request, file: Express.MulterS3.File, cb: FileFilterCallback) => void

export default (req: Request, file: any, cb: FileFilterCallback) => {
    if (file.mimetype === 'image/jpeg' || 'image/png' || 'image/jpg') {
        cb(null, true);
    } else {
        cb(null, false);
        return cb(new Error('File format not supported'));
    }
};