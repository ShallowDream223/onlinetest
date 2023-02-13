//李嘉龙
const QuestionList = () => import("../pages/questionList");
const ExamCard = () => import("../pages/examCard");
//刘中洋教师端我的考试
const AllExam = () => import("../pages/myExam/myExam_teacher/AllExam.vue");
const GradeDetails = () =>
  import("../pages/myExam/myExam_teacher/GradeDetails.vue");
//张智柯考试管理学生
const ExamManageStudent = () =>
  import("../pages/examManage/examStudent/examStudent.vue");
const ExamStudentList = () =>
  import("../pages/examManage/examStudent/examStudentList.vue");
const JudgeChoice = () =>
  import("../pages/examManage/examStudent/examination/judgeChoice.vue");
const MultipleChoice = () =>
  import("../pages/examManage/examStudent/examination/multipleChoice.vue");
const SingleChoice = () =>
  import("../pages/examManage/examStudent/examination/singleChoice.vue");
//段瑞春考试管理老师
const ExamManageTeacher = () =>
  import("../pages/examManage/examTeacher/examManage_teacher.vue");
const ExamManageTeacherDetails = () =>
  import("../pages/examManage/examTeacher/examdetail.vue");
//姚婷婷
const MyExamStudent = () => import("../pages/myExam/myExam_student");
const MyExamStudentDetails = () =>
  import("../pages/myExam/myExam_student/Details.vue");

/* 需要权限判断的路由 */
// isTure 属性表示是否显示topaside和ulaside
const dynamicRoutes = [
  {
    path: "/examcard",
    name: "examcard",
    component: ExamCard,
    meta: {
      title: "考试卡片",
      name: "考试卡片",
      icon: "el-icon-s-help",
      isTure: true,
    },
  },
  {
    path: "/questionlist",
    name: "questionlist",
    component: QuestionList,
    meta: {
      icon: "el-icon-s-help",
      name: "问题管理",
      title: "问题管理",
      isTure: true,
    },
  },

  {
    path: "/examstudent",
    name: "examstudent",
    component: ExamManageStudent,
    meta: {
      title: "考试管理",
      name: "考试管理学生",
      icon: "el-icon-s-help",
      isTure: true,
    },
  },
  {
    path: "/examstudentlist",
    name: "examstudentlist",
    component: ExamStudentList,
    meta: {
      name: "考试列表学生",
      icon: "el-icon-s-help",
    },
    children: [
      {
        path: "judgechoice",
        name: "judgechoice",
        component: JudgeChoice,
        meta: {
          name: "判断题",
          icon: "el-icon-s-help",
        },
      },
      {
        path: "multiplechoice",
        name: "multiplechoice",
        component: MultipleChoice,
        meta: {
          name: "多选题",
          icon: "el-icon-s-help",
        },
      },
      {
        path: "singlechoice",
        name: "singlechoice",
        component: SingleChoice,
        meta: {
          name: "单选题",
          icon: "el-icon-s-help",
        },
      },
    ],
  },

  {
    path: "/examteacher",
    name: "examteacher",
    component: ExamManageTeacher,
    meta: {
      title: "考试管理",
      name: "考试管理教师",
      icon: "el-icon-s-help",
      isTure: true,
    },
  },
  {
    path: "/examdetail",
    name: "examdetail",
    component: ExamManageTeacherDetails,
    meta: {
      name: "考试管理教师详情页",
      icon: "el-icon-s-help",
      isTure: true,
    },
  },
  {
    path: "/myexamstudent",
    name: "myexamstudent",
    component: MyExamStudent,
    meta: {
      title: "我的考试",
      name: "我的考试学生",
      icon: "el-icon-s-help",
      isTure: true,
    },
  },
  {
    path: "myexamstudentdetails",
    name: "myexamstudentdetails",
    component: MyExamStudentDetails,
    meta: {
      title: "我的考试学生详情页",
      name: "我的考试学生详情页",
      icon: "el-icon-s-help",
    },
  },
  {
    path: "/allexam",
    name: "allexam",
    component: AllExam,
    meta: {
      name: "老师所有考试",
      icon: "el-icon-s-help",
      title: "我的考试",
      isTure: true,
    },
  },
  {
    path: "/gradedetails",
    name: "gradedetails",
    component: GradeDetails,
    meta: {
      name: "老师成绩详情",
      icon: "el-icon-s-help",
      isTure: true,
    },
  },
];

export default dynamicRoutes;
