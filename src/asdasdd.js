const router = require('./tools/router')();

router.get('/', (req, res) => {
	res.send('hello world!');
});


module.exports = router;