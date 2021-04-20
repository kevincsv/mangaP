const router = require ('../tools/router') ();

router.get ('/', router.makeMiddlewares ({auth: true}), (req, res) => {
	res.redirect ('/mangas');
});

module.exports = router;