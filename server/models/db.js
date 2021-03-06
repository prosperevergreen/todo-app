const mongoose = require("mongoose");
const User = require("../models/user.js");
/**
 * Open connection to Mongodb for CRUD operations
 *
 * @param { string } dbURL - the hostname:port of mongo db
 *
 * @throws { Error } if unsuccessfull
 * @returns { void }
 *
 */
function connectDB(dbURL) {
	// Do nothing if already connected
	if (!mongoose.connection || mongoose.connection.readyState === 0) {
		mongoose
			.connect(dbURL, {
				useNewUrlParser: true,
				useUnifiedTopology: true,
				useFindAndModify: false,
				useCreateIndex: true,
				autoIndex: true,
			})
			.catch(handleCriticalError);
		mongoose.connection.on("error", handleCriticalError);

		mongoose.connection.on("connected", (data) => {
			console.log("Successfully connected to Mongodb");
			User.countDocuments({}).then((count) => {
				if (count === 0) {
					const defaultUsers = require("../database/defaultData");
					User.create(defaultUsers);
				}
			});
		});

		mongoose.connection.on("reconnectFailed", handleCriticalError);
	}
}

/**
 * Closes connection to Mongodb
 *
 * @param { Error} err - Mongodn connection error object
 * @throws { Error }
 * @returns { void }
 *
 */
function handleCriticalError(err) {
	console.error(err);
	throw err;
}

/**
 * Throws error on catch when connecting to Mongodb
 *
 * @throws { Error } if unsuccessfull
 * @returns { void }
 *
 */
function disconnectDB() {
	mongoose.disconnect();
}

module.exports = { connectDB, disconnectDB };
