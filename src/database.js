const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, {
	useCreateIndex: true,
	useNewUrlParser: true,
	useFindAndModify: false,
	useUnifiedTopology: true
})
	.then(() => console.log('DB is now connected'))
	.catch(err => console.error(err));