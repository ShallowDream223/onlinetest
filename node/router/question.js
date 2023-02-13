const express = require("express");
const questionHandler = require("../router_handler/question");

const examRouter = express.Router();

const examHandler = require("../router_handler/question");
examRouter.get("/getallquestion", questionHandler.getAllQuestion);
examRouter.get("/insertinto", questionHandler.insertInto);

module.exports = examRouter;
