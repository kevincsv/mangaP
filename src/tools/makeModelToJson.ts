import {Document, Model, Schema} from "mongoose";

interface IToJSONOptions {
    hide?: string[]
}

export interface IToJSONDoc extends Document {
    $toJSON: () => { [key: string]: any };
}

export default function <T extends Document>(schema: Schema<T>, {hide = []}: IToJSONOptions = {}) {
    schema.methods.$toJSON = function () {
        const obj: { [key: string]: any } = this.toObject();

        for (const h of hide) {
            delete obj[h];
        }

        return obj;
    };
}