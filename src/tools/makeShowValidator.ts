import {check} from "express-validator";
import {Model} from "mongoose";

export default (field: string, model: Model<any>, name: string) => {
    name = name || field;
    const message = `The ${name} doesn't exists`;

    return [
        check(field, {
            message,
            code: 400
        })
            .isMongoId()
            .exists({checkFalsy: true}),

        check(field)
            .custom(value =>
                model.findById(value)
                    .then(resource => {
                            if (!resource) {
                                return Promise.reject({
                                    message,
                                    code: 404
                                });
                            }
                        }
                    ))
    ];
};