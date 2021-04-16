const express = require("express");
const router = express.Router();

const dbUtils = require("../services/databaseUtils");
const User = require("../models/user.js");



/* GET user by id. */
router.get("/:userId", async function (req, res) {
	const userId = req.params.userId;
	try {
		const user = await dbUtils.getItemById(User, userId);
    const clientData = user.toObject();

		// delete the user's password
		delete clientData.password;

		res.json(clientData);
	} catch (err) {
		console.log(err);
		res.json({ err });
	}
});


/* GET all categories. */
router.get("/", async function (req, res) {
	try {
		const userItems = await dbUtils.getItemByField(User);
    const clientItems = userItems.map(item =>{
      const clientData = item.toObject();

      // delete the user's password
      delete clientData.password;
  
      return clientData
    })

		res.json(clientItems);
	} catch (err) {
		console.log(err);
		res.json({ err });
	}
});



/* Add a new user. */
router.put("/:userId", async function (req, res) {
	const userId = req.params.userId;
	const modifiedUser = req.body;

	try {
		const user = await dbUtils.updateItem(
			User,
			userId,
			modifiedUser
		);
		const clientData = user.toObject();

		// delete the user's password
		delete clientData.password;

		res.json(clientData);
	} catch (err) {
		console.log(err);
		res.json({ err });
	}
});

/* DELETE user by id. */
router.delete("/:userId", async function (req, res) {
	const userId = req.params.userId;
	try {
		const user = await dbUtils.deleteItemById(User, userId);
		const clientData = user.toObject();
		// delete the user's password
		delete clientData.password;
		res.json(clientData);
	} catch (err) {
		console.log(err);
		res.json({ err });
	}
});

/* reset the user collection. */
router.delete("/", async function (req, res) {
	const newUser = require("../database/testData");
  
	try {
		const userArr = await dbUtils.resetItems(User, newUser);
    const clientDataArr = userArr.map(user => {
      const client =  user.toObject();
      // delete the user's password
      delete client.password;
      return client
    })

		res.json(clientDataArr);
	} catch (err) {
		console.log(err);
		res.json({ err });
	}
});

module.exports = router;
