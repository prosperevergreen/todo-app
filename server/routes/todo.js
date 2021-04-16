const express = require("express");
const router = express.Router();

const dbUtils = require("../utility/databaseUtils");
const Todo = require("../models/todo.js");

/* GET todo by categoryId. */
router.get("/:categoryId", async function (req, res) {
	const categoryId = req.params.categoryId;
	try {
		const todo = await dbUtils.getItemByField(Todo, {categoryId});
		res.json(todo);
	} catch (error) {
		console.log(error);
		res.status(500).json({ error });
	}
});

/* GET all categories. */
router.get("/", async function (req, res) {
	try {
		const todoItems = await dbUtils.getItemByField(Todo);
		res.json(todoItems);
	} catch (error) {
		console.log(error);
		res.status(500).json({ error });
	}
});


/* Add a new todo. */
router.post("/", async function (req, res) {
	const newTodo = req.body;
	try {
		const todo = await dbUtils.addItem(Todo, newTodo);
		res.json(todo);
	} catch (error) {
		console.log(error);
		res.status(500).json({ error });
	}
});

/* Add a new todo. */
router.put("/:todoId", async function (req, res) {
	const todoId = req.params.todoId;
	const modifiedTodo = req.body;

	try {
		const todo = await dbUtils.updateItem(
			Todo,
			todoId,
			modifiedTodo
		);
		res.json(todo);
	} catch (error) {
		console.log(error);
		res.status(500).json({ error });
	}
});


/* DELETE todo by id. */
router.delete("/:todoId", async function (req, res) {
	const todoId = req.params.todoId;
	try {
		const todo = await dbUtils.deleteItemById(Todo, todoId);
		res.json(todo);
	} catch (error) {
		console.log(error);
		res.status(500).json({ error });
	}
});



module.exports = router;
