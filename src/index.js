// *******************   REQUIREMENTS   ******************* \\
if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');

const apiErrorHandler = require('./middlewares/apiErrorHandler');
const makeReqGet = require('./tools/makeReqGet');
const makeResToJSON = require('./tools/makeResToJSON');
require('./database');

// *******************   INITIALIZATIONS   ******************* \\
mongoose.set('returnOriginal', false);
const app = express();

app.use(cors());
app.use(makeReqGet);
app.use(makeResToJSON);

// *******************   SERVER SETTINGS   ******************* \\
app.set('port', process.env.PORT || 4000);
app.set('json spaces', 2);

// *******************   MIDDLEWARES   ******************* \\
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// *******************   STATIC FILES  ******************* \\
app.use(express.static(path.join(__dirname, 'public')));

// *******************   SERVER ROUTES   ******************* \\
app.use('/mangas', require('./routes/mangas'));
app.use('/users', require('./routes/auth'));
app.use('/', require('./routes/redirections'));

// *******************   404 ERROR HANDLER    ******************* \\
app.use((_req, res) => {
	res.status(404).json({
		error: 'Unable to process your request!'
	});
});

// *******************   ERROR HANDLER    ******************* \\
app.use(apiErrorHandler);

// *******************   LOG FOR SERVER STARTING   ******************* \\
app.listen(app.get('port'), () => {
	console.log(`Server on port ${app.get('port')}`);
});