<template>
  <div class="whole">
    <div class="content-grade">
      <!-- 头部 -->
      <div class="header">
        <el-row class="left">
          <el-button
            type="primary"
            icon="el-icon-plus"
            size="small"
            @click="addData"
            >新建</el-button
          >
          <el-button
            type="primary"
            size="small"
            icon="el-icon-refresh-right"
            @click="refresh"
            >刷新</el-button
          >
        </el-row>
        <div class="right">
          <div style="display: inline-block">
            <el-input
              v-model="nameSearch"
              clearable
              placeholder="请输入名称进行查询"
              size="small"
            ></el-input>
            <!-- <el-button
            icon="el-icon-search" type="primary" size="small"
            @click="searchData(true)"
            style="margin: 0 10px 0 10px;height:30px"
          ></el-button> -->
          </div>
          <div style="display: inline-block">
            <el-input
              class="btn"
              type="success"
              icon="el-icon-search"
              placeholder="根据考试类型查询"
              v-model="searchExamId"
              clearable
              size="small"
            ></el-input>
            <el-button
              type="primary"
              size="mini"
              @click="rangeRetrievalDialog = true"
            >
              范围检索
            </el-button>
            <el-dialog
              :visible.sync="rangeRetrievalDialog"
              title="范围检索"
              width="30%"
            >
              <el-form :model="rangeRetrievalForm" label-width="80px">
                <el-form-item label="参考时间">
                  <!-- examTime是一个数组，里面有两个值，一个起始时间，一个结束时间 -->
                  <el-date-picker
                    v-model="rangeRetrievalForm.examTime"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                  >
                  </el-date-picker>
                </el-form-item>
                <el-form-item label="分数">
                  <el-input
                    v-model="rangeRetrievalForm.startRangeScore"
                    placeholder="请输入分数"
                  ></el-input>
                  <el-input
                    v-model="rangeRetrievalForm.endRangeScore"
                    placeholder="请输入分数"
                  ></el-input>
                </el-form-item>
                <el-form-item label="所用时长">
                  <el-input
                    v-model="rangeRetrievalForm.startRangeTime"
                    placeholder="请输入时长"
                  ></el-input>
                  <el-input
                    v-model="rangeRetrievalForm.endRangeTime"
                    placeholder="请输入时长"
                  ></el-input>
                </el-form-item>
              </el-form>
              <span slot="footer" class="dialog-footer">
                <el-button @click="rangeRetrievalDialog = false"
                  >取 消</el-button
                >
                <el-button type="primary" @click="rangeRetrieval"
                  >确 定</el-button
                >
              </span>
              ></el-dialog
            >
          </div>
        </div>
      </div>
      <!-- 内容 -->
      <div class="content">
        <el-table
          :data="
            tableData.filter(
              (data) =>
                !nameSearch ||
                data.examname
                  .toLowerCase()
                  .includes(nameSearch.toLowerCase()) ||
                data.grade.toLowerCase().indexOf(nameSearch.toLowerCase()) >
                  -1 ||
                data.createpeople
                  .toLowerCase()
                  .indexOf(nameSearch.toLowerCase()) > -1
            )
          "
          style="width: 100%"
          height="100%"
          border
        >
          <el-table-column
            prop="id"
            label="序号"
            type="index"
            width="80"
          ></el-table-column>
          <el-table-column prop="examname" label="名称" width="120">
          </el-table-column>
          <el-table-column
            prop="type"
            label="类型"
            width="100"
          ></el-table-column>
          <el-table-column prop="grade" label="班级" width="120">
          </el-table-column>
          <el-table-column prop="totalpeople" label="应参加人数" width="100">
          </el-table-column>
          <el-table-column prop="actualpeople" label="实际参加人数" width="120">
          </el-table-column>
          <el-table-column prop="avgscore" label="平均分" width="100">
          </el-table-column>
          <el-table-column prop="passpeople" label="及格人数" width="100">
          </el-table-column>
          <el-table-column
            prop="createtime"
            label="创建时间"
            width="160"
            align="center"
          >
          </el-table-column>
          <el-table-column prop="createpeople" label="创建人" width="80">
          </el-table-column>
          <el-table-column label="操作" width="230" fixed="right">
            <template slot-scope="scope">
              <el-button
                type="info"
                size="mini"
                plain
                @click="handleEdit(scope.$index, scope.row)"
                >详情</el-button
              >
              <el-button
                type="success"
                size="mini"
                plain
                @click="updateData(scope.$index, scope.row)"
                >编辑</el-button
              >
              <el-button
                type="danger"
                plain
                size="mini"
                @click="deleteData(scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 分页 -->
      <div class="footer">
        <div class="block">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="10"
            layout="total, sizes, prev, pager, next, jumper"
            :total="10"
          >
          </el-pagination>
        </div>
      </div>
      <!-- 查询弹窗 -->
      <el-dialog
        :visible.sync="isSearch"
        title="成绩管理查询"
        height="auto"
        width="380px"
      >
        <el-form ref="form" :model="form" label-width="80px" size="small">
          <el-form-item label="名称">
            <el-input v-model="form.examname"></el-input>
          </el-form-item>
          <el-form-item label="班级">
            <el-input v-model="form.grade"></el-input>
          </el-form-item>
          <el-form-item label="创建人">
            <el-input v-model="form.createpeople"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              size="small"
              plain
              @click="isSearch = false"
              style="margin-left: 33%"
              >取消</el-button
            >
            <el-button
              type="primary"
              size="small"
              plain
              @click="
                onSearch();
                isSearch = false;
              "
              >查询</el-button
            >
          </el-form-item>
        </el-form>
      </el-dialog>
      <!-- 编辑弹窗 -->
      <el-dialog title="编辑考试" :visible.sync="isShow" width="400px" center>
        <el-form ref="form" label-width="90px" :model="fromData" size="small">
          <el-form-item label="名称" label-width="100px">
            <el-input v-model="fromData.examname"></el-input>
          </el-form-item>
          <el-form-item label="班级" label-width="100px">
            <el-input v-model="fromData.grade"></el-input>
          </el-form-item>
          <el-form-item label="应参加人数" label-width="100px">
            <el-input v-model="fromData.totalpeople"></el-input>
          </el-form-item>
          <el-form-item label="实际参加人数" label-width="100px">
            <el-input v-model="fromData.actualpeople"></el-input>
          </el-form-item>
          <el-form-item label="平均分" label-width="100px">
            <el-input v-model="fromData.avgscore"></el-input>
          </el-form-item>
          <el-form-item label="及格人数" label-width="100px">
            <el-input v-model="fromData.passpeople"></el-input>
          </el-form-item>
          <el-form-item label="创建人" label-width="100px">
            <el-input v-model="fromData.createpeople"></el-input>
          </el-form-item>
          <el-form-item label="创建时间" label-width="100px">
            <el-input v-model="fromData.createtime"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              plain
              style="margin-left: 38%"
              @click="isShow = false"
              >取消</el-button
            >
            <el-button type="primary" plain @click="onUpdate">确定</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
      <!-- 新增弹窗 -->
      <el-dialog title="新建考试" :visible.sync="isAdd" width="400px" center>
        <el-form ref="form" label-width="90px" :model="fromData" size="small">
          <el-form-item label="名称" label-width="100px">
            <el-input v-model="fromData.examname"></el-input>
          </el-form-item>
          <el-form-item label="班级" label-width="100px">
            <el-input v-model="fromData.grade"></el-input>
          </el-form-item>
          <el-form-item label="应参加考试人数" label-width="100px">
            <el-input v-model="fromData.totalpeople"></el-input>
          </el-form-item>
          <el-form-item label="实际参加考试人数" label-width="100px">
            <el-input v-model="fromData.actualpeople"></el-input>
          </el-form-item>
          <el-form-item label="平均分" label-width="100px">
            <el-input v-model="fromData.avgscore"></el-input>
          </el-form-item>
          <el-form-item label="及格人数" label-width="100px">
            <el-input v-model="fromData.passpeople"></el-input>
          </el-form-item>
          <el-form-item label="创建人" label-width="100px">
            <el-input v-model="fromData.createpeople"></el-input>
          </el-form-item>
          <el-form-item label="创建时间" label-width="100px">
            <el-input v-model="fromData.createtime"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              plain
              style="margin-left: 40%"
              @click="isAdd = false"
              >取消</el-button
            >
            <el-button type="primary" plain @click="onSubmit">确定</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: "GradeManagement",
  data() {
    return {
      nameSearch: "",
      page: 1,
      form: {
        grade: "",
        createpeople: "",
      },
      //编辑时回显数据
      fromData: {},
      num: "", // 编辑索引
      isSearch: false, //搜索:控制隐藏
      isShow: false, // 编辑：控制隐藏
      isAdd: false, // 添加：控制隐藏
      // currentPage: 1, //当前页
      currentPage: 1,
      tableData: [
        {
          id: 1,
          examname: "Web第一场",
          grade: "1801",
          totalpeople: 60,
          actualpeople: 56,
          avgscore: 80,
          passpeople: 45,
          createtime: "2022-10-10",
          createpeople: "小红",
        },
        {
          id: 2,
          examname: "科学",
          grade: "1903",
          totalpeople: 60,
          actualpeople: 56,
          avgscore: 80,
          passpeople: 45,
          createtime: "2022-10-10",
          createpeople: "小红",
        },
        {
          id: 3,
          examname: "高等数学",
          grade: "1702",
          totalpeople: 60,
          actualpeople: 56,
          avgscore: 80,
          passpeople: 45,
          createtime: "2022-10-10",
          createpeople: "小红",
        },
        {
          id: 4,
          examname: "离散数学",
          grade: "1802",
          totalpeople: 60,
          actualpeople: 56,
          avgscore: 80,
          passpeople: 45,
          createtime: "2022-10-11",
          createpeople: "小红",
        },
        {
          id: 5,
          examname: "概率论",
          grade: "1901",
          totalpeople: 60,
          actualpeople: 56,
          avgscore: 80,
          passpeople: 45,
          createtime: "2022-10-11",
          createpeople: "大牛",
        },
        {
          id: 6,
          examname: "线性代数",
          grade: "1802",
          totalpeople: 60,
          actualpeople: 56,
          avgscore: 80,
          passpeople: 45,
          createtime: "2022-10-10",
          createpeople: "小兰",
        },
        {
          id: 7,
          examname: "英语",
          grade: "1801",
          totalpeople: 60,
          actualpeople: 56,
          avgscore: 80,
          passpeople: 45,
          createtime: "2022-10-12",
          createpeople: "小明",
        },
        {
          id: 8,
          examname: "语文",
          grade: "2001",
          totalpeople: 60,
          actualpeople: 56,
          avgscore: 80,
          passpeople: 45,
          createtime: "2022-10-12",
          createpeople: "小芬",
        },
        {
          id: 9,
          examname: "地理",
          grade: "2003",
          totalpeople: 60,
          actualpeople: 56,
          avgscore: 80,
          passpeople: 45,
          createtime: "2022-10-15",
          createpeople: "林一",
        },
        {
          id: 10,
          examname: "语文",
          grade: "2001",
          totalpeople: 60,
          actualpeople: 56,
          avgscore: 80,
          passpeople: 45,
          createtime: "2022-10-12",
          createpeople: "小芬",
        },
      ],
      rangeRetrievalForm: {
        startRangeScore: "",
        endRangeScore: "",
        startRangeTime: "",
        endRangeTime: "",
        examTime: "",
      },
    };
  },
  methods: {
    // 点击详情按钮，跳转到详情页面
    handleEdit(index, row) {
      this.$router.push("/gradedetails");
      // console.log(index, row);
    },
    //刷新
    async refresh() {
      window.location.reload();
    },
    //搜索
    async onSearch() {
      // const res = await gradeSearch(this.fromData)
      // console.log(res);
      // this.$nextTick(() => {
      //   this.tableData = res
      // })
    },
    //新增
    addData() {
      this.isAdd = true;
      this.num = -1;
      this.fromData = {};
    },
    // 点击确认新增
    async onSubmit() {
      // console.log(this.fromData.examname);
      //将输入的东西写进表格里
      if (!this.fromData.createtime) {
        alert("请输入全部内容");
      } else {
        this.fromData.id = this.fromData.id + 1;
        var ren = {
          examname: this.fromData.examname,
          grade: this.fromData.grade,
          totalpeople: this.fromData.totalpeople,
          actualpeople: this.fromData.actualpeople,
          avgscore: this.fromData.avgscore,
          passpeople: this.fromData.passpeople,
          createtime: this.fromData.createtime,
          createpeople: this.fromData.createpeople,
        };
        this.tableData.push(ren);
        this.isAdd = false;
      }
    },
    // 修改数据
    updateData(index, row) {
      this.num = index;
      this.isShow = true;
      this.fromData = row;
    },
    // 点击确认修改
    onUpdate() {
      // const res = await gradeUpdate(this.fromData)
      // console.log(res);
      // this.$nextTick(() => {
      //   this.tableData = res
      // })
      this.isShow = false;
    },
    //删除
    deleteData(row) {
      this.$confirm("确定要删除此条记录吗？, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            title: "成功",
            message: "删除成功",
            type: "success",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    handleSizeChange(val) {
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    // id查询
    idSearch() {},
  },
};
</script>

<style lang="scss" scoped>
.whole {
  background: aliceblue;
  height: 93vh;
}
.content-grade {
  padding: 20px;
  margin: 0 auto;
  .header {
    height: 5%;
    .left {
      float: left;
      margin-top: 10px;
    }
    .right {
      float: right;
      margin-top: 10px;
    }
  }
  .content {
    height: 100%;
  }
  .footer {
    text-align: center;

    .block {
      // margin-top: 1%;
    }
  }
  // 弹窗
  .el-input,
  .el-input__inner {
    width: 220px;
  }
}
</style>
