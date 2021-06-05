const {Schema, model} = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const makeModelSearch = require('../tools/makeModelSearch');
const makeModelToJson = require('../tools/makeModelToJson');
const makeModelUpdateAt = require('../tools/makeModelUpdateAt');

const MangaSchema = new Schema({
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

MangaSchema.plugin(makeModelSearch, {indexName: process.env.ALGOLIA_INDEX_MANGA});
MangaSchema.plugin(makeModelToJson);
MangaSchema.plugin(makeModelUpdateAt);
MangaSchema.plugin(mongoosePaginate);

const Model = model('Manga', MangaSchema);

Model.SyncToAlgolia();
Model.SetAlgoliaSettings({
	searchableAttributes: ['title', 'author']
});

module.exports = model('Manga', MangaSchema);