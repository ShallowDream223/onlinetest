<template>
  <div>
    <el-container>
      <el-main>
        <div class="main">
          <div class="mainhead">
            <!-- 添加按钮 刷新按钮-->
            <div class="headbut">
              <el-button
                type="primary"
                @click="increase"
                icon="el-icon-plus"
                size="small"
                >添加</el-button
              >&nbsp;
              <el-button
                type="primary"
                icon="el-icon-refresh-right"
                size="small"
                @click="refresh"
                >刷新</el-button
              >
            </div>
            <!-- 搜索框 -->
            <div class="headform">
              <el-form
                :inline="true"
                :model="formInline"
                class="demo-form-inline"
              >
                <el-form-item label="考试名称">
                  <el-input
                    v-model="formInline.name"
                    placeholder="请输入考试名称"
                  ></el-input>
                </el-form-item>
                <el-form-item label="更新时间">
                  <el-input
                    v-model="formInline.oldTime"
                    placeholder="请输入更新时间"
                  ></el-input>
                </el-form-item>
                <el-form-item label="考试时长">
                  <el-input
                    v-model="formInline.time"
                    placeholder="请输入考试时长"
                  ></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button
                    type="primary"
                    @click="onSubmit"
                    size="small"
                    icon="el-icon-search"
                  ></el-button>
                </el-form-item>
              </el-form>
            </div>
          </div>
          <!-- 点击添加显示表单 -->
          <el-dialog
            title="创建考试"
            :visible.sync="dialogVisible"
            width="35%"
            :before-close="handleClose"
            center
          >
            <!-- 步骤条 -->
            <div class="step">
              <el-steps :active="active" finish-status="success">
                <el-step title="考试描述" icon="el-icon-edit"></el-step>
                <el-step title="选择题目" icon="el-icon-upload"></el-step>
              </el-steps>
            </div>
            <!-- 第一步的表单 -->
            <div class="oneform" v-show="oneform">
              <el-form
                :model="ruleForm"
                :rules="rules"
                ref="ruleForm"
                label-width="110px"
                class="demo-ruleForm"
              >
                <el-form-item label="考试名称" prop="name">
                  <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="考试班级" prop="cover">
                  <el-select
                    v-model="ruleForm.cover"
                    placeholder="请输入考试班级"
                  >
                    <el-option label="一班" value="first"></el-option>
                    <el-option label="二班" value="two"></el-option>
                    <el-option label="三班" value="three"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="考试开始时间" required>
                  <el-col :span="15">
                    <el-form-item prop="date1">
                      <el-date-picker
                        type="date"
                        placeholder="选择日期"
                        v-model="ruleForm.date1"
                        style="width: 100%"
                      ></el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-form-item>
                <el-form-item label="考试结束时间" required>
                  <el-col :span="15">
                    <el-form-item prop="date2">
                      <el-date-picker
                        type="date"
                        placeholder="选择日期"
                        v-model="ruleForm.date2"
                        style="width: 100%"
                      ></el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-form-item>
                <el-form-item label="考试时间" prop="duration">
                  <el-input-number
                    v-model.number="ruleForm.duration"
                    controls-position="right"
                    @change="handleChange"
                    style="width: 120px"
                  >
                  </el-input-number>
                  <span>&nbsp;&nbsp;分钟</span>
                </el-form-item>
                <el-form-item label="考试描述" prop="desc">
                  <el-input
                    type="textarea"
                    v-model="ruleForm.desc"
                    maxlength="100"
                    show-word-limit
                  ></el-input>
                </el-form-item>
                <el-form-item>
                  <div class="onebutton">
                    <el-button
                      type="primary"
                      style="margin-top: 12px"
                      @click="next('ruleForm')"
                      >下一步</el-button
                    >
                    <el-button type="primary" @click="cancel">取消</el-button>
                  </div>
                </el-form-item>
              </el-form>
            </div>
            <!-- 第二步的表单 -->
            <div v-show="twoform">
              <div class="twoform">
                <el-form ref="form" :model="form" label-width="80px">
                  <el-form-item label="题型">
                    <el-select
                      v-model="form.questionType"
                      placeholder="请选择题型"
                      style="width: 94%"
                      @change="change"
                    >
                      <el-option label="java基础" value="1"></el-option>
                      <el-option label="javascript" value="2"></el-option>
                    </el-select>
                  </el-form-item>
                </el-form>
              </div>
              <!-- 第二步里面回显的表格 -->
              <div class="onetable">
                <el-table
                  :data="tableDataTwo"
                  border
                  @selection-change="handleSelectionChange"
                >
                  <el-table-column
                    type="selection"
                    width="55"
                  ></el-table-column>
                  <el-table-column
                    prop="subject"
                    label="题目"
                    width="370"
                  ></el-table-column>
                  <el-table-column
                    prop="score"
                    label="分值（分）"
                  ></el-table-column>
                </el-table>
              </div>
              <div class="but">
                <el-button style="margin-top: 12px" @click="previous"
                  >上一步</el-button
                >
                <el-button
                  style="margin-top: 12px"
                  @click="toggleSelection(tableDataTwo)"
                  >立即创建</el-button
                >
                <el-button type="primary" @click="remove">取消</el-button>
              </div>
            </div>
          </el-dialog>
          <!-- 分页列表 表格-->
          <div class="twotables">
            <el-table
              :data="
                tableData.slice(
                  (currentPage - 1) * pageSize,
                  currentPage * pageSize
                )
              "
              border
              style="width: 100%"
            >
              <el-table-column
                prop="date"
                label="序号"
                width="50"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column prop="name" label="名称" width="180">
              </el-table-column>
              <el-table-column prop="score" label="总分数" width="70">
              </el-table-column>
              <el-table-column prop="creator" label="创建人" width="80">
              </el-table-column>
              <el-table-column prop="duration" label="考试时长" width="80">
              </el-table-column>
              <el-table-column
                prop="updateTime"
                label="更新时间"
                min-width="180"
              >
              </el-table-column>
              <el-table-column
                prop="createTime"
                label="创建时间"
                min-width="180"
              >
              </el-table-column>
              <el-table-column
                label="操作"
                width="221"
                fixed="right"
                prop="action"
                align="right"
              >
                <template slot="header">
                  <el-input
                    v-model="search"
                    size="mini"
                    placeholder="输入关键字搜索"
                  />
                </template>
                <template slot-scope="scope">
                  <el-button size="mini" @click="examDetail" type="primary"
                    >详情</el-button
                  >
                  <el-button
                    size="mini"
                    type="success"
                    @click="handleEdit(scope.$index, scope.row)"
                    >编辑</el-button
                  >
                  <el-dialog
                    title="更新考试"
                    :visible.sync="threeform"
                    width="30%"
                    :before-close="handleClose"
                  >
                    <el-form
                      :model="tableform"
                      :rules="rule"
                      ref="tableform"
                      label-width="110px"
                      class="demo-ruleForm"
                    >
                      <el-form-item
                        label="考试名称"
                        prop="name"
                        style="width: 87%"
                      >
                        <el-input v-model="tableform.name"></el-input>
                      </el-form-item>
                      <el-form-item label="考试开始时间" required>
                        <el-col :span="20">
                          <el-form-item prop="data3">
                            <el-date-picker
                              type="date"
                              placeholder="选择日期"
                              v-model="tableform.createTime"
                              style="width: 100%"
                            ></el-date-picker>
                          </el-form-item>
                        </el-col>
                      </el-form-item>

                      <el-form-item label="考试结束时间" required>
                        <el-col :span="20">
                          <el-form-item prop="data4">
                            <el-date-picker
                              type="date"
                              placeholder="选择日期"
                              v-model="tableform.changeTime"
                              style="width: 100%"
                            ></el-date-picker>
                          </el-form-item>
                        </el-col>
                      </el-form-item>
                      <el-form-item label="考试时间" prop="duration">
                        <el-input
                          type="input"
                          v-model="tableform.duration"
                          style="width: 80px"
                        ></el-input
                        ><span>&nbsp;&nbsp;分钟</span>
                      </el-form-item>
                      <el-form-item label="考试描述" prop="desc">
                        <el-input
                          type="textarea"
                          v-model="tableform.desc"
                          style="width: 87%"
                        ></el-input>
                      </el-form-item>
                    </el-form>
                    <div class="nut">
                      <el-button type="primary" @click="sure">确定</el-button>
                      <el-button type="primary" @click="calloff"
                        >取消</el-button
                      >
                    </div>
                  </el-dialog>
                  <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row)"
                    class="delete"
                    >删除</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
            <div class="page">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="pageSizes"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="totalCount"
              >
              </el-pagination>
            </div>
          </div>
        </div>
      </el-main>
      <!-- 底部 -->
      <!-- <el-footer>Footer</el-footer> -->
    </el-container>
  </div>
