<template>
  <div class="home" style="margin-left:-200px;margin-top:-50px">
    <el-container>
      <el-aside width="200px" style="height:100vh;">
        <el-row class="tac">
          <el-col :span="24">
            <h5 style="height:60px; margin:0;line-height:60px; text-align: center;font-size: 20px;">考试系统</h5>
            <el-menu default-active="$route.path" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
              :router="true" unique-opened>
              <el-submenu index="1">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>单选题(每题5分)</span>
                </template>
                <el-menu-item index="/examstudentlist/singleChoice" v-for="n in singleChoice" :key="n.title"
                  :route="{ name:'singlechoice',query:{ data:n} }">{{n.navid}}</el-menu-item>
              </el-submenu>
              <el-submenu index="2">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>多选题(每题5分)</span>
                </template>
                <el-menu-item index="/examstudentlist/multipleChoice" v-for="n in multipleChoice" :key="n.title"
                  :route="{ name:'multiplechoice',query:{ data:n} }">{{n.navid}}</el-menu-item>
              </el-submenu>
              <el-submenu index="3">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>判断题(每题5分)</span>
                </template>
                <el-menu-item index="/examstudentlist/judgeChoice" v-for="n in judgeChoice" :key="n.title"
                  :route="{ name:'judgechoice',query:{ data:n} }">{{n.navid}}</el-menu-item>
              </el-submenu>
            </el-menu>
          </el-col>
        </el-row>
      </el-aside>
      <el-container>
        <el-header>
          <p class="examName">考试名称：？？？？？</p>
          <p class="examNime">考试限时：？？？？？</p>
          <el-button :plain="true" class="elButton" size="small" icon="el-icon-circle-check" type="primary"
            @click.prevent="centerDialogVisible = true">交卷</el-button>
          <!-- <el-button type="primary" icon="el-icon-circle-check">交卷</el-button> -->
          <!-- 交卷后弹出对话框 -->
          <el-dialog title="提示" :visible.sync="centerDialogVisible" width="30%" center>
            <span style="color:red;font-weight: 700;font-size: 18px;">*确认试卷填写完毕之后请输入您的姓名和身份证号*</span><br />
            <span style="color:red;font-weight: 700;font-size: 18px;">*点击确定之后就结束答卷*</span>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
              <el-form-item label="考试姓名" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
              </el-form-item>
              <el-form-item label="身份证号" prop="identity">
                <el-input v-model="ruleForm.identity"></el-input>
              </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button @click="centerDialogVisible = false">取 消</el-button>
              <el-button type="primary" :disabled="isFormReady(ruleForm,['remark'])" @click="open()">确 定
              </el-button>
            </span>
          </el-dialog>
        </el-header>
        <el-main>
          <div class="box1">
            <router-view></router-view>
          </div>
        </el-main>

      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'examList',
  data() {
    return {
      single:[],
      singleChoice: [
        {
          navid: '第一题',
          id:'1',
          title: '你喜欢吃什么',
          checkA: '香蕉',
          checkB: '苹果',
          checkC: '方便面',
          checkD: '青菜',
        },
        {
          navid: '第二题',
          id:'2',
          title: '你学习的是什么',
          checkA: 'java',
          checkB: '数据分析',
          checkC: '前端开发',
          checkD: '运维',
        },
        {
          navid: '第三题',
          id:'3',
          title: '你是什么专业',
          checkA: '计算机',
          checkB: '数学',
          checkC: '冶金',
          checkD: '矿业',
        },
      ],
      multipleChoice: [
        {
          navid: '第一题',
          id:'1',
          title: '这是多选题1',
          checkA: '香蕉',
          checkB: '苹果',
          checkC: '方便面',
          checkD: '青菜',
        },
        {
          navid: '第二题',
          id:'2',
          title: '这是多选题2',
          checkA: 'java',
          checkB: '数据分析',
          checkC: '前端开发',
          checkD: '运维',
        },
        {
          navid: '第三题',
          id:'3',
          title: '这是多选题3',
          checkA: '计算机',
          checkB: '数学',
          checkC: '冶金',
          checkD: '矿业',
        },
      ],
      judgeChoice: [
        {
          navid: '第一题',
          id:'1',
          title: '你是少数名族',
          true: '对',
          false: '错',
        },
        {
          navid: '第二题',
          id:'2',
          title: '1+1+3',
          true: '对',
          false: '错',
        },
        
      ],
      centerDialogVisible: false,
      // 考生姓名身份证号表单
      ruleForm: {
        name: '',
        identity: '',

        resource: [],//每一道题用户的输入选项
      },
      rules: {
        name: [
          { required: true, message: '请输入考生姓名', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        identity: [
          { required: true, message: '请输入考生身份证号', trigger: 'blur' },
          { max: 18, message: '长度在 18 个字符', trigger: 'blur' }
        ],
      }
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
    },
    // present() {
    //   //if (this.ruleForm.resource.indexOf(undefined) !== -1 || this.ruleForm.resource.indexOf('') !== -1){
    //   const yuan = this.ruleForm.resource.filter(x => x !== null)
    //   if (yuan.length < this.ruleForm.resource.length || yuan.length < 1) {
    //     const confirmResult = this.$confirm(
    //       '检测到您有未作答的题目, 是否继续提交?',
    //       '提示',
    //       {
    //         confirmButtonText: '确定',
    //         cancelButtonText: '取消',
    //         type: 'warning'
    //       }).catch(err => err)
    //     if (confirmResult !== 'confirm') {
    //       return this.$Msg.info('已取消提交')
    //     }
    //     this.showAns()
    //   }
    //   this.showAns()
    // },
    // showAns() {
    //   // this.updateUserSelect(this.ruleForm.resource)
    //   this.$router.push('/examStudent')
    // },

    // 点击交卷功能
    open() {
      this.$confirm("交卷之后就不能继续作答，是否继续？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "交卷成功!",
          });
          this.$router.push("/examStudent");
          this.btnClick();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消交卷",
          });
        });
    },
    // 全屏功能
    btnClick() {
      var element = document.getElementById('container');
      if (this.isFullscreen()) {
        // 全屏
        this.exitFullScreen();
      } else {
        if (element.requestFullscreen) {
          element.requestFullscreen();
        } else if (element.webkitRequestFullScreen) {
          element.webkitRequestFullScreen();
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen();
        } else if (element.msRequestFullscreen) {
          element.msRequestFullscreen(); // IE11
        }
      }
    },
    // 退出全屏
    exitFullScreen() {
      let exitFullScreen =
        document.exitFullScreen ||
        document.mozCancelFullScreen ||
        document.webkitExitFullscreen ||
        document.msExitFullscreen;
      if (exitFullScreen) {
        exitFullScreen.call(document);
      }
    },
    // 判断是否全屏
    isFullscreen() {
      return (
        document.fullscreenElement ||
        document.msFullscreenElement ||
        document.mozFullScreenElement ||
        document.webkitFullscreenElement ||
        false
      );
    },
    // 交卷信息填写
    isFormReady(form, except) {
      for (let i in form) {
        if (except && except.indexOf(i) !== -1) continue
        if (!form[i]) {
          return true
        }
      }
      return false
    }
  },
  mounted() {
    // 这个方式禁用esc会有提示，去不掉
    if (navigator.keyboard && navigator.keyboard.lock) {
      // 禁用esc退出全屏
      navigator.keyboard.lock(["Escape"]);
    } else {
      console.log("您的浏览器上不支持该功能");
    }
  }
};
</script>

<style>
body {
  margin: 0;
  padding: 0;
}
</style>

<style scoped>
:v-deep .main-container {
  margin-left: 0;
  padding-top: 0;
}

.el-header {
  background-color: #001529;
  color: #d3dce6;
  text-align: center;
  line-height: 60px;
}

.el-header p {
  position: absolute;
}

.examName {
  left: 670px;
  /* text-align: center; */
  height: 60px;
  line-height: 60px;
  position: relative;
}

.examNime {
  margin: 0;
  height: 60px;
  right: 290px;
  line-height: 60px;
  position: relative;
}

.elButton {
  right: -700px;
  position: relative;
}

.el-footer {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-menu-item.is-active {
  color: black;
}

.box1 {
  width: 100%;
  height: 95%;
  background: white;
  padding: 25px 25px;
  box-sizing: border-box;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-aside::-webkit-scrollbar {
  width: 0px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>
