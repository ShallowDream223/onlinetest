<template>
  <div id="background">
    <div id="loginform">
      <h3>OnLine Test System</h3>
      <h6>在线考试系统登录</h6>
      <div>
        <el-input
          v-model.trim="account"
          placeholder="用户名"
          id="account"
        ></el-input>
      </div>
      <form>
        <el-input
          name="password"
          v-model.trim="password"
          placeholder="密码"
          type="password"
          @keyup.enter="login"
        ></el-input>
      </form>
      <div>
        <el-button type="text" id="register" @click.native="register"
          >注册账户</el-button
        >
      </div>
      <div>
        <el-button type="primary" id="login" @click="login">确认登录</el-button>
      </div>
    </div>
    <router-view />
  </div>
</template>

<script>
import { store } from "../../store";

export default {
  data() {
    return {
      account: "",
      password: "",
    };
  },
  methods: {
    async login() {
      this.$api.Login.login({
        username: this.account,
        password: this.password,
        id: "",
        role: "",
      })
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            this.$message({
              message: "登录成功",
              type: "success",
            });
            this.$store.commit("LOGIN_IN", res.data.role);
            this.$router.push("/home");
          } else {
            this.$message({
              message: "登录失败",
              type: "error",
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });

      this.$router.replace("/").catch(() => {});
    },
    register() {
      this.$router.push({ path: "/register" });
    },
  },

  mounted() {},
};
</script>
<style lang="css" scoped>
* {
  margin: 0;
  padding: 0;
}
#background {
  height: 100vh;
  /* background-color: aliceblue; */
  background-image: url("../../assets/img/wallhaven-rd83mq.jpg");
  background-size: 100% 100%;
}
h3 {
  text-align: center;
  /* font-size: 14px; */
}

.el-input {
  margin-top: 25px;
  width: 300px;
}
#loginform {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  /* width: 400px; */
  /* height: 200px; */
}
h6 {
  display: block;
  margin-top: 10px;
  font-size: 12px;
  color: black;
  text-align: center;
}
#register {
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  margin-top: 20px;
  color: skyblue;
}
#login {
  width: 100%;
  float: left;
}
</style>
