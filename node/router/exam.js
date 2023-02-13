const express = require("express");

const examRouter = express.Router();

const examHandler = require("../router_handler/exam");
examRouter.post("/examcard", examHandler.examCard);
// router.post("/exammanage", examHandler.examManage);

module.exports = examRouter;
