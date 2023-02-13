<template>
  <!-- eslint-disable -->
  <div id="questionlist">
    <el-main>
      <!-- 头部新建等按钮 -->
      <div class="header">
        <div class="buttonlist">
          <el-button
            type="primary"
            icon="el-icon-plus"
            size="small"
            @click="buildNewQuestionDialog = true"
            >新建
          </el-button>
          <el-button
            type="primary"
            icon="el-icon-refresh-right"
            size="small"
            @click="refreshAll"
            >全量刷新
          </el-button>
          <!-- 文件上传按钮 -->
          <div
            style="
              display: inline-block;
              margin-right: 10px;
              margin-left: 100px;
            "
          >
            <el-upload
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :before-remove="beforeRemove"
              multiple
              :limit="3"
              :on-exceed="handleExceed"
            >
              <el-button style="" size="small" type="primary"
                >点击上传</el-button
              >
            </el-upload>
          </div>
          <!-- 下载按钮 -->
          <el-button type="primary" size="small" @click="downLoadFile">
            下载
          </el-button>
          <!-- 高级检索按钮及模态框 -->
          <el-button
            type="primary"
            size="small"
            @click="advancedSearchDialog = true"
          >
            高级检索
          </el-button>
          <el-dialog
            title="高级检索"
            :visible.sync="advancedSearchDialog"
            width="30%"
          >
            <el-form :model="advancedSearchForm" label-width="80px">
              <!-- 序号 -->
              <el-form-item label="序号">
                <el-input v-model="advancedSearchForm.index"></el-input>
              </el-form-item>
              <el-form-item label="题干">
                <el-input v-model="advancedSearchForm.stem"></el-input>
              </el-form-item>
              <el-form-item label="创建人">
                <el-input v-model="advancedSearchForm.creator"></el-input>
              </el-form-item>
              <!-- 分数 -->
              <el-form-item label="分数">
                <el-input v-model="advancedSearchForm.score"></el-input>
              </el-form-item>
              <el-form-item label="难度">
                <el-select
                  v-model="advancedSearchForm.level"
                  placeholder="请选择"
                >
                  <el-option label="简单" value="easy"></el-option>
                  <el-option label="中等" value="normal"></el-option>
                  <el-option label="困难" value="hard"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="题型">
                <el-select
                  v-model="advancedSearchForm.type"
                  placeholder="请选择"
                >
                  <el-option label="单选题" value="单选题"></el-option>
                  <el-option label="多选题" value="多选题"></el-option>
                  <el-option label="判断题" value="判断题"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="学科">
                <el-select
                  v-model="advancedSearchForm.classification"
                  placeholder="请选择"
                >
                  <el-option label="语文" value="语文"></el-option>
                  <el-option label="数学" value="数学"></el-option>
                  <el-option label="英语" value="英语"></el-option>
                  <!-- <el-option label="4-框架" value="4-框架"></el-option>
                  <el-option label="5-Linux" value="5-Linux"></el-option> -->
                </el-select>
              </el-form-item>
              <el-form-item label="创建时间">
                <el-date-picker
                  v-model="advancedSearchForm.questionCreateTime"
                  type="datetimerange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                >
                </el-date-picker>
              </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button @click="cancelAdvancedSearch">取 消</el-button>
              <el-button type="primary" @click="confirmAdvancedSearch"
                >确 定</el-button
              >
            </span>
          </el-dialog>
          <!-- el-dialog是创建对话框（模态框），需要绑定:visible.sync后面接按钮绑定的变量true或false来控制显示或隐身 -->
          <el-dialog
            title="创建问题"
            @close="closeBuildNewQuestionDialog"
            :visible.sync="buildNewQuestionDialog"
            width="50%"
            style="min-width: 1330px"
            top="5vh"
          >
            <!-- 对话框的顶部步骤条 -->
            <el-steps :active="active" finish-status="success" align-center>
              <el-step title="问题内容"></el-step>
              <el-step title="问题分类"></el-step>
              <el-step title="问题选项"></el-step>
            </el-steps>
            <!-- 对话框的主体内容，绑定v-show的变量为步骤条的状态以控制对应状态显示对应内容 -->
            <!-- 第一步，问题内容 -->
            <div v-show="active == 0">
              <h4 style="display: inline-block; margin-top: 10px">题干:</h4>
              <div style="display: inline-block; margin-left: 80px">
                <VueWangEditor
                  @getStemContent="getStemContent"
                  ref="stemWangEditor"
                ></VueWangEditor>
              </div>
              <h4 style="display: inline-block; margin-top: 10px">解析：</h4>
              <div style="display: inline-block; margin-left: 80px">
                <VueWangEditor
                  @getParseContent="getParseContent"
                  ref="parseWangEditor"
                ></VueWangEditor>
              </div>
            </div>
            <!-- 第二步，问题分类 -->
            <div v-show="active == 1">
              <el-form
                :label-position="labelPosition"
                :model="ruleForm"
                :rules="rules"
                ref="ruleForm"
                label-width="144px"
              >
                <el-form-item label="题目:">
                  <p class="titleContent" style="display: inline-block">
                    {{ this.ruleForm.stem }}
                  </p>
                </el-form-item>
                <el-form-item label="题型:" prop="type">
                  <el-select
                    v-model="ruleForm.type"
                    placeholder="请选择题目题型"
                    style="width: 80%"
                  >
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="归类:" prop="classification">
                  <el-select
                    v-model="ruleForm.classification"
                    placeholder="请选择题目归类"
                    style="width: 80%"
                  >
                    <el-option
                      v-for="item in options1"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="难度:" prop="questionDifficultLevel">
                  <el-select
                    v-model="ruleForm.level"
                    placeholder="请选择题目难度"
                    style="width: 80%"
                  >
                    <el-option
                      v-for="item in options2"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-form>
            </div>
            <!-- 第三步,问题选项 -->
            <div v-show="active == 2">
              <el-form
                :label-position="labelPosition"
                :model="ruleForm"
                :rules="rules"
                ref="ruleForm"
                label-width="144px"
              >
                <el-form-item label="题目:">
                  <p class="titleContent" style="display: inline-block">
                    {{ this.ruleForm.stem }}
                  </p>
                </el-form-item>
                <!-- 创建选项 -->
                <el-form-item label="选项:">
                  <div v-if="this.ruleForm.type == '单选题'">
                    <el-radio-group v-model="radio">
                      <el-form-item>
                        <el-radio label="A"></el-radio>
                        <el-input
                          v-model.trim="ruleForm.options.answerA"
                          placeholder="请输入选项A"
                          style="width: 450px"
                        ></el-input>
                      </el-form-item>
                      <el-form-item style="margin-top: 20px">
                        <el-radio label="B"></el-radio>
                        <el-input
                          v-model.trim="ruleForm.options.answerB"
                          placeholder="请输入选项B"
                          style="width: 450px"
                        ></el-input>
                      </el-form-item>
                      <el-form-item style="margin-top: 20px">
                        <el-radio label="C"></el-radio>
                        <el-input
                          v-model.trim="ruleForm.options.answerC"
                          placeholder="请输入选项C"
                          style="width: 450px"
                        ></el-input>
                      </el-form-item>
                      <el-form-item style="margin-top: 20px">
                        <el-radio label="D"></el-radio>
                        <el-input
                          v-model.trim="ruleForm.options.answerD"
                          placeholder="请输入选项D"
                          style="width: 450px"
                        ></el-input>
                      </el-form-item>
                    </el-radio-group>
                  </div>
                  <div v-if="this.ruleForm.type == '多选题'">
                    <el-checkbox-group v-model="checkList">
                      <el-form-item>
                        <el-checkbox
                          style="margin-right: 30px"
                          label="A"
                        ></el-checkbox>
                        <el-input
                          v-model.trim="ruleForm.options.answerA"
                          placeholder="请输入选项A"
                          style="width: 450px"
                        ></el-input>
                      </el-form-item>
                      <el-form-item style="margin-top: 20px">
                        <el-checkbox
                          style="margin-right: 30px"
                          label="B"
                        ></el-checkbox>
                        <el-input
                          v-model.trim="ruleForm.options.answerB"
                          placeholder="请输入选项B"
                          style="width: 450px"
                        ></el-input>
                      </el-form-item>
                      <el-form-item style="margin-top: 20px">
                        <el-checkbox
                          style="margin-right: 30px"
                          label="C"
                        ></el-checkbox>
                        <el-input
                          v-model.trim="ruleForm.options.answerC"
                          placeholder="请输入选项C"
                          style="width: 450px"
                        ></el-input>
                      </el-form-item>
                      <el-form-item style="margin-top: 20px">
                        <el-checkbox
                          style="margin-right: 30px"
                          label="D"
                        ></el-checkbox>
                        <el-input
                          v-model.trim="ruleForm.options.answerD"
                          placeholder="请输入选项D"
                          style="width: 450px"
                        ></el-input>
                      </el-form-item>
                    </el-checkbox-group>
                  </div>
                  <div v-if="this.ruleForm.type == '判断题'">
                    <el-radio-group v-model="judge">
                      <el-radio
                        label="正确"
                        v-model="this.ruleForm.trueAnswer"
                      ></el-radio>
                      <el-radio
                        label="错误"
                        v-model="this.ruleForm.falseAnswer"
                      ></el-radio>
                    </el-radio-group>
                  </div>
                </el-form-item>
                <el-form-item label="正确答案:">
                  <div v-if="this.ruleForm.type == '单选题'">
                    {{ this.radio }}
                  </div>
                  <div v-if="this.ruleForm.type == '多选题'">
                    {{ this.checkList.join(",") }}
                  </div>
                  <div v-if="this.ruleForm.type == '判断题'">
                    {{ this.judge }}
                  </div>
                </el-form-item>
              </el-form>
            </div>
            <el-button
              style="margin-top: 12px"
              @click="prev"
              v-if="this.active != 0"
              >上一步</el-button
            >
            <el-button
              style="margin-top: 12px"
              @click="
                next();
                nextRequest('ruleForm');
              "
              v-if="active != 2"
              >下一步</el-button
            >
            <el-button
              style="margin-top: 12px"
              type="primary"
              @click="completeToNewQuestion"
              v-if="this.active == 2"
              >完成</el-button
            >
          </el-dialog>
          <!-- 题目详情模态框 -->
          <el-dialog
            title="题目详情"
            :visible.sync="questionDetail"
            width="40%"
            style="min-width: 1330px"
            top="5vh"
          >
            <el-form style="margin-left: 100px">
              <el-form-item label="题干:">
                <div style="margin-left: 50px">
                  {{ this.questionInfo.stem }}
                </div>
              </el-form-item>
              <el-form-item label="选项:">
                <!-- 单选题时 -->
                <div v-if="this.questionInfo.type == '单选题'">
                  <ul style="margin-left: 50px">
                    <li
                      v-for="(value, name, index) in this.questionInfo.options"
                    >
                      {{ name.charAt(name.length - 1) }}.{{ value }}
                    </li>
                  </ul>
                </div>
                <!-- 当是多选题的时候 -->
                <div v-if="this.questionInfo.type == '多选题'">
                  <ul style="margin-left: 50px">
                    <li
                      v-for="(value, name, index) in this.questionInfo.options"
                    >
                      {{ name.charAt(name.length - 1) }}.{{ value }}
                    </li>
                  </ul>
                </div>
                <!-- 当是判断题的时候 -->
                <div v-if="this.questionInfo.type == '判断题'">
                  <ul style="margin-left: 50px">
                    <li>A.正确</li>
                    <li>B.错误</li>
                  </ul>
                </div>
              </el-form-item>
              <!-- 答案表单项 -->
              <el-form-item label="答案:">
                <div>
                  <ul>
                    <li
                      style="display: inline-block; margin-left: 10px"
                      v-for="(value, name, index) in this.questionInfo
                        .trueAnswer"
                    >
                      {{ value }}
                    </li>
                  </ul>
                </div>
              </el-form-item>
              <!-- 解析表单项 -->
              <el-form-item label="解析:">
                <div style="margin-left: 50px">
                  {{ this.questionInfo.description }}
                </div>
              </el-form-item>
            </el-form>
            <!-- 关闭按钮 -->
            <el-button
              style="margin-top: -25px; float: right"
              type="primary"
              @click="questionDetail = false"
              >关 闭</el-button
            >
          </el-dialog>
          <!-- 编辑题目模态框 -->
          <el-dialog
            title="编辑题目"
            :visible.sync="editQuestionDialog"
            width="40%"
            @close="closeEditQuestionDialog"
            style="min-width: 1330px"
            top="5vh"
          >
            <h4 style="display: inline-block; margin-top: 10px">题干:</h4>
            <!-- 题干富文本编辑区 -->
            <div style="display: inline-block; margin-left: 80px">
              <VueWangEditor
                @getStemContent="editStemContent"
                ref="editWangEditor"
              ></VueWangEditor>
            </div>
            <!-- 按题目类型来区分对应块区的显隐 -->
            <!-- 单选 -->
            <div v-if="this.questionInformation" style="margin-left: 80px">
              <el-form>
                <el-radio-group v-model="editNewRadio">
                  <el-form-item style="margin-top: 20px">
                    <el-radio label="A"></el-radio>
                    <el-input
                      v-model.trim="currentRowInfo.options.answerA"
                      placeholder="请输入选项A"
                      style="width: 450px"
                    ></el-input>
                  </el-form-item>
                  <el-form-item style="margin-top: 20px">
                    <el-radio label="B"></el-radio>
                    <el-input
                      v-model.trim="currentRowInfo.options.answerB"
                      placeholder="请输入选项B"
                      style="width: 450px"
                    ></el-input>
                  </el-form-item>
                  <el-form-item style="margin-top: 20px">
                    <el-radio label="C"></el-radio>
                    <el-input
                      v-model.trim="currentRowInfo.options.answerC"
                      placeholder="请输入选项C"
                      style="width: 450px"
                    ></el-input>
                  </el-form-item>
                  <el-form-item style="margin-top: 20px">
                    <el-radio label="D"></el-radio>
                    <el-input
                      v-model.trim="currentRowInfo.options.answerD"
                      placeholder="请输入选项D"
                      style="width: 450px"
                    ></el-input>
                  </el-form-item>
                </el-radio-group>
              </el-form>
            </div>
            <!-- 多选 -->
            <div v-if="this.questionInformationduo" style="margin-left: 80px">
              <el-form>
                <el-checkbox-group v-model="editNewCheckList">
                  <el-form-item style="margin-top: 20px">
                    <el-checkbox
                      label="A"
                      style="margin-right: 30px"
                    ></el-checkbox>
                    <el-input
                      v-model.trim="currentRowInfo.options.answerA"
                      placeholder="请输入选项A"
                      style="width: 450px"
                    ></el-input>
                  </el-form-item>
                  <el-form-item style="margin-top: 20px">
                    <el-checkbox
                      label="B"
                      style="margin-right: 30px"
                    ></el-checkbox>
                    <el-input
                      v-model.trim="currentRowInfo.options.answerB"
                      placeholder="请输入选项B"
                      style="width: 450px"
                    ></el-input>
                  </el-form-item>
                  <el-form-item style="margin-top: 20px">
                    <el-checkbox
                      label="C"
                      style="margin-right: 30px"
                    ></el-checkbox>
                    <el-input
                      v-model.trim="currentRowInfo.options.answerC"
                      placeholder="请输入选项C"
                      style="width: 450px"
                    ></el-input>
                  </el-form-item>
                  <el-form-item style="margin-top: 20px">
                    <el-checkbox
                      label="D"
                      style="margin-right: 30px"
                    ></el-checkbox>
                    <el-input
                      v-model.trim="currentRowInfo.options.answerD"
                      placeholder="请输入选项D"
                      style="width: 450px"
                    ></el-input>
                  </el-form-item>
                </el-checkbox-group>
              </el-form>
            </div>
            <!-- 判断题 -->
            <div
              v-if="this.questionInformationpanduan"
              style="margin-left: 80px"
            >
              <el-form>
                <el-radio-group v-model="editNewJudge">
                  <el-form-item style="margin-top: 20px">
                    <el-radio
                      label="正确"
                      v-model="this.ruleForm.trueAnswer"
                    ></el-radio>
                  </el-form-item>
                  <el-form-item style="margin-top: 20px">
                    <el-radio
                      label="错误"
                      v-model="this.ruleForm.falseAnswer"
                    ></el-radio>
                  </el-form-item>
                </el-radio-group>
              </el-form>
            </div>
            <!-- 答案 -->
            <div style="margin-left: 80px">
              <el-form>
                <el-form-item label="正确答案:">
                  <div v-if="this.questionInformation">
                    {{ this.editNewRadio }}
                  </div>
                  <div v-if="this.questionInformationduo">
                    {{ this.editNewCheckList.join(",") }}
                  </div>
                  <div v-if="this.questionInformationpanduan">
                    {{ this.editNewJudge }}
                  </div>
                </el-form-item>
              </el-form>
            </div>
            <!-- 问题解析富文本编辑区 -->
            <h4 style="display: inline-block; margin-top: 10px">解析：</h4>
            <div style="display: inline-block; margin-left: 80px">
              <VueWangEditor
                @getParseContent="editParseContent"
              ></VueWangEditor>
            </div>
            <!-- 取消按钮 -->
            <el-button
              style="margin-left: 468px; margin-top: 20px"
              @click="cancelEditQuestion"
            >
              取 消
            </el-button>
            <!--保存按钮 -->
            <el-button
              style="margin-left: 20px; margin-top: 20px"
              type="primary"
              @click="saveEditQuestion"
            >
              保 存
            </el-button>
          </el-dialog>
        </div>
      </div>
      <!-- 表格内容 -->
      <el-table
        border
        :data="
          tableData
            .filter(
              (data) =>
                !search ||
                data.creator.toLowerCase().includes(search.toLowerCase()) ||
                data.description.toLowerCase().indexOf(search.toLowerCase()) >
                  -1 ||
                data.stem.toLowerCase().indexOf(search.toLowerCase()) > -1
            )
            .slice((currentPage - 1) * pageSize, currentPage * pageSize)
        "
        id="download"
        style="width: 100%; margin-top: 20px"
      >
        >
        <el-table-column label="序号" prop="serial" type="index" width="50">
        </el-table-column>
        <el-table-column
          prop="stem"
          label="题干"
          min-width="180"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="description"
          label="解析"
          min-width="180"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="score"
          label="分数"
          width="50"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="creator"
          label="创建人"
          show-overflow-tooltip
          width="80"
        ></el-table-column>
        <el-table-column
          prop="level"
          label="难度"
          show-overflow-tooltip
          width="70"
        ></el-table-column>
        <el-table-column
          prop="type"
          label="题型"
          show-overflow-tooltip
          width="100"
        ></el-table-column>
        <el-table-column
          prop="classification"
          label="学科"
          show-overflow-tooltip
          width="90"
        ></el-table-column>
        <el-table-column
          prop="updateTime"
          label="更新时间"
          show-overflow-tooltip
          width="170"
        ></el-table-column>
        <el-table-column
          prop="action"
          align="right"
          width="221"
          fixed="right"
          show-overflow-tooltip
        >
          <template slot="header" slot-scope="scope">
            <el-input
              v-model="search"
              size="mini"
              placeholder="输入关键字搜索"
            />
          </template>
          <template slot-scope="scope">
            <!-- 详情按钮 -->
            <el-button
              size="mini"
              type="primary"
              @click="handleDetail(scope.$index, scope.row)"
              >详情</el-button
            >
            <!-- 编辑按钮 -->
            <el-button
              size="mini"
              type="success"
              @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-sizes="pageSizes"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="this.totalNumber"
          style="margin-top: 28px"
        >
          >
        </el-pagination>
      </div>
    </el-main>
  </div>
