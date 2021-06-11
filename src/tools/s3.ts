import S3 from 'aws-sdk/clients/s3'
import multer from "multer";
import multerS3 from "multer-s3";
import * as path from "path";
import {uuid} from "uuidv4";

import imageRules, {ImageFilter} from "../rules/images";

const s3 = new S3({
    accessKeyId: process.env.AWS_SECRET_ID,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    region: process.env.AWS_REGION
});


export const uploadToS3 = (folder = '', {fileFilter = imageRules}: { fileFilter?: ImageFilter } = {}) => multer({
    fileFilter,
    storage: multerS3({
        s3,
        bucket: process.env.AWS_BUCKET_NAME as string,
        // acl: 'public-read',
        metadata: function (req, file, cb: any) {
            cb(null, {fieldName: file.fieldname});
        },
        key: function (req, file, cb: any) {
            cb(null, folder + uuid() + path.extname(file.originalname));
        }
    })
});

export const deleteImage = (imageKey: string) => {
    const params = {
        Bucket: process.env.AWS_BUCKET_NAME as string,
        Key: imageKey
    };

    return s3.deleteObject(params, (err) => {
        if (err) {
            throw err;
        }
    }).promise();
};