const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const path = require('path');
const {uuid} = require('uuidv4');

const imageRules = require('../rules/images');

const s3 = new aws.S3({
	accessKeyId: process.env.AWS_SECRET_ID,
	secretAccessKey: process.env.AWS_SECRET_KEY,
	Bucket: process.env.AWS_BUCKET_NAME,
	Region: process.env.AWS_REGION
});

exports.uploadToS3 = (folder = '', {fileFilter = imageRules} = {}) => multer({
	fileFilter,
	storage: multerS3({
		s3,
		bucket: process.env.AWS_BUCKET_NAME,
		metadata: function (req, file, cb) {
			cb(null, {fieldName: file.fieldname});
		},
		key: function (req, file, cb) {
			cb(null, folder + uuid() + path.extname(file.originalname));
		}
	})
});

exports.deleteImage = (imageKey) => {
	const params = {
		Bucket: process.env.AWS_BUCKET_NAME,
		Key: imageKey
	};

	return s3.deleteObject(params, (err) => {
		if (err) {
			throw err;
		}
	}).promise();
};