const {Router} = require ('express');
const jwt = require ('jsonwebtoken');

const router = Router ();

const User = require ('../models/User');
const verifyToken = require ('../middlewares/verifyToken');
const rules = require ('../rules/users');
const validator = require ('../tools/validator');

// *******************   SIGNUP   ******************* \\

router.post ('/signup', validator, rules, async (req, res) => {

	const {username, email, password} = req.body;
	const user = new User ({
		username,
		email,
		password
	});

	user.password = await user.encryptPassword (user.password);
	await user.save ();

	const token = jwt.sign ({id: user._id}, process.env.SECRET, {
		expiresIn: process.env.JWT_TTL
	});

	res.json ({auth: true, token});
});

// *******************   SIGNUP   ******************* \\


router.get ('/me', verifyToken, async (req, res) => {

	const user = await User.findById (req.userId, {password: 0, __v: 0});
	if (!user) {
		return res.status (404).json ('User not found');
	}

	res.json (user);
});


// *******************   SIGNING   ******************* \\

router.post ('/signing', async (req, res) => {

	const {email, password} = req.body;

	const user = await User.findOne ({email: email});
	if (!user) {
		return res.status (404).json ('The email doesn\'t exists');
	}

	const validPassword = await user.validatePassword (password);
	if (!validPassword) {
		return res.status (401).json ({
			auth: false,
			token: null
		});
	}

	const token = jwt.sign ({id: user._id}, process.env.SECRET, {
		expiresIn: process.env.JWT_TTL
	});

	res.json ({auth: true, token});
});

// *******************   SIGNING   ******************* \\


module.exports = router;