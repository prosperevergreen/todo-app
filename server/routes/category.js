const express = require("express");
const router = express.Router();

const dbUtils = require("../services/databaseUtils");
const authUtils = require("../services/authUtils");
const Category = require("../models/category.js");
const User = require("../models/user.js");

/* GET all categories. */
router.get("/all", async function (req, res) {
	try {
		const categoryItems = await dbUtils.getItemByField(Category);
		res.json(categoryItems);
	} catch (err) {
		console.log(err);
		res.json({ err });
	}
});

/* GET category by id. */
router.get("/:categoryId", async function (req, res) {
	const categoryId = req.params.categoryId;
	try {
		const category = await dbUtils.getItemById(Category, categoryId);
		res.json(category);
	} catch (err) {
		console.log(err);
		res.json({ err });
	}
});

/* GET category all for current user.*/
router.get("/", async function (req, res) {
	try {
		const {userId} = authUtils.verifiedUserData(req);
		const categoryItems = await dbUtils.getItemByField(Category, {userId});
		res.json(categoryItems);
	} catch (err) {
		console.log(err);
		res.json({ err });
	}
});

/* Add a new category. */
router.post("/", async function (req, res) {
	const newCategory = req.body;
	try {
		const {username} = authUtils.verifiedUserData(req);
		const user = await dbUtils.getItemByField(User, {username})
		newCategory.userId = user[0].id;
		const category = await dbUtils.addItem(Category, newCategory);
		res.json(category);
	} catch (err) {
		console.log(err);
		res.json({ err });
	}
});

/* Add a new category. */
router.put("/:categoryId", async function (req, res) {
	const categoryId = req.params.categoryId;
	const modifiedCategory = req.body;

	try {
		const {username} = authUtils.verifiedUserData(req);
		const user = await dbUtils.getItemByField(User, {username})
		modifiedCategory.userId = user.id;
		const category = await dbUtils.updateItem(
			Category,
			categoryId,
			modifiedCategory
		);
		res.json(category);
	} catch (err) {
		console.log(err);
		res.json({ err });
	}
});

/* DELETE category by id. */
router.delete("/:categoryId", async function (req, res) {
	const categoryId = req.params.categoryId;
	try {
		const category = await dbUtils.deleteItemById(Category, categoryId);
		res.json(category);
	} catch (err) {
		console.log(err);
		res.json({ err });
	}
});

module.exports = router;
