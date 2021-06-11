import bcrypt from "bcryptjs";
import {model, Schema, Types} from "mongoose";

import makeModelToJson, {IToJSONDoc} from "../tools/makeModelToJson";
import makeModelUpdateAt from "../tools/makeModelUpdateAt";

export interface IUserDoc extends IToJSONDoc {
    _id: Types.ObjectId
    username: string
    email: string
    password: string
    createdAt: Date
    updatedAt: Date

    encryptPassword: (password: string) => Promise<string>
    validatePassword: (password: string) => Promise<boolean>
}

const UserSchema = new Schema<IUserDoc>({
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now}
}, {
    versionKey: false
});

UserSchema.methods.encryptPassword = async function (password: string): Promise<string> {
    const salt = await bcrypt.genSalt(8);

    return bcrypt.hash(password, salt);
};

UserSchema.methods.validatePassword = function (password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
};

UserSchema.plugin(makeModelToJson, {hide: ['password']});
UserSchema.plugin(makeModelUpdateAt);

UserSchema
    .pre('save', async function (next) {
        if (Number.isNaN(bcrypt.getRounds(this.password))) {
            this.password = await this.encryptPassword(this.password);
        }

        next();
    });

export default model('User', UserSchema);