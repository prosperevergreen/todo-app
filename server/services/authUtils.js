const jwt = require("jsonwebtoken");
const dbUtils = require("../services/databaseUtils");
const User = require("../models/user.js");

/**
 * Decode, parse and return user credentials (username and password)
 * from the Authorization header.
 *
 * @param {http.incomingMessage} request - a http request
 * @returns {Array|null} [username, password] or null if header is missing
 */
const authWithBasic = (request) => {
	// NOTE: The header is base64 encoded as required by the http standard.
	//       You need to first decode the header back to its original form ("username:password").
	const response = { data: null, errorCode: null, errorMsg: null };
	//Get contents of authentication-header format <type> <credentials>
	const authHead = request.headers["authorization"];
	if (!authHead) return { ...response, errorCode: 401, errorMsg: "No authentication header" }; // bad auth type; // no auth header
	// {
	//Divide contents to type and credentials
	const authorization = authHead.split(" ");

	const type = authorization[0];
	//Credentials base64
	const credBase = authorization[1];

	if (type !== "Basic")
		return { ...response, errorCode: 401, errorMsg: "Bad authentication type" }; // bad auth type

	if (!credBase)
		return {
			...response,
			errorCode: 401,
			errorMsg: "No authentication credentials",
		}; // no auth data

	//Decode base64 to utf-8
	const buff = Buffer.from(credBase, "base64");
	const credsStr = buff.toString("utf-8");
	const creds = credsStr.split(":");

	if (creds.length !== 2)
		return {
			...response,
			errorCode: 401,
			errorMsg: "Bad authentication credentials format",
		}; // no auth data

	return { ...response, data: creds };
};

/**
 * Decode, parse and return user credentials (username and password)
 * from the Authorization header.
 *
 * @param {http.incomingMessage} req - a http request
 * @returns {Array|null} [username, password] or null if header is missing
 */
const verifyToken = async (req, res, next) => {
	const authHead = req.headers["authorization"];

	if (!authHead)
		return res.status(401).json({ error: "No authentication header" }); // no auth header

	//Divide contents to type and credentials
	const authorization = authHead.split(" ");

	const type = authorization[0];
	//Credentials base64
	const credBase = authorization[1];

	if (!type || type !== "Bearer")
		return res.status(401).json({ error: "Bad authentication type" }); // bad auth type

	if (!credBase)
		return res.status(401).json({ error: "No authentication credentials" }); // no auth data

	//Decode JWT
	const clientData = jwt.verify(
		credBase,
		process.env.ACCESS_TOKEN_SECRET,
		(err, userDetails) => {
			if (err) return null;
			return userDetails;
		}
	);

	if (!clientData)
		return res
			.status(401)
			.json({ error: "Invalid authentication credentials" }); // bad token
	try {
		const user = await dbUtils.getItemByField(User, { username: clientData.username });
		// check is user exists
		if (user.length === 0)
			return res
				.status(401)
				.json({ error: "No user with the provided username" });
        

		// Check if password is correct
		if (!user[0].checkPassword(clientData.password))
			return res.status(401).json({ error: "Invalid password" });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ error });
	}

	next();
};

const verifiedUserData = (req) =>{
    const authHead = req.headers["authorization"];
    //Divide contents to type and credentials
	const token = authHead.split(" ")[1];
    return jwt.verify(
		token,
		process.env.ACCESS_TOKEN_SECRET,
		(err, userDetails) => {
			if (err) return err;
			return userDetails;
		}
	);
}

/**
 * Creates a new token for the given credential
 *
 * @param {objcet} credentials credential details {username, password}
 * @returns
 */
const createJWTWebToken = (credentials) => {
	// Get request user credentials (Basic Auth)
	// If found exists, return it in parts(type and value) or return null
	const response = { data: null, errorCode: null, errorMsg: null };
	if (!credentials)
		return {
			...response,
			errorCode: 401,
			errorMsg: "No authentication credentials",
		};

	const token = jwt.sign(credentials, process.env.ACCESS_TOKEN_SECRET);
	return { ...response, data: token };
};




module.exports = { createJWTWebToken, verifyToken, authWithBasic, verifiedUserData};
