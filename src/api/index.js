import axios from "../utils/http";
import store from "../store";
// store的index.js里提供的LOGIN_IN方法
// 然后暴露到login.vue里使用

export function fetchPermission() {
  // return axios.get("/api/permission?user=" + store.state.UserToken);
  if (localStorage.token == "1") {
    return [
      {
        name: "问题管理",
      },
      {
        name: "考试卡片",
      },
      {
        name: "考试管理教师",
      },
      {
        name: "老师所有考试",
      },
      { name: "老师成绩详情" },
      {
        name: "考试管理教师详情页",
      },
    ];
  } else if (localStorage.token == "0") {
    return [
      {
        name: "考试卡片",
      },
      {
        name: "考试管理学生",
      },
      {
        name: "考试列表学生",
        children: [
          {
            name: "判断题",
          },
          {
            name: "多选题",
          },
          {
            name: "单选题",
          },
        ],
      },
      {
        name: "我的考试学生",
      },
      {
        name: "我的考试学生详情页",
      },
    ];
  }
}

export function login(user, password) {
  return axios.post("/api/user/login", {
    username: user,
    password: password,
  });
}

// export function register(data) {
//   return axios.post("user/register", data);
// }
