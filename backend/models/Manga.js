const { Schema, model } = require('mongoose');

const MangaSchema = new Schema({
    tilte: { type: String, required: true },
    author: { type: String, required: true},
    isbn: { type: String, required: true },
    imagePath: { type: String, required: true },
    data: { type: Date, default: Date.now}
})

module.exports = model('Manga', MangaSchema);