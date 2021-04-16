

/**
 * Returns a document in a collection by it's id
 * 
 * @param {object} Model Mongoose Model for the item required
 * @param {string} itemId id of the document
 * @returns { Promise<object> } 
 */
function getItemById(Model, itemId) {
	return Model.findById(itemId).then((item) => item);
}

/**
 * Returns a document in a collection matching the provided field value
 * 
 * @param {object} Model Mongoose Model for the item required
 * @param {object} field field property of the document
 * @returns { Promise<object> } 
 */
 function getItemByField(Model, field) {
	return Model.find(field).then((item) => item);
}

/**
 * Deletes a document from a collection by it's id and returns the deleted document
 * 
 * @param {object} Model Mongoose Model for the item required
 * @param {string} itemId id of the document
 * @returns { Promise<object> } 
 */
function deleteItemById(Model, itemId) {
	return Model.findByIdAndRemove(itemId).then((item) => item);
}

/**
 * Adds a document into a collection and returns the added document
 * 
 * @param {object} Model Mongoose Model for the item required
 * @param {object} item item to be added to the collection
 * @returns { Promise<object> } 
 */
function addItem(Model, item) {
	return Model.create(item).then((item) => item);
}

/**
 * Modifies a document in a collection and returns the previous document
 * 
 * @param {object} Model Mongoose Model for the item required
 * @param {string} itemId id of the document
 * @param {object} newItem Modified item
 * @returns { Promise<object> } 
 */
function updateItem(Model, itemId, newItem) {
	const query = { _id: itemId };
	return Model.findOneAndUpdate(query, { $set: newItem }).then(
		(oldItem) => oldItem);
}

/**
 * reset a collection to empty or provide the default documents in a collection and returns the previous document
 * 
 * @param {object} Model Mongoose Model for the item required
 * @param {object} defaultItem Modified item
 * @returns { Promise<object> } 
 */
function resetItems(Model, defaultItem = null) {
	return Model.deleteMany({}).then(async () => defaultItem && await addItem(Model, defaultItem));
}

module.exports = {
	getItemById,
	deleteItemById,
	addItem,
	updateItem,
	resetItems,
    getItemByField
};
