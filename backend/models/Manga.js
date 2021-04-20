const {Schema, model} = require ('mongoose');

const MangaSchema = new Schema ({
	title: {type: String, required: true},
	author: {type: String, required: true},
	description: {type: String},
	imagePath: {type: String},
	date: {type: Date, default: Date.now}
}, {
	versionKey: false
});

module.exports = model ('Manga', MangaSchema);