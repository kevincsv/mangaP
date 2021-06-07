const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const path = require('path');
const {uuid} = require('uuidv4');

const fileFilter = require('./imageValidator');

const s3 = new aws.S3({
	accessKeyId: process.env.AWS_SECRET_ID,
	secretAccessKey: process.env.AWS_SECRET_KEY,
	Bucket: process.env.AWS_BUCKET_NAME,
	Region: process.env.AWS_REGION
});

exports.uploadToS3 = (folder = '') => multer({
	fileFilter,
	storage: multerS3({
		s3,
		bucket: 'rest-manga-bk',
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

	return s3.deleteObject(params, (err, data) => {
		if (err) {
			console.log(err);
		} else {
			console.log(data);
		}
	}).promise();
};