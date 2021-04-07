const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://root:xZSVP4RLBlHkVPSG@clapi.b5nyc.mongodb.net/EM-API-INT?retryWrites=true", {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})
    .then(db => console.log('DB is now connected'))
    .catch(err => console.error(err));