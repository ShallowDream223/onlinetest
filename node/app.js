const express = require("express");
const userRouter = require("./router/user");
const examRouter = require("./router/exam");
const questionRouter = require("./router/question");

const app = express();
const joi = require("joi");
const bodyParser = require("body-parser");
const cors = require("cors");
app.use(cors());

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());

// 响应数据的中间件
app.use(function (req, res, next) {
  // status = 0 为成功； status = 1 为失败； 默认将 status 的值设置为 1，方便处理失败的情况
  res.cc = function (err, status = 1) {
    res.send({
      // 状态
      status,
      // 状态描述，判断 err 是 错误对象 还是 字符串
      message: err instanceof Error ? err.message : err,
      arguments,
    });
  };
  next();
});

app.use((err, req, res, next) => {
  if (err instanceof joi.ValidationError) {
    return res.cc(err);
  }
  //未知错误
  res.cc(err);
});

app.use("/api", userRouter, examRouter, questionRouter);

app.listen(3007, () => {
  console.log("api server running at http://127.0.0.1:3007");
});