</template>

<script>
// import Elheader from './Elheader.vue';
export default {
  components: {},
  data() {
    return {
      dialogVisible: false,
      active: 0,
      innerVisible: false,
      oneform: true,
      twoform: false,
      threeform: false,
      pageSizes: [10, 20, 30, 40],
      pageSize: 10,
      currentPage: 1,
      totalCount: 200,
      tableData: [
        {
          date: "01",
          name: "Java基础",
          score: "120",
          creator: "段瑞春",
          duration: "90",
          changeTime: "2022-10-11",
          createTime: "2022-10-13",
        },
      ],
      tableDataTwo: [
        { subject: "java简介", score: "1" },
        { subject: "JavaScript简介", score: "2" },
      ],
      ruleForm: {
        name: "",
        cover: "",
        date1: "",
        date2: "",
        duration: "",
        desc: "",
      },
      rules: {
        name: [{ required: true, message: "请输入考试名称", trigger: "blur" }],
        cover: [{ required: true, message: "请选择班级", trigger: "change" }],
        date1: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change",
          },
        ],
        date2: [
          {
            type: "date",
            required: true,
            message: "请选择时间",
            trigger: "change",
          },
        ],
        desc: [{ required: true, message: "请填写考试描述", trigger: "blur" }],
        duration: [
          { required: true, message: "请填写考试时间", trigger: "blur" },
        ],
      },
      tableform: {
        name: "",
        changeTime: "",
        createTime: "",
        duration: "",
        desc: "",
      },
      rule: {
        name: [{ required: true, message: "请输入考试名称", trigger: "blur" }],
        changeTime: [
          { required: true, message: "请选择时间", trigger: "change" },
        ],
        createTime: [
          { required: true, message: "请选择时间", trigger: "change" },
        ],
        duration: [
          { required: true, message: "请填写考试时间", trigger: "blur" },
        ],
        desc: [{ required: true, message: "请填写考试描述", trigger: "blur" }],
      },
      form: {
        questionType: "",
      },
      formInline: {
        name: "",
        oldTime: "",
        time: "",
      },
      selectionData: [],
    };
  },
  methods: {
    //点击添加按钮执行的回调
    increase() {
      this.ruleForm = {};
      // this.tableDataTwo = [];
      this.active = 0;
      if (this.oneform == false || this.twoform == true) {
        this.oneform = true;
        this.twoform = false;
      }
      //让控制模拟窗口的属性的属性值变为true
      this.dialogVisible = true;
    },
    //刷新按钮的回调
    refresh() {
      window.location.reload();
    },

    //第一步
    //考试时间的输入框的回调
    handleChange(value) {
      console.log(value);
    },

    //第一步下一步按钮的回调
    next(formName) {
      //验证表单是否有未填项
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$message({
            message: "信息填写成功",
            type: "success",
          });
          //步骤条
          if (this.active++ > 2) this.active = 0;
          //第一步的内容隐藏
          this.oneform = false;
          //第二步的内容显示
          this.twoform = true;
        } else {
          this.$message.error("请完善信息");
          return false;
        }
      });
    },
    //第一步取消按钮的回调
    cancel() {
      this.$refs.ruleForm.resetFields();
      this.dialogVisible = false;
    },
    //第二步

    //当第二步的下拉选项选中某个时调用
    change(val) {
      console.log(val);
      //当选中下拉框的某一项的时候把val发给后端请求表格数据
    },
    //把表格选中的行数发送给后端
    handleSelectionChange(val) {
      console.log(val);
      this.selectionData = val;
    },

    //上一步按钮的点击事件的回调
    previous() {
      if (this.active-- <= 0) this.active = 0;
      this.oneform = true;
      this.twoform = false;
    },
    //点击第二步的创建按钮的回调
    toggleSelection(rows) {
      console.log(this.form, "===", this.ruleForm);
      console.log(rows);
      //把两个表单的内容发送给后端

      //关闭模拟窗口
      this.dialogVisible = false;
    },

    //表格

    //详情按钮跳转
    //第二步的取消按钮的回调
    remove() {
      //清空两个表单
      this.$refs.ruleForm.resetFields();
      this.$refs.form.resetFields();
      //关闭窗口
      this.dialogVisible = false;
    },
    //点击X关闭模拟窗口时的回调
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          this.$refs.ruleForm.resetFields();
          done();
        })
        .catch((_) => {});
    },

    //第一个表格

    //详情按钮的点击事件
    examDetail() {
      this.$router.push("/examdetail");
    },
    //编辑按钮的点击回调
    handleEdit(index, row) {
      console.log(index);
      console.log(row);
      this.threeform = true;
      this.tableform = row;
    },
    //点击编辑按钮弹出的模拟窗口的确定按钮
    sure() {
      this.threeform = false;
      //点击确定按钮将数据发送给后端
    },
    //点击编辑按钮弹出的模拟窗口的取消按钮
    calloff() {
      this.threeform = false;
    },
    onSubmit() {
      console.log("submit!");
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    //分页
    //当每页显示的条数改变时触发
    handleSizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
    },
    //当前页码数改变时触发
    handleCurrentChange(val) {
      this.currentPage = val;
    },
  },
  created() {
    //渲染页面时请求的表格数据
    textFunApi().then((res) => {
      console.log(res.data.table);
      this.totalCount = res.data.table.length;
      this.tableData = res.data.table;
    });
    //渲染页面时请求的第一步第二步的选项
  },
};
</script>

<style type="sass" scoped>
::v-deep .el-input__inner {
  height: 33px;
  line-height: 33px;
}
.mainhead {
  margin: 0;
  padding: 0;
}
.headbut {
  float: left;
}
.headform {
  float: left;
}
.oneform {
  margin-top: 10px;
}
.onebutton {
  text-align: right;
}

.twoform {
  margin-top: 10px;
}
.onetable {
  width: 90%;
  /* height: 90%; */
  margin-top: 5%;
  margin-left: 5%;
}
.but {
  margin-top: 30px;
  text-align: center;
}
.twotables {
  margin-top: 10px;
}
.page {
  margin-top: 20px;
}
.nut {
  text-align: center;
}
.delete {
  margin-left: 10px;
}
</style>