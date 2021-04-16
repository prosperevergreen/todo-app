const express = require("express");
const router = express.Router();

const todoRouter = require("./todo");
const authRouter = require("./auth");
const userRouter = require("./user");
const categoryRouter = require("./category");

const verifyToken = require("../services/authUtils").verifyToken


router.use("/auth", authRouter);
router.use("/todo",verifyToken, todoRouter);
router.use("/user",verifyToken, userRouter);
router.use("/category",verifyToken, categoryRouter);

module.exports = router;