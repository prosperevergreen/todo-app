const express = require("express");
const router = express.Router();

const todoRouter = require("./todo");
const authRouter = require("./auth");
const userRouter = require("./user");
const categoryRouter = require("./category");

const authWithToken = require("../utility/authUtils").authWithToken
const authWithBasic = require("../utility/authUtils").authWithBasic


router.use("/auth",authWithBasic, authRouter);
router.use("/todo",authWithToken, todoRouter);
router.use("/user",authWithToken, userRouter);
router.use("/category",authWithToken, categoryRouter);

module.exports = router;