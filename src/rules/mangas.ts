import {body} from "express-validator";

import makeShowValidator from "../tools/makeShowValidator";
import Manga from "../models/Manga";

export const show = makeShowValidator('manga', Manga, 'Manga');

export const create = [
    // body('title', 'title is required')
    //     .notEmpty()
    //
    //     .custom((value) => Manga.find({title: value}).then(manga => {
    //         if (manga.length) {
    //             return Promise.reject('Manga already exists');
    //         }
    //     })),
    //
    // body('author', 'author is required')
    //     .notEmpty(),
    //
    // body('description', 'description is required')
    //     .notEmpty()
];

export const update = show.concat(create);

export const destroy = show;