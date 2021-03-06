const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const todoSchema = new Schema({
	categoryId: {
		type: String,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	done: {
		type: Boolean,
		default: false,
	},
	createdOn: {
		type: Date,
		default: Date.now,
	},
});

// Omit the version key when serialized to JSON
todoSchema.set("toJSON", { virtuals: false, versionKey: false });

const Todo = new mongoose.model("Todo", todoSchema);

module.exports = Todo;
