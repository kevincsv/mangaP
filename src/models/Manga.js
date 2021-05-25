const {Schema, model} = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const mongooseAlgolia = require('mongoose-algolia');

require('dotenv').config();

const makeModelToJson = require('../tools/makeModelToJson');
const makeModelUpdateAt = require('../tools/makeModelUpdateAt');

const MangaSchema = new Schema({
	title: {type: String, required: true, unique: true},
	author: {type: String, required: true},
	genre: {type: String, required: true},
	description: {type: String},
	imagePath: {type: String},
	createdAt: {type: Date, default: Date.now},
	updatedAt: {type: Date, default: Date.now}
}, {
	versionKey: false
});

makeModelToJson({schema: MangaSchema});
makeModelUpdateAt(MangaSchema);

MangaSchema.plugin(mongoosePaginate);

MangaSchema.plugin(mongooseAlgolia, {
	appId: process.env.ALG_APP_ID,
	apiKey: process.env.ALG_ADMIN,
	indexName: process.env.ALG_DEV_INDEX,
	debug: true
});

const Model = model('Manga', MangaSchema);

Model.SyncToAlgolia();
Model.SetAlgoliaSettings({
	searchableAttributes: ['title', 'author']
});

module.exports = model('Manga', MangaSchema);