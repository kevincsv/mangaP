// *******************   REQUIREMENTS   ******************* \\
if (process.env.NODE_ENV !== 'production') {
	require ('dotenv').config ();
}
const express = require ('express');
const morgan = require ('morgan');
const multer = require ('multer');
const path = require ('path');

// *******************   INITIALIZATIONS   ******************* \\
const app = express ();
const customGet = (req, _res, next) => {
	const shallowReq = {
		headers: req.headers,
		get: req.get
	};
	req.get = (key, defaultValue) => shallowReq.get (key) || req.query[ key ] || req.params[ key ] || req.body[ key ] || defaultValue;
	next ();
};
app.use (customGet);

require ('./database');

// *******************   SERVER SETTINGS   ******************* \\
app.set ('port', process.env.PORT || 3000);
app.set ('json spaces', 2);

// *******************   MIDDLEWARES   ******************* \\
app.use (morgan ('dev'));
const storage = multer.diskStorage ({
	destination: path.join (__dirname, 'public/uploads'),
	filename (req, file, cb) {
		cb (null, new Date ().getTime () + path.extname (file.originalname));
	}
});
app.use (multer ({storage}).single ('image'));
app.use (express.urlencoded ({extended: false}));
app.use (express.json ());

// *******************   STATIC FILES  ******************* \\
app.use (express.static (path.join (__dirname, 'public')));

// *******************   SERVER ROUTES   ******************* \\
app.use ('/mangas', require ('./routes/manga'));
app.use ('/users', require ('./controllers/authController'));
app.use ('/', require ('./routes/redirections'));

// *******************   LOG FOR SERVER STARTING   ******************* \\
app.listen (app.get ('port'), () => {
	console.log (`Server on port ${app.get ('port')}`);
});