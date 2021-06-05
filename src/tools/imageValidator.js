const fileFilter = (req, file, cb, next) => {
	try {
		if (file.mimetype === 'image/jpeg' || 'image/png' || 'image/jpg') {
			cb(null, true);
		} else {
			cb(null, false);
			return cb(new Error('File format not supported'));
		}
	} catch (err) {
		next(err);
	}
};

module.exports = fileFilter;