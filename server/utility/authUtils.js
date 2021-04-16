const jwt = require("jsonwebtoken");
const dbUtils = require("./databaseUtils");
const User = require("../models/user.js");

/**
 * Authenticate user with Basic authentication (Decode, parse and get user credentials (username and password)
 * from the Authorization header) and generate token.
 *
 * @param {Request<ParamsDictionary, any, any, qs.ParsedQs, Record<string, any>>} req - Express request object
 * @param {Response<any, Record<string, any>, number>} res - Express response object
 * @param {NextFunction} next - Express next function object
 * @returns {object | statusError} {username, password, token} current user data
 */
const authWithBasic = (req, res, next) => {
	// NOTE: The header is base64 encoded as required by the http standard.
	//       You need to first decode the header back to its original form ("username:password").
	const response = { data: null, errorCode: null, errorMsg: null };
	//Get contents of authentication-header format <type> <credentials>
	const authHead = req.headers["authorization"];
	if (!authHead)
		return res.status(401).json({ error: "No authentication header" }); // bad auth type; // no auth header
	// {
	//Divide contents to type and credentials
	const authorization = authHead.split(" ");

	const type = authorization[0];
	//Credentials base64
	const credBase = authorization[1];

	if (type !== "Basic")
		return res.status(401).json({ error: "Bad authentication type" }); // bad auth type

	if (!credBase)
		return res.status(401).json({ error: "No authentication credentials" }); // no auth data

	//Decode base64 to utf-8
	const buff = Buffer.from(credBase, "base64");
	const credsStr = buff.toString("utf-8");
	const creds = credsStr.split(":");

	if (creds.length !== 2)
		return res
			.status(401)
			.json({ error: "Bad authentication credentials format" }); // no auth data
	
	const [uname, password] = creds;
	const username = uname.toLowerCase();
	const token = createJWTWebToken({username, password})
	res.locals.credentials = {username, password, token};
	next();
};

/**
 * Authenticate user token i.e Bearer authentication by verifying that user exists.
 *
 * @param {Request<ParamsDictionary, any, any, qs.ParsedQs, Record<string, any>>} req - Express request object
 * @param {Response<any, Record<string, any>, number>} res - Express response object
 * @returns {object | statusError} {username, _id, createdOn} current user data
 */
const authWithToken = async (req, res, next) => {
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
			.json({ error: "Invalid authentication token" }); // bad token
	try {
		const user = await dbUtils.getItemByField(User, {
			username: clientData.username,
		});
		// check is user exists
		if (user.length === 0)
			return res
				.status(401)
				.json({ error: "No user with the provided username" });

		// Check if password is correct
		if (!user[0].checkPassword(clientData.password))
			return res.status(401).json({ error: "Invalid password" });
		const userData = user[0].toObject();
		delete userData.password;

		// Save user data to be passed to the next route
		res.locals.userData = userData;
		next();
	} catch (error) {
		console.log(error);
		return res.status(500).json({ error });
	}
};

/**
 * Creates a new token for the given credential
 *
 * @param {objcet} credentials credential details {username, password}
 * @returns {objcet} Generated token credential
 */
const createJWTWebToken = (credentials) => {
	// Get request user credentials (Basic Auth)
	// If found exists, return it in parts(type and value) or return null
	const token = jwt.sign(credentials, process.env.ACCESS_TOKEN_SECRET);
	return token;
};

module.exports = {authWithToken, authWithBasic };
