import {Document, model, Schema, Types, PaginateModel,} from "mongoose";
import mongoosePagination from "mongoose-paginate-v2";

import makeModelFileDelete from "../tools/makeModelFileDelete";
import makeModelSearch, {ISearchModel} from "../tools/makeModelSearch";
import makeModelToJson, {IToJSONDoc} from "../tools/makeModelToJson";
import makeModelUpdateAt from "../tools/makeModelUpdateAt";

interface IMangaDoc extends IToJSONDoc {
    _id: Types.ObjectId
    title: string
    author: string
    genre: string
    description: string
    imageKey: string
    imagePath: string
    createdAt: Date
    updatedAt: Date
}

export interface IMangaModel<T extends Document> extends PaginateModel<T>, ISearchModel<T> {
}

const MangaSchema = new Schema<IMangaDoc>({
    title: {type: String, required: false, unique: true},
    author: {type: String, required: false},
    genre: {type: String, required: false},
    description: {type: String},
    imageKey: {type: String},
    imagePath: {type: String},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now}
}, {
    versionKey: false
});

MangaSchema.plugin(makeModelFileDelete, {field: 'imageKey'});
MangaSchema.plugin(makeModelSearch, {indexName: process.env.ALGOLIA_INDEX_MANGA});
MangaSchema.plugin(makeModelToJson);
MangaSchema.plugin(makeModelUpdateAt);
// @ts-ignore
MangaSchema.plugin(mongoosePagination);

const Manga = model<IMangaDoc, IMangaModel<IMangaDoc>>('Manga', MangaSchema);

Manga.SyncToAlgolia();
Manga.SetAlgoliaSettings({
    searchableAttributes: ['title', 'author']
});

export default Manga;