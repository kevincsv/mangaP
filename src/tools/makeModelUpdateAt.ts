import {Document, Schema} from "mongoose";

interface ISchema extends Document {
    updatedAt: Date
}

export default <T extends ISchema>(schema: Schema<T>) => {
    schema.pre(['save', 'updateOne'], function (next) {
        this.updatedAt = new Date;

        next();
    });
};