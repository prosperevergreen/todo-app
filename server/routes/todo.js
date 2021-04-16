const express = require("express");
const router = express.Router();

const dbUtils = require("../services/databaseUtils");
const Todo = require("../models/todo.js");

/* GET todo by id. */
router.get("/:todoId", async function (req, res) {
	const todoId = req.params.todoId;
	try {
		const todo = await dbUtils.getItemById(Todo, todoId);
		res.json(todo);
	} catch (err) {
		console.log(err);
		res.json({ err });
	}
});

/* GET all categories. */
router.get("/", async function (req, res) {
	try {
		const todoItems = await dbUtils.getItemByField(Todo);
		res.json(todoItems);
	} catch (err) {
		console.log(err);
		res.json({ err });
	}
});


/* Add a new todo. */
router.post("/", async function (req, res) {
	const newTodo = req.body;
	try {
		const todo = await dbUtils.addItem(Todo, newTodo);
		res.json(todo);
	} catch (err) {
		console.log(err);
		res.json({ err });
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
	} catch (err) {
		console.log(err);
		res.json({ err });
	}
});


/* DELETE todo by id. */
router.delete("/:todoId", async function (req, res) {
	const todoId = req.params.todoId;
	try {
		const todo = await dbUtils.deleteItemById(Todo, todoId);
		res.json(todo);
	} catch (err) {
		console.log(err);
		res.json({ err });
	}
});



module.exports = router;
