import {body, param} from "express-validator";

import Manga from "../models/Manga";

export const show = [
    param('manga').customSanitizer(value => Manga.findById(value))
];

export const create = [
    body('title').trim(),

    body('author').trim(),

    body('description').trim()
];

export const update = show.concat(create);

export const destroy = show;