</template>

<script>
import VueWangEditor from "@/components/VueWangEditor.vue";
import FileSaver from "file-saver";
import XLSX from "xlsx";
// import {Form as ElForm} from 'element-ui'
export default {
  components: {
    VueWangEditor,
  },
  creator: "QuestionManage",
  data() {
    var validateQuestionType = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请选择题目类型"));
      } else {
        callback();
      }
    };

    var validateDifficultLevel = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请选择题目难度"));
      } else {
        callback();
      }
    };
    var validateClassification = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请选择题目分类"));
      } else {
        callback();
      }
    };
    return {
      totalNumber: "",
      // 设置一个精确查询用来展示到界面的变量
      showTableData: [],
      //模糊查询的变量
      //这三个变量是三种不同类别的正确答案
      radio: "",
      checkList: [],
      judge: "",
      pageSize: 10,
      pageSizes: [10, 20, 30, 40],
      // 这三个是控制编辑问题按钮的选项和答案按类别显隐不同div块的变量
      questionInformation: "",
      questionInformationduo: "",
      questionInformationpanduan: "",
      //
      editNewRadio: "",
      //editNewRadio是单选题编辑答案时的正确答案的值
      editNewCheckList: [],
      //editNewCheckList是多选题编辑答案时的正确答案的值
      editNewJudge: "",
      //editNewJudge是判断题编辑答案时的正确答案的值
      // 默认当前页
      currentPage: 1,
      optionsarr: ["A", "B", "C", "D"],
      // activeIndex: '1',
      //tableData中存储的数据应该还携带了这道题目的正确答案，选项，解析等信息
      // 当新建问题时，提交的问题应该携带的信息creator应该是当前的用户名
      tableData: [],
      search: "",
      // 高级检索对话框显隐的变量
      advancedSearchDialog: false,
      //高级检索的模态框变量
      advancedSearchForm: {
        index: "",
        score: "",
        creator: "",
        stem: "",
        type: "",
        level: "",
        questionCreateTime: "",
        classification: "",
      },
      //新建问题的模态框变量
      buildNewQuestionDialog: false,
      //新建问题的步骤状态
      active: 0,
      //题目详情的模态框
      questionDetail: false,
      //编辑题目模态框
      editQuestionDialog: false,
      labelPosition: "right",
      //规则表单
      ruleForm: {
        questionid: "",
        creator: localStorage.getItem("token"),
        type: "",
        classification: "",
        level: "",
        score: "",
        options: {
          answerA: "",
          answerB: "",
          answerC: "",
          answerD: "",
        },
        updateTime: "",
        questionCreateTime: "2022-10-20",
        stem: "",
        description: "",
        trueAnswer: "",
        falseAnswer: "false",
      },
      rules: {
        type: [
          {
            required: true,
            message: "请选择题目类型",
            trigger: "change",
            validator: validateQuestionType,
          },
        ],
        classification: [
          {
            required: true,
            message: "请选择题目归类",
            trigger: "change",
            validator: validateClassification,
          },
        ],
        questionDifficultLevel: [
          {
            required: true,
            message: "请选择题目难度",
            trigger: "change",
            validator: validateDifficultLevel,
          },
        ],
      },
      questionInfo: {},
      editForm: {
        stem: "",
        description: "",
        options: {
          answerA: "",
          answerB: "",
          answerC: "",
          answerD: "",
        },
        // trueAnswer:'',
      },
      // 用一个变量来存储当前行的几个数据
      currentRowInfo: {},
      ruleFormCopy: {
        questionid: "",
        creator: localStorage.getItem("token"),
        type: "",
        classification: "",
        level: "",
        score: "",
        options: {
          answerA: "",
          answerB: "",
          answerC: "",
          answerD: "",
        },
        updateTime: "",
        questionCreateTime: "2022-10-20",
        stem: "",
        description: "",
        trueAnswer: "",
        falseAnswer: "false",
      },
      options: [
        {
          value: "单选题",
          label: "单选题",
        },
        {
          value: "多选题",
          label: "多选题",
        },
        {
          value: "判断题",
          label: "判断题",
        },
      ],
      options1: [
        {
          label: "语文",
          value: "语文",
        },
        {
          label: "数学",
          value: "数学",
        },
        {
          label: "英语",
          value: "英语",
        },
      ],
      options2: [
        {
          label: "难",
          value: "difficult",
        },
        {
          label: "中",
          value: "normal",
        },
        {
          label: "易",
          value: "easy",
        },
      ],
      rules: {
        type: [
          {
            required: true,
            message: "请选择题目类型",
            trigger: "change",
            validator: validateQuestionType,
          },
        ],
        classification: [
          {
            required: true,
            message: "请选择题目归类",
            trigger: "change",
            validator: validateClassification,
          },
        ],
        questionDifficultLevel: [
          {
            required: true,
            message: "请选择题目难度",
            trigger: "change",
            validator: validateDifficultLevel,
          },
        ],
      },
    };
  },
  methods: {
    // handleSelect(key, keyPath) {
    //   console.log(key, keyPath);
    //   },
    //   TurnPageql() {
    //     this.$router.push()
    // },
    async handleDetail(index, row) {
      //row是一个对象，身上携带了此行表格的所有数据
      // console.log(index,row);
      this.questionDetail = true;
      this.questionInfo = { ...row };
      // console.log(typeof this.questionInfo.options);//object
    },
    //编辑按钮应该要使得页面上的数据变化。同时项后台提交的一份改变后的数据
    // 所以应该有两部分逻辑
    // 因为this.currentRowInfo是一个对象，所以this.currentRowInfo = row是浅拷贝,这两个变量指向的是同一个对象，因此刚好可以用来存储当前行的数据
    async handleEdit(index, row) {
      (this.editQuestionDialog = true), console.log(row);
      this.currentRowInfo = row;
      console.log(this.currentRowInfo);
      if (row.type == "单选题") {
        (this.questionInformation = true),
          (this.questionInformationduo = false),
          (this.questionInformationpanduan = false);
      } else if (row.type == "多选题") {
        this.questionInformation = false;
        this.questionInformationduo = true;
        this.questionInformationpanduan = false;
      } else {
        this.questionInformation = false;
        this.questionInformationduo = false;
        this.questionInformationpanduan = true;
      }
    },
    // 删除按钮，首先应当是向后端发出删除请求，然后后端删除数据，返回删除后的新数据，然后我在把新返回的数据渲染到页面上
    // 或者是我现在页面上删除，然后再向后端发出删除请求，后端删除数据，返回删除操作过后的新数据，由于此时页面上显示的效果是这行内删除了
    // 那么即使需要再次渲染，但页面的显示效果是没有变化的。所以这样可以先给用户直观的删除感官效果，而不用等待后端返回数据，再渲染页面，
    // 但是这样的话，如果后端删除失败，那么页面上的数据就会和后端的数据不一致，所以这种方法也有缺点
    // 因此或许可以设置一个定时器，如果在一定时间内没有收到后端的返回数据，那么就提示用户删除失败，然后再重新渲染页面
    // 如果再一定时间内，获得到了返回的结果，那么就取消这个定时器，然后重新渲染页面
    // 或者是在删除按钮上设置一个loading效果，等待后端返回数据，如果返回成功，那么就关闭loading效果，如果返回失败，那么就提示用户删除失败
    // 因此问题的数据属性中，应当有一个主键，用来唯一标识一道题目，这样才能够在删除时，向后端发出删除请求，后端根据主键删除数据，uuid
    handleDelete(index, row) {
      // console.log(index, row);
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          // console.log(row);
          // 在tabel的序号列中，设置了type为index，这个index，就是序号-1
          console.log(index);
          //  this.$message({
          //   type: 'success',
          //   message: '删除成功!'
          // });
          // const { data: res } = await this.$http.delete(`questions/${row.id}`);
          // console.log(res);
          if (res.meta.status !== 200) return this.$message.error("删除失败");
          this.$message.success("删除成功");
          this.getQuestionList();
        })
        .catch(() => {
          this.$message.info("已取消删除");
        });
    },
    handleSizeChange(val) {
      this.pageSize = val;
      // console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`)

      this.currentPage = val;
    },
    next() {
      if (this.active++ > 2) this.active = 0;
    },
    prev() {
      if (this.active-- < 0) this.active = 2;
      if (this.active == 0) {
        // this.ruleForm.questioncontent.stemcontent = ''
        // this.ruleForm.questioncontent.analysiscontent = ''
        this.ruleForm.type = "";
        this.ruleForm.classification = "";
        this.ruleForm.questionDifficultLevel = "";
      }
      if (this.active == 1) {
        this.radio = "";
        this.checkbox = [];
        this.judge = "";
        this.ruleForm.options.answerA = "";
        this.ruleForm.options.answerB = "";
        this.ruleForm.options.answerC = "";
        this.ruleForm.options.answerD = "";
        this.ruleForm.trueAnswer = "";
        this.ruleForm.falseAnswer = "";
      }
    },
    getStemContent(stemText) {
      this.ruleForm.stem = stemText;
    },
    getParseContent(parseText) {
      this.ruleForm.description = parseText;
    },
    editStemContent(stemText) {
      this.editForm.stem = stemText;
    },
    editParseContent(parseText) {
      this.editForm.description = parseText;
    },
    nextRequest(formName) {
      if (this.active == 1) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert("submit!");
          } else {
            console.log("error submit!!");
            return false;
          }
        });
      }
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.creator}？`);
    },
    clearStemContent() {},
    // 新建问题叉号关闭模态框
    closeBuildNewQuestionDialog() {
      this.active = 0;
      this.ruleForm = { ...this.ruleFormCopy };
      this.ruleForm.stem = "";
      this.$refs.stemWangEditor.clearContent();
      this.$refs.parseWangEditor.clearContent();
      // if (this.$refs["ruleForm"] !== undefined) {
      //   console.log(1);
      //   this.$refs["ruleForm"].resetFields()
      //   console.log(this.ruleForm);
      //    console.log(this.$refs["ruleForm"].$props={...});
      // }
    },
    // 重置问题表单
    // resetForm(formName) {
    //   // Object.assign(this.$data.[formName], this.$options.data().ruleForm)
    //   if (this.$refs[formName] !== undefined) {
    //      this.$refs[formName].resetFields()
    //   }
    // },
    //完成新建问题
    completeToNewQuestion() {
      // 将数据添加到DadaTable中
      (this.ruleForm.trueAnswer = this.radio
        ? this.radio
        : this.checkbox
        ? this.checkbox
        : this.judge
        ? this.judge
        : null),
        console.log(this.ruleForm);
      this.$api.questionManager.insertInto(this.ruleForm).then(() => {
        this.refreshAll();
        this.radio = "";
        this.checkList = [];
        this.judge = "";
        this.buildNewQuestionDialog = false;
      });
    },
    // 获取当前时间
    getNowFormatDate() {
      var date = new Date();
      var seperator1 = "-";
      var seperator2 = ":";
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      var currentdate =
        date.getFullYear() + seperator1 + month + seperator1 + strDate;
      // + " " + date.getHours() + seperator2 + date.getMinutes()
      // + seperator2 + date.getSeconds();
      return currentdate;
    },
    // 编辑问题的上方关闭按钮
    closeEditQuestionDialog() {
      this.cancelEditQuestion();
    },
    // 取消编辑
    cancelEditQuestion() {
      this.$refs.editWangEditor.clearContent();
      this.editQuestionDialog = false;
      this.questionInformation = false;
      this.questionInformationduo = false;
      this.questionInformationpanduan = false;
      this.editNewRadio = "";
      //editNewRadio是单选题编辑答案时的正确答案的值
      this.editNewCheckList = [];
      //editNewCheckList是多选题编辑答案时的正确答案的值
      this.editNewJudge = "";
      //editNewJudge是判断题编辑答案时的正确答案的值
      this.editForm.options.answerA = "";
      this.editForm.options.answerB = "";
      this.editForm.options.answerC = "";
      this.editForm.options.answerD = "";
      this.editForm.description = "";
      this.editForm.stem = "";
    },
    //保存编辑内容
    // 因为点击了编辑按钮后,currentRowInfo就获取到了当前行的数据,由于都是对象并且没有使用解构赋值,导致currenRowInfo的值与row的地址绑定了,因此只需要改变currenRowInfo的值就可以改变row的值
    // 而且保存按钮是在点击编辑按钮之后才出现,因此currenRowInfo里面一定已经存储了数据了

    // 2.0应该是先把编辑表单里不为空的属性的属性的值拿出来,然后再把这些属性的值赋给currentRowInfo,这样就不会出现currentRowInfo里面的值为空的情况了
    saveEditQuestion() {
      this.currentRowInfo.stem = this.editForm.stem;
      console.log(this.editForm.stem);
      this.currentRowInfo.description = this.editForm.description;
      // this.currentRowInfo.options = this.editForm.options;
      if (this.currentRowInfo.type == "单选题") {
        this.currentRowInfo.trueAnswer = this.editNewRadio;
      } else if (this.currentRowInfo.type == "多选题") {
        this.currentRowInfo.trueAnswer = this.editNewCheckList;
      } else {
        this.currentRowInfo.trueAnswer = this.editNewJudge;
        // key_buffer = 16M
      }
      // this.currenRowInfo.trueAnswer = this.editNewRadio?this.editNewRadio:this.editNewCheckList?this.editNewCheckList:this.editNewJudge?this.editNewJudge:null;
      this.editQuestionDialog = false;
    },
    // 取消高级搜索
    cancelAdvancedSearch() {
      this.advancedSearchDialog = false;
    },
    //确认高级搜索
    // 封装一个时间中国标准时间转换为时间戳的函数
    getUnixTime(dateStr) {
      return new Date(dateStr).getTime();
    },
    confirmAdvancedSearch() {
      // const Search_List = [];
      let indexCondition = this.advancedSearchForm.index.trim();
      // 先过滤advancedSearchForm,将里面的值为空的属性去掉，然后将advancedSearchForm的剩余属性（即值不为空，存在输入值的属性）进行遍历，
      // 然后将遍历出来的属性作为参数传入filter函数中item，然后将filter函数返回的结果赋值给searchArr
      // 最后将searchArr赋值给tableData
      // 但是filter函数只支持数组
      // const Search_List = [];
      let searchArr = this.showTableData;
      if (indexCondition !== "") {
        searchArr = [searchArr[indexCondition - 1]];
        this.tableData = searchArr;
        this.advancedSearchDialog = false;
        return searchArr;
      }

      const condition = { ...this.advancedSearchForm };
      Object.keys(condition).forEach((key) => {
        if (condition[key] === "") {
          delete condition[key];
        }
      });
      for (let key in condition) {
        searchArr = searchArr.filter((item) => {
          return item[key] == condition[key];
        });
      }
      console.log(searchArr);
      this.tableData = searchArr;
      //   this.$message({
      //     message: '请至少输入一个搜索条件',
      //     type: 'warning'
      //   });
      // }

      this.advancedSearchDialog = false;
    },
    //全量刷新
    // 应该是向后端发送请求，获取最新的数据，然后将最新的数据赋值给tableData
    refreshAll() {
      this.$api.questionManager.getAllQuestion({}).then((res) => {
        this.tableData = res.data.arguments[2];
        this.totalNumber = this.tableData.length;
      });
      this.tableData = this.showTableData;
    },
    // 下载按钮
    downLoadFile() {
      var wb = XLSX.utils.table_to_book(
        // 要转换的表格的dom对象
        document.querySelector("#download")
      );
      var wbout = XLSX.write(wb, {
        bookType: "xlsx", // 要生成的文件类型
        bookSST: true,
        type: "array",
      });
      try {
        FileSaver.saveAs(
          new Blob([wbout], {
            type: "application/octet-stream",
          }),
          "下载.xlsx"
        );
      } catch (e) {
        /* 处理磁盘满的情况 */
        if (typeof console !== "undefined") console.log(e, wbout);
      }
    },
  },
  watch: {},
  beforeMount() {
    this.$api.questionManager.getAllQuestion({}).then((res) => {
      this.tableData = res.data.arguments[2];
      this.showTableData = this.tableData;
      this.totalNumber = this.tableData.length;
    });
  },
  mounted() {},
};
</script>

<style >
* {
  margin: 0;
  padding: 0;
}
.header {
  height: 45px;
}
.el-menu-vertical-demo {
  padding-left: 100px;
}
.el-image {
  width: 40px;
  height: 40px;
  float: left;
  margin-top: 10px;
  color: white;
}
.el-tag {
  float: left;
  position: relative;
  top: 50%;
  transform: translateY(50%);
  border: 0;
}
.el-main {
  background-color: aliceblue;
}
.crumbs {
  margin-top: 20px;
  /* background-color: aliceblue; */
  height: 50px;
}
#questionlist {
  background-color: aliceblue;
  /* height: 100%; */
}
.buttonlist {
  margin-top: 10px;
}
</style>