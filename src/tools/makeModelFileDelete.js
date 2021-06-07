const {deleteImage} = require('../tools/s3');

module.exports = (Schema, {field = ''} = {}) => {
	Schema.post(['delete', 'remove', 'deleteOne'], async function (doc, next) {
		await deleteImage(doc[ field ]);

		next();
	});
};