const mongoose = require('mongoose');

console.log(process.env.MONGODB_URI)

mongoose.connect(process.env.MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})
    .then(db => console.log('DB is now connected'))
    .catch(err => console.error(err));