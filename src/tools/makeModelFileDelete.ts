import {Document, Schema} from "mongoose";

import {deleteImage} from "./s3";

export default function <T extends Document>(schema: Schema<T>, {field = ''} = {}) {
    schema.post(['remove', 'deleteOne'], async (doc, next) => {
        await deleteImage(doc[field]);

        next();
    });
};