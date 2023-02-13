<template>
    <div>
      <el-form ref="form" label-width="80px" class="formBox">
        <el-form-item label class="choiceTitle">
          <div class="elExamTitle">第{{$route.query.data.id}}题：{{$route.query.data.title}}</div>
        </el-form-item>
        <el-radio-group v-model="radio" class="checkGroup">
          <el-radio label="A">{{ $route.query.data.checkA }}</el-radio>
          <br />
          <el-radio label="B">{{ $route.query.data.checkB }}</el-radio>
          <br />
          <el-radio label="C">{{ $route.query.data.checkC }}</el-radio>
          <br />
          <el-radio label="D">{{ $route.query.data.checkD }}</el-radio>
        </el-radio-group>
      </el-form>
      <!-- {{ handledClick }} -->
    </div>
  </template>
  
  <script>
  export default {
    name: 'singleChoice',
    
    data() {
      return {
        form: [],
        radio: '',
      };
    },
    methods: {
      exam(){
        console.log(this.radio);
      },
      handledClick() {
        console.log(this.radio);
      },
    },
    mounted() {
      // this.handledClick();
    },
  };
  </script>
  
  <style scoped>
  .el-form-item__content::before {
    left: 100px;
  }
  .checkGroup {
    float: left;
    margin-left: 50px;
    font-size: 20px;
    size: small;
    text-align: left;
  }
  .elExamTitle {
    width: 100%;
    height: 50px;
    margin-left: -755px;
  }
  ::v-deep(.elExamTitle) {
    font-size: 16px;
  }
  .el-radio {
    margin-bottom: 10px;
    font-size: 18px;
  }
  .choiceTitle {
    left: 100px;
  }
  
  ::v-deep(.el-radio__label) {
    font-size: 16px;
  }
  .c-headcer{
    height: 50px;
  }
  </style>