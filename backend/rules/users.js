const {check} = require ('express-validator');


exports.users = [
	check ('username', 'Username is required')
		.notEmpty (),
	check ('email', 'Email not valid')
		.isEmail (),
	check ('password', 'Password is required')
		.notEmpty ()
];