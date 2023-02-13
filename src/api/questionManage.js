import { fetchGet, fetchPost } from "@/axios";
const questionManager = {
  //查询题目类型
  questionSelectType() {
    return fetchGet(`/QuestionType/all`);
  },
  //查询题目总条数
  questionSelectTotal() {
    return fetchGet(`/question/selectTotal`);
  },
  //查询题目难度
  questionSelectLevel() {
    return fetchGet(`/questionLevel/all`);
  },
  //查询题目类别
  questionSelectCategory() {
    return fetchGet(`/questionCategory/all`);
  },
  //查询所有问题
  getAllQuestion() {
    return fetchGet(`/getallquestion`);
  },
  insertInto(params) {
    return fetchGet(`/insertinto`, params);
  },
};
export default questionManager;
