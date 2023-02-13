<template>
  <div class="home" style="margin-left:-200px;margin-top:-50px">
    <el-container>
      <el-aside width="200px" style="height:100vh;">
        <el-row class="tac">
          <el-col :span="24">
            <el-menu  @select="handleSelect" unique-opened>
              <el-submenu v-for="item in QuestionBank" :index="item.id" :key="item.id" >
                <template slot="title">
                  <span slot="title">{{item.table}}</span>
                </template>
                <el-menu-item v-for="sub in item.children" :index="sub.index"  :key="sub.index">{{sub.navid}}</el-menu-item>
              </el-submenu>
            </el-menu>
          </el-col>
        </el-row>
      </el-aside>
      <el-container>
        <el-header>
          <img class="img" src="../../../assets/img/langchi.jpg" alt="">
          <p class="examName" style="margin-left:150px">考试名称</p>
          <img class="pic" src="../../../assets/img/touxiang.png" alt="">
          <span class="stu">考生姓名</span>
        </el-header>
        <el-main>
          <div class="main">
            <p>{{msg.title}}</p>
            <p>{{msg.checkA}}</p>
            <p>{{msg.checkB}}</p>
            <p>{{msg.checkC}}</p>
            <p>{{msg.checkD}}</p>
            <p>{{msg.youanswer}}</p>
            <p>{{msg.rightanswer}}</p>
            <p>{{msg.AnswerAnalysis}}</p>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  // name: 'examList',
  data() {
    return {
      QuestionBank: [
        {
          id: "1",
          table: '单选题',
          children: [{
            navid: '第一题',
            index: "1",
            details: {
              title: '你喜欢吃什么',
              checkA: '香蕉',
              checkB: '苹果',
              checkC: '方便面',
              checkD: '青菜',
              youanswer:"你的答案：A",
              rightanswer:'正确答案：B',
              AnswerAnalysis:'答案解析：'
            }
          },
          {
            navid: '第二题',
            index: "2",
            details: {
              title: '你喜欢吃什么',
              checkA: '香蕉',
              checkB: '苹果',
              checkC: '方便面',
              checkD: '青菜',
              youanswer:"你的答案：A",
              rightanswer:'正确答案：B',
              AnswerAnalysis:'答案解析：'
            }
          },
         ]
        },
        {
          id: "2",
          table: '多选题',
          children: [{
            navid: '第一题',
            index: "1",
            details: {
              title: '你喜欢吃什么',
              checkA: '香蕉',
              checkB: '苹果',
              checkC: '方便面',
              checkD: '青菜',
              youanswer:"你的答案：A",
              rightanswer:'正确答案：B',
              AnswerAnalysis:'答案解析：'
            }
          },
          {
            navid: '第二题',
            index: "2",
            details: {
              title: '你喜欢吃什么',
              checkA: '香蕉',
              checkB: '苹果',
              checkC: '方便面',
              checkD: '青菜',
              youanswer:"你的答案：A",
              rightanswer:'正确答案：B',
              AnswerAnalysis:'答案解析：'
            }
          },
         ]
        },
        {
          id: "3",
          table: '判断题',
          children: [{
            navid: '第一题',
            index: "1",
            details: {
              title: '你喜欢吃什么',
              checkA: '香蕉',
              checkB: '苹果',
              checkC: '方便面',
              checkD: '青菜',
              youanswer:"你的答案：A",
              rightanswer:'正确答案：B',
              AnswerAnalysis:'答案解析：'
            }
          },
          {
            navid: '第二题',
            index: "2",
            details: {
              title: '你喜欢吃什么',
              checkA: '香蕉',
              checkB: '苹果',
              checkC: '方便面',
              checkD: '青菜',
              youanswer:"你的答案：A",
              rightanswer:'正确答案：B',
              AnswerAnalysis:'答案解析：'
            }
          },
         ]
        },
      ],
      msg:{},
      isTurn: 'false',
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      let indexA=Number(keyPath[0])-1;
      let indexB=Number(keyPath[1])-1;
      this.msg=this.subjectData[indexA].children[indexB].details
      console.log(indexA,indexB,this.msg);
    },
  },
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
  margin-left: -200px;
}

.el-header p {
  position: absolute;
}

.examName {
  left: 500px;
  height: 60px;
  line-height: 60px;
  position: relative;
}

.examNime {
  margin: 0;
  height: 60px;
  right: 210px;
  line-height: 60px;
  position: relative;
}

.elButton {
  right: -480px;
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

.img {
  position: fixed;
  width: 130px;
  height: 61px;
  margin-left: -250px;
}

.pic {
  border-radius: 50px;
  width: 60px;
  height: 60px;
  margin-left: 900px;
  margin-right: 5px;
}

#nav {
  position: fixed;
  top: 110px;
}

.stu {
  position: fixed;
  top: 6px;
  margin-left: 10px;
}

.tac {
  margin-top: 60px;
}
</style>
