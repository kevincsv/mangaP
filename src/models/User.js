const {Schema, model} = require('mongoose');
const bcrypt = require('bcryptjs');

const makeModelToJson = require('../tools/makeModelToJson');
const makeModelUpdateAt = require('../tools/makeModelUpdateAt');

const UserSchema = new Schema({
	username: {type: String, required: true, unique: true},
	email: {type: String, required: true, unique: true},
	password: {type: String, required: true},
	createdAt: {type: Date, default: Date.now},
	updatedAt: {type: Date, default: Date.now}
}, {
	versionKey: false
});

UserSchema.methods.encryptPassword = async (password) => {
	const salt = await bcrypt.genSalt(8);

	return bcrypt.hash(password, salt);
};

UserSchema.methods.validatePassword = function (password) {
	return bcrypt.compare(password, this.password);
};

makeModelToJson({schema: UserSchema, hide: ['password']});
makeModelUpdateAt(UserSchema);

UserSchema
	.pre('save', async function (next) {
		if (Number.isNaN(bcrypt.getRounds(this.password))) {
			this.password = await this.encryptPassword(this.password);
		}

		next();
	});

module.exports = model('User', UserSchema);