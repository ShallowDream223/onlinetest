<template>
  <div class="registerbackground">
    <div class="registerform">
      <h3>Launch OnLine Test System</h3>
      <h6>在线考试系统注册</h6>
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        class="demo-ruleForm"
      >
        <el-form-item prop="name">
          <el-input
            type="text"
            v-model="ruleForm.name"
            autocomplete="off"
            placeholder="用户名"
          ></el-input>
        </el-form-item>
        <el-form-item prop="pass">
          <el-input
            type="password"
            v-model="ruleForm.pass"
            autocomplete="off"
            placeholder="输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item prop="checkPass">
          <el-input
            type="password"
            v-model="ruleForm.checkPass"
            autocomplete="off"
            placeholder="请再次输入密码 "
          ></el-input>
        </el-form-item>
        <el-form-item prop="identity">
          <el-select
            v-model="ruleForm.identity"
            placeholder="请选择身份"
            class="identity"
          >
            <el-option label="学生" value="0"></el-option>
            <el-option label="教师" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select
            v-model="ruleForm.classes"
            placeholder="请选择班级"
            v-show="showInfo"
          >
            <el-option label="前端" value="1"></el-option>
            <el-option label="后端" value="2"></el-option>
            <el-option label="数据" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button
            class="registerbutton"
            type="primary"
            @click="registerForm('ruleForm')"
            >注册</el-button
          >
          <el-button type="text" @click="resetForm('ruleForm')"
            >使用已有账户登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
  
<script>
import axios from "axios";
import { mapActions, mapMutations } from "vuex";
import reguser from "../../api/reguser";
export default {
  data() {
    return {
      value: "",
      showInfo: false,
      options: [
        {
          value: "teacher",
          label: "教师",
        },
        {
          value: "student",
          label: "学生",
        },
      ],
      ruleForm: {
        pass: "",
        checkPass: "",
        name: "",
        identity: "",
        classes: "",
      },
      rules: {
        name: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 3,
            max: 16,
            message: "长度在 3 到 16 个字符",
            trigger: "blur",
          },
        ],
        pass: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, message: "密码长度不能小于6位", trigger: "blur" },
          {
            validator: (rule, value, callback) => {
              if (value === "") {
                callback(new Error("请输入密码"));
              } else {
                if (this.ruleForm.checkPass !== "") {
                  this.$refs.ruleForm.validateField("checkPass");
                }
                callback();
              }
            },
            trigger: "blur",
          },
        ],
        checkPass: [
          { required: true, message: "请再次输入密码", trigger: "blur" },
          {
            validator: (rule, value, callback) => {
              if (value === "") {
                callback(new Error("请再次输入密码"));
              } else if (value !== this.ruleForm.pass) {
                callback(new Error("两次输入密码不一致!"));
              } else if (value === this.ruleForm.pass) {
                callback();
              }
            },
            trigger: "blur",
          },
        ],
        identity: [
          { required: true, message: "请选择身份", trigger: "change" },
          {
            validator: (rule, value, callback) => {
              if (value === "0") {
                this.showInfo = true;
              } else {
                this.showInfo = false;
              }
              callback();
            },
            trigger: "change",
          },
        ],
        classes: [{ required: true, message: "请选择班级", trigger: "change" }],
      },
    };
  },
  methods: {
    ...mapActions(["vregister"]), //注册
    ...mapMutations(["vresetForm"]), //引入保存的方法
    registerForm() {
      reguser
        .register({
          classes: this.ruleForm.classes,
          password: this.ruleForm.pass,
          username: this.ruleForm.name,
          role: this.ruleForm.identity,
          id: "",
        })
        .then((res) => {
          // console.log(res)
          if (res.data.status == 0) {
            alert("注册成功,5秒后跳转到登录页");
            console.log(res.data.message);
            // setTimeout(this.resetForm(),2000)
            setTimeout(() => {
              this.resetForm();
            }, 5000);
          }
        })
        .catch((err) => {
          // alert("注册失败" + res.data.message);
          console.log(err);
        });

      //函数是执行了，但是0.5秒后没有执行任何操作，后来找了资料， setTimeou() 方法用于在指定毫秒数后调用函数或计算表达式 setTimeout(code,millisec)
      //其中，code，必需，要调用的函数后要执行的JavaScript代码串。
      //知道问题所在了，那解决方案是？对，最简单就是定义一个函数，去暂存this，然后再改变变量的值。
      //使用es6箭头函数更快捷了，减少一半的代码量，
    },
    resetForm(formName) {
      this.$router.push("/login");
    },
  },
};
</script>

  <style lang="css" scoped>
.el-input {
  margin-top: 25px;
  /* width: 100% */
  width: 300px;
}
.identity {
  margin-top: 25px;
  width: 100%;
}
.registerbutton {
  margin-top: 25px;
  width: 100%;
}
h3,
h6 {
  text-align: center;
}
.registerbackground {
  height: 100vh;
  background-image: url("../../assets/img/wallhaven-rd83mq.jpg");
  background-size: 100% 100%;
}
.registerform {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.el-form-item {
  margin-bottom: 0px;
}
.el-button {
  margin-top: 25px;
}
.el-select {
  /* margin-top: 25px; */
  width: 100%;
}
.registerbutton {
  width: 50%;
  float: left;
}
</style>


