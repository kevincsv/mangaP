const {Schema, model} = require('mongoose');

const makeModelToJson = require('../tools/makeModelToJson');
const makeModelUpdateAt = require('../tools/makeModelUpdateAt');

const MangaSchema = new Schema({
	title: {type: String, required: true, unique: true},
	author: {type: String, required: true},
	description: {type: String},
	imagePath: {type: String},
	createdAt: {type: Date, default: Date.now},
	updatedAt: {type: Date, default: Date.now}
}, {
	versionKey: false
});

makeModelToJson({schema: MangaSchema});
makeModelUpdateAt(MangaSchema);

module.exports = model('Manga', MangaSchema);