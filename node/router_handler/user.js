/**
 * 在这里定义和用户相关的路由处理函数，供 /router/user.js 模块进行调用
 */
const db = require("../db/index");

const bcrypt = require("bcryptjs");

const userhandler = {
  regUser: (req, res) => {
    const userinfo = req.body;
    if (!userinfo.username || !userinfo.password) {
      //   return res.send({ status: 1, message: "用户名或密码不能为空！" });
      return res.cc("用户名或密码不能为空！");
    }
    const sql = `select * from (select * from student union select * from teacher) as username where username=?`;
    db.query(sql, [userinfo.username], function (err, results) {
      // 执行 SQL 语句失败
      if (err) {
        // return res.send({ status: 1, message: err.message });
        return res.cc(err);
      }
      // 用户名被占用
      if (results.length > 0) {
        // return res.send({
        //   status: 1,
        //   message: "用户名被占用，请更换其他用户名！"
        // });
        return res.cc("用户名被占用，请更换其他用户名！");
      }

      // TODO: 用户名可用，继续后续流程...
      userinfo.password = bcrypt.hashSync(userinfo.password, 10);
      if (userinfo.role == 0) {
        var insertSql = "insert into student set ?";
      } else if (userinfo.role == 1) {
        insertSql = "insert into teacher set ?";
      }
      db.query(
        insertSql,
        {
          username: userinfo.username,
          password: userinfo.password,
          role: userinfo.role,
        },
        function (err, results) {
          // 执行 SQL 语句失败
          if (err) return res.cc(err);
          // SQL 语句执行成功，但影响行数不为 1
          if (results.affectedRows !== 1) {
            // return res.send({
            //   status: 1,
            //   message: "注册用户失败，请稍后再试！"
            // });
            return res.cc("注册用户失败，请稍后再试！");
          }
          // 注册成功
          //   res.send({ status: 0, message: "注册成功！" });
          res.cc("注册成功！", 0);
        }
      );
      // res.send("reguser OK");
    });
  },
  login: (req, res) => {
    const userinfo = req.body;
    const sql = `select * from (select * from student union select * from teacher) as username where username=?`;
    db.query(sql, userinfo.username, function (err, results) {
      // 执行 SQL 语句失败
      if (err) return res.cc(err);
      // 执行 SQL 语句成功，但是查询到数据条数不等于 1
      if (results.length !== 1) return res.cc("登录失败！");
      // TODO：判断用户输入的登录密码是否和数据库中的密码一致
      // 拿着用户输入的密码,和数据库中存储的密码进行对比
      const compareResult = bcrypt.compareSync(
        userinfo.password,
        results[0].password
      );

      // 如果对比的结果等于 false, 则证明用户输入的密码错误
      if (!compareResult) {
        return res.cc("登录失败！");
      }
      // res.cc("登录成功", 0);
      res.send({
        // 状态
        status: 0,
        // 状态描述，判断 err 是 错误对象 还是 字符串
        message: "登录成功",
        role: results[0].role,
      });
      // console.log(results[0].role);
    });
    // res.send("login OK");
  },
};
module.exports = userhandler;
