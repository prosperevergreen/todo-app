const express = require("express");
const cors = require("cors");
const http = require("http");

const app = express();

const mongoHost = "mongodb:27017"
const dbName = "todo"

//  Get db
const db = require("./models/db");
// Connect to db
db.connectDB(`mongodb://${mongoHost}/${dbName}`);

const PORT = 5000;

const apiRouter = require("./routes/index");

app.use(cors());
app.options('*',cors());
app.use(express.json()); //Used to parse JSON bodies
app.use(express.urlencoded({ extended: false })); //Parse URL-encoded bodies

// Bad End point
const badRoute = function (req, res) {
	res.status(404).json({ badRequest: "The route does not exit" });
};

app.use("/api", apiRouter);
app.use("*", badRoute);

const server = http.createServer(app);


// Close server
server.on("close", () => console.log("Server closed."));

// Close server
server.on("error", (err) => {
	console.log(`Server error: ${err}`);
	server.close();
});

// Server starts listening
server.listen(PORT, () => console.log(`Server: Listening on ports: ${PORT}`));

