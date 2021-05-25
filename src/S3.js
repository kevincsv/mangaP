require('dotenv').config();

const fs = require('fs');
const S3 = require('aws-sdk/clients/s3');

const bucketName = process.env.BUCKET_NAME;
const region = process.env.REGION;
const accessKey = process.env.AWSID;
const secretAccessKey = process.env.AWSSECRETKEY;

const s3 = new S3({
	region,
	accessKey,
	secretAccessKey
});


// uploads a file to s3

const uploadFile = (file) => {
	const fileStream = fs.createReadStream(file.path);

	const uploadParams = {
		Bucket: bucketName,
		Body: fileStream,
		key: file.filename
	};

	return s3.upload(uploadParams).promise();
};

exports.uploadFile = uploadFile;