const fs = require('fs');
const AWS = require('aws-sdk');

let s3 = new AWS.S3({
	accessKeyId: process.env.AWS_SECRET_ID,
	secretAccessKey: process.env.AWS_SECRET_KEY,
	Bucket: process.env.BUCKET_NAME,
	Region: process.env.REGION
});

async function uploadToS3(file) {

	const fileContent = fs.createReadStream(file.path);

	try {
		const params = {
			Bucket: process.env.BUCKET_NAME,
			Key: file.filename,
			Body: fileContent
		};

		return await s3.upload(params).promise();
	} catch (err) {
		throw new Error(`S3 upload error: ${err.message}`);
	}
}

function getFileStream(fileKey) {
	try {
		const downloadParams = {
			Key: fileKey,
			Bucket: process.env.BUCKET_NAME
		};

		return s3.getObject(downloadParams).createReadStream();
	} catch (err) {
		console.log(err);
	}
}

exports.uploadToS3 = uploadToS3;

exports.getFileStream = getFileStream;

