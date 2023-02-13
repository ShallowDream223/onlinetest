<template>
  <div class="content-grade-details">
    <!--头部 -->
    <div class="header">
      <el-row class="left">
        <el-button type="success" size="small" icon="el-icon-back" @click="fanhui">返回</el-button>
        <el-button type="success" size="small" icon="el-icon-refresh-right" @click="refresh">刷新</el-button> 
      </el-row>
      <div class="right">
          <el-input style="width:200px" v-model="search" clearable placeholder="输入姓名或等级进行查询"></el-input>
      </div>
    </div>
    <!-- // 内容 -->
    <div class="content">
      <el-table :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase())||data.level.toLowerCase().indexOf(search.toLowerCase())>-1)"
        height="100%" border>
        <el-table-column prop="id" type="index" label="序号" width="80"></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="singlescore" label="单选题成绩"></el-table-column>
        <el-table-column prop="multiplescore" label="多选题成绩"></el-table-column>
        <el-table-column prop="judgescore" label="判断题成绩"></el-table-column>
        <el-table-column prop="totalscore" label="总成绩"></el-table-column>
        <el-table-column prop="level" label="等级"></el-table-column>
        <el-table-column label="操作">
          <el-button type="success" size="mini" @click="handleEdit">详情</el-button>
        </el-table-column>
      </el-table>
    </div>
    <!-- // 尾部 -->
    <div class="footer">
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="page"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="pageSize"
          layout="sizes, prev, pager, next"
          :total="100">
        </el-pagination>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "GradeDetails",
  data() {
    return {
      search: "",
      page: 1,
      pageSize: 100,
      tableData: [
        {
          name: "李嘉龙",singlescore: 19,multiplescore: 35,judgescore: 26,
          totalscore: 90,level: "优秀",
        },
        {
          name: "张智柯",singlescore: 17,multiplescore: 37,judgescore: 27,
          totalscore: 88,level: "优秀",
        },
         {
          name: "张三",singlescore: 17,multiplescore: 37,judgescore: 27,
          totalscore:92,level: "优秀",
        },
         {
          name: "李四",singlescore: 17,multiplescore: 37,judgescore: 27,
          totalscore:88,level: "优秀",
        },
         {
          name: "王五",singlescore: 17,multiplescore: 37,judgescore: 27,
          totalscore: 88,level: "优秀",
        },
         {
          name: "老六",singlescore: 17,multiplescore: 37,judgescore: 27,
          totalscore: 88,level: "优秀",
        },
        {
          name: "陈七",singlescore: 17,multiplescore: 37,judgescore: 27,
          totalscore:66,level: "良好",
        },
      ],
    };
  },
  methods: {
    fanhui(){
     this.$router.push("/AllExam");
    },
    handleEdit() {
      // 点击详情按钮，跳转到详情页面
      this.$router.push({ name: "gradedetails" });
      // console.log(index, row);
    },
    refresh(){
      window.location.reload()
    },
    handleSizeChange() {},
    handleCurrentChange() {},
  },
};
</script>

<style lang="scss" scoped>
.content-grade-details {
  padding: 20px; margin:0 auto;background:aliceblue;
  .header {
    height:30px;
    .left {
      float: left;margin:19px;
    }
    .right {
      float: right; margin:15px;
      .btn {
        float: right;
        margin-left: 1%;
      }
      ::v-deep .el-form-item {
        float: right;
      }
    }
  }

  .content {
    height: 87%;
    margin-top: 1%;
    // border: 1px solid blue;
  }

  .footer {
    text-align: center;

    .block {
      margin-top: 1%;
    }
  }
}
</style>
