const {check} = require ('express-validator');

const index = [
	check ('username', 'Username is required')
		.notEmpty (),
	check ('email', 'Email is not valid')
		.isEmail (),
	check ('email', 'Email is required')
		.notEmpty (),
	check ('password', 'Password is required')
		.notEmpty ()
];

module.exports = index;