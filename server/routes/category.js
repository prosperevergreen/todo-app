const express = require("express");
const router = express.Router();

const dbUtils = require("../utility/databaseUtils");
const Category = require("../models/category.js");


/* GET category by id. */
router.get("/:categoryId", async function (req, res) {
	const categoryId = req.params.categoryId;
	try {
		const category = await dbUtils.getItemById(Category, categoryId);
		res.json(category);
	} catch (error) {
		console.log(error);
		res.status(500).json({ error });
	}
});

/* GET category all for current user.*/
router.get("/", async function (req, res) {
	const user = res.locals.userData;
	try {
		const categoryItems = await dbUtils.getItemByField(Category, ["admin", "root"].includes(user.username) ? {} : {userId: user._id} );
		res.json(categoryItems);
	} catch (error) {
		console.log(error);
		res.status(500).json({ error });
	}
});

/* Add a new category. */
router.post("/", async function (req, res) {
	const newCategory = req.body;
	const user = res.locals.userData;
	try {
		newCategory.userId = user._id;
		const category = await dbUtils.addItem(Category, newCategory);
		res.json(category);
	} catch (error) {
		console.log(error);
		res.status(500).json({ error });
	}
});

/* Add a new category. */
router.put("/:categoryId", async function (req, res) {
	const categoryId = req.params.categoryId;
	const modifiedCategory = req.body;
	const user = res.locals.userData;
	try {
		modifiedCategory.userId = user._id;
		const category = await dbUtils.updateItem(
			Category,
			categoryId,
			modifiedCategory
		);
		res.json(category);
	} catch (error) {
		console.log(error);
		res.status(500).json({ error });
	}
});

/* DELETE category by id. */
router.delete("/:categoryId", async function (req, res) {
	const categoryId = req.params.categoryId;
	try {
		const category = await dbUtils.deleteItemById(Category, categoryId);
		res.json(category);
	} catch (error) {
		console.log(error);
		res.status(500).json({ error });
	}
});

module.exports = router;
