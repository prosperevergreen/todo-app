const express = require("express");
const router = express.Router();

const dbUtils = require("../utility/databaseUtils");
const User = require("../models/user.js");



/* GET user by id. */
router.get("/:userId", async function (req, res) {
	const userId = req.params.userId;
  const currUser = res.locals.userData;
  if(!["admin", "root"].includes(currUser.username)) return res.status(403).json({ error: "Unauthorised user" });
	try {
		const user = await dbUtils.getItemById(User, userId);
    const clientData = user.toObject();

		// delete the user's password
		delete clientData.password;

		res.json(clientData);
	} catch (error) {
		console.log(error);
		res.status(500).json({ error });
	}
});


/* GET all users. */
router.get("/", async function (req, res) {
  const currUser = res.locals.userData;
  if(!["admin", "root"].includes(currUser.username)) return res.status(403).json({ error: "Unauthorised user" });
	try {
		const userItems = await dbUtils.getItemByField(User);
    const clientItems = userItems.map(item =>{
      const clientData = item.toObject();

      // delete the user's password
      delete clientData.password;
  
      return clientData
    })

		res.json(clientItems);
	} catch (error) {
		console.log(error);
		res.status(500).json({ error });
	}
});



/* Add a new user. */
router.put("/:userId", async function (req, res) {
	const userId = req.params.userId;
	const modifiedUser = req.body;
  const currUser = res.locals.userData;
  if(!["admin", "root"].includes(currUser.username)) return res.status(403).json({ error: "Unauthorised user" });
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
	} catch (error) {
		console.log(error);
		res.status(500).json({ error });
	}
});

/* DELETE user by id. */
router.delete("/:userId", async function (req, res) {
	const userId = req.params.userId;
  const currUser = res.locals.userData;
  if(!["admin", "root"].includes(currUser.username)) return res.status(403).json({ error: "Unauthorised user" });
	try {
		const user = await dbUtils.deleteItemById(User, userId);
		const clientData = user.toObject();
		// delete the user's password
		delete clientData.password;
		res.json(clientData);
	} catch (error) {
		console.log(error);
		res.status(500).json({ error });
	}
});

/* reset the user collection. */
router.delete("/", async function (req, res) {
	const newUser = require("../database/defaultData");
  const currUser = res.locals.userData;
  if(!["admin", "root"].includes(currUser.username)) return res.status(403).json({ error: "Unauthorised user" });
	try {
		const userArr = await dbUtils.resetItems(User, newUser);
    const clientDataArr = userArr.map(user => {
      const client =  user.toObject();
      // delete the user's password
      delete client.password;
      return client
    })

		res.json(clientDataArr);
	} catch (error) {
		console.log(error);
		res.status(500).json({ error });
	}
});

module.exports = router;
