const db = require("../db/index");

const questionHandler = {
  getAllQuestion: (req, res) => {
    const sql = `select * from question`;
    db.query(sql, (err, results, fields) => {
      //   console.log(results);
      if (err) {
        // return res.send({ status: 1, message: err.message });
        return res.cc(err);
      }
      res.cc("查询成功", 0, results);
    });
  },
  insertInto: (req, res) => {
    const questionInfo = req.query;
    const insertSql = "insert into question set ?";
    db.query(
      insertSql,
      {
        stem: questionInfo.stem,
        description: questionInfo.description,
        score: questionInfo.score,
        creator: questionInfo.creator,
        level: questionInfo.level,
        type: questionInfo.type,
        classification: questionInfo.classification,
        updateTime: questionInfo.questionCreateTime,
        questionCreateTime: questionInfo.questionCreateTime,
        options: questionInfo.options,
        trueAnswer: questionInfo.trueAnswer,
      },
      function (err, results) {
        // 执行 SQL 语句失败
        if (err) return res.cc(err);
        // SQL 语句执行成功，但影响行数不为 1
        if (results.affectedRows !== 1) {
          return res.cc("新建问题失败，请稍后再试！");
        }
        res.cc("新建问题成功", 0, results);
      }
    );
  },
};

module.exports = questionHandler;
