const db = require("../db/index");

const examHandler = {
  examCard: (req, res) => {
    const sql = `select * from exam`;
    db.query(sql, (err, results, fields) => {
      //   console.log(results);
      if (err) {
        // return res.send({ status: 1, message: err.message });
        return res.cc(err);
      }
      res.cc("查询成功", 0, results);
    });
  },
};

module.exports = examHandler;
