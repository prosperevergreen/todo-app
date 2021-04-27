const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * Custom validator for user e-mail format
 *
 * @param { string } email - user email to be verified
 * @returns { boolean } - return the validity of the email
 */
const emailValidator = (email) => {
	return /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(
		email
	);
};

// Number that defines how well the hash is salted
const saltRounds = 10;

/**
 * Set method that hashes the password
 *
 * @param { string } pwd - user password to be hashed
 * @returns { string | boolean } - returns password hashed string or false if password length < 10
 */
const hashPwd = (pwd) => {
	const salt = bcrypt.genSaltSync(saltRounds);
	return bcrypt.hashSync(pwd, salt);
};

const userSchema = new Schema({
	// Mongoose automatically creates _id (ObjectId) to all schemas
	// username: {
	// 	// Validation for name
	// 	type: String,
	// 	required: true,
	// 	unique: true,
	// },
	email: {
		type: String,
		required: [true, "User email is required"],
		unique: [true, "User email already exists"],
		// Using custom validator
		validate: {
			validator: emailValidator,
			message: (props) => `${props.value} is not a valid email format`,
		},
	},
	password: {
		type: String,
		minlength: 4,
		// Set function that hashes the password
		set: hashPwd,
		required: true,
	},
	role:{
		type: String,
		enum:["admin","user"],
		required: true,
		default: "user"
	},
	createdOn: {
		type: Date,
		default: Date.now,
	},
});

/**
 * Compare supplied password with user's own (hashed) password
 *
 * @param {string} password - hashed password to be validated
 * @returns {Promise<boolean>} - promise that resolves to the comparison result
 */
userSchema.methods.checkPassword = function (password) {
	return bcrypt.compareSync(password, this.password);
};

// Omit the version key when serialized to JSON
userSchema.set("toJSON", { virtuals: false, versionKey: false });

const User = new mongoose.model("User", userSchema);

module.exports = User;
