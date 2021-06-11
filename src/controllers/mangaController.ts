import {Request, Response, NextFunction} from 'express'

import Manga from "../models/Manga";

// *******************   CRUD (Index)   ******************* \\
export const index = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const mangas = await Manga.search(req.$get('search'))
            .then(({model, query}) => model.paginate(query, req.pagination()));

        res.toJSON(mangas);
    } catch (err) {
        next(err);
    }
};

// *******************   CRUD (Show)   ******************* \\
export const show = async (req: Request, res: Response) => {
    res.toJSON(req.$get('manga'));
};

// *******************   CRUD (Create)   ******************* \\
export const create = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = req.$get(['title', 'author', 'genre', 'description']);
        const file = req.file as Express.MulterS3.File

        if (file) {
            data.imagePath = file.location
            data.imageKey = file.key;
        }
        const manga = await Manga.create(data);

        res.status(201).toJSON(manga);
    } catch (err) {
        next(err);
    }
};

// *******************   CRUD (Update)   ******************* \\
export const update = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = req.$get(['title', 'author', 'genre', 'description']);
        const manga = req.$get('manga');

        Object.assign(manga, data);
        await manga.save();

        res.toJSON(manga);
    } catch (err) {
        next(err);
    }
};

// *******************   CRUD (Delete)   ******************* \\
export const destroy = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const manga = req.$get('manga');

        await manga.delete();

        res.status(204).json('Manga deleted');
    } catch (err) {
        next(err);
    }
};