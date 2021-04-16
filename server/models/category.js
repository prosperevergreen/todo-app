const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = new Schema({
	userId: {
		type: String,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	createdOn: {
		type: Date,
		default: Date.now,
	},
});

// Omit the version key when serialized to JSON
categorySchema.set("toJSON", { virtuals: false, versionKey: false });

const Category = new mongoose.model("Category", categorySchema);

module.exports = Category;
