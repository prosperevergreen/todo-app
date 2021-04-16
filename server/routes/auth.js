const express = require("express");
const router = express.Router();

const dbUtils = require("../utility/databaseUtils");
const User = require("../models/user.js");

/* LOGIN */
router.get("/", async function (req, res) {

	// extract the auth details
	const {username, password, token} = res.locals.credentials;

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

		const clientData = user[0].toObject();

		// delete the user's password
		delete clientData.password;

		res.json({ user: clientData, token });
	} catch (error) {
		console.log(error);
		res.status(500).json({ error });
	}
});

/* REGISTER */
router.post("/", async function (req, res) {

	const {username, password, token } = res.locals.credentials;

	// Check password length
	if (password.length < 4)
		return res.status(401).json({ error: "Password must be greater than or equal to 4" });

	try {
		// create user
		const user = await dbUtils.addItem(User, { username, password });

		const clientData = user.toObject();

		// delete the user's password
		delete clientData.password;

		res.json({ user: clientData, token });
	} catch (error) {
		console.log(error);
		res.status(500).json({ error });
	}
});

module.exports = router;
