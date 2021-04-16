const express = require("express");
const router = express.Router();

const dbUtils = require("../services/databaseUtils");
const Category = require("../models/category.js");

/* GET category by id. */
router.get("/id/:categoryId", async function (req, res) {
	const categoryId = req.params.categoryId;
	try {
		const category = await dbUtils.getItemById(Category, categoryId);
		res.json(category);
	} catch (err) {
		console.log(err);
		res.json({ err });
	}
});

/* GET category all. */
router.get("/:userId", async function (req, res) {
	const userId = req.params.userId;
	try {
		const categoryItems = await dbUtils.getItemByField(Category, {userId});
		res.json(categoryItems);
	} catch (err) {
		console.log(err);
		res.json({ err });
	}
});

/* GET all categories. */
router.get("/", async function (req, res) {
	try {
		const categoryItems = await dbUtils.getItemByField(Category);
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
