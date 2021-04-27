const express = require("express");
const router = express.Router();

const todoRouter = require("./todo");
const authRouter = require("./auth");
const userRouter = require("./user");
const categoryRouter = require("./category");

const authWithToken = require("../utility/authUtils").authWithToken
const authWithBasic = require("../utility/authUtils").authWithBasic


router.use("/auth/",authWithBasic, authRouter);
router.use("/api/",authWithToken);
router.use("/api/todo/", todoRouter);
router.use("/api/user/", userRouter);
router.use("/api/category/", categoryRouter);


// Bad End point
const badRoute = function (req, res) {
	res.status(404).json({ badRequest: "The route does not exit" });
};

router.use("*", badRoute);


module.exports = router;