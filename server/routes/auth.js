const express = require("express");
const router = express.Router();

const dbUtils = require("../services/databaseUtils");
const authUtils = require("../services/authUtils");
const User = require("../models/user.js");

/* LOGIN */
router.get("/", async function (req, res) {
	// get the auth header details or error
	const headerData = authUtils.authWithBasic(req);
	// check for errors
	if (headerData.errorCode)
		return res
			.status(headerData.errorCode)
			.json({ error: headerData.errorMsg });

	// extract the auth details
	const [username, password] = headerData.data;

	try {
		// search user by there username
		const user = await dbUtils.getItemByField(User, { username });

		// check is user exists
		if (user.length === 0)
			return res
				.status(401)
				.json({ error: "No user with the provided username" });

		// Check if password is correct
		if (!user[0].checkPassword(password))
			return res.status(401).json({ error: "Invalid password" });

		// Create token
		const tokenData = authUtils.createJWTWebToken({
			username: user[0].username,
			password,
		});

		// Check if error on creating token
		if (tokenData.errorCode)
			return res
				.status(tokenData.errorCode)
				.json({ error: tokenData.errorMsg });

		const clientData = user[0].toObject();

		// delete the user's password
		delete clientData.password;

		res.json({ user: clientData, token: tokenData.data });
	} catch (error) {
		console.log(error);
		res.status(500).json({ error });
	}
});

/* REGISTER */
router.post("/", async function (req, res) {
	// Get the header data containing username and password
	const headerData = authUtils.authWithBasic(req);

	// Check if error occured
	if (headerData.errorCode)
		return res
			.status(headerData.errorCode)
			.json({ error: headerData.errorMsg });

	const [username, password] = headerData.data;

	// Check if username is provided
	if (!username)
		return res.status(401).json({ error: "Username cannot be empty" });

	// Check password length
	if (password.length < 4)
		return res.status(401).json({ error: "Password must be greater than or equal to 4" });

	try {
		// create user
		const user = await dbUtils.addItem(User, { username, password });

		// create token for user
		const tokenData = authUtils.createJWTWebToken({ username, password });

		// check for token error
		if (tokenData.errorCode)
			return res
				.status(tokenData.errorCode)
				.json({ error: tokenData.errorMsg });

		const clientData = user.toObject();

		// delete the user's password
		delete clientData.password;

		res.json({ user: clientData, token: tokenData.data });
	} catch (error) {
		console.log(error);
		res.status(500).json({ error });
	}
});

module.exports = router;
