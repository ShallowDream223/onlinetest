<template>
    <div>
        <el-form ref="form"  label-width="80px" class="formBox">
            <el-form-item label="" class="choiceTitle"><div class="elExamTitle">第{{$route.query.data.id}}题：{{$route.query.data.title}}</div></el-form-item>
            <el-radio-group v-model="radio" class="checkGroup">
                <el-radio :label="1">{{ $route.query.data.true }}</el-radio>
                <br>
                <el-radio :label="2">{{ $route.query.data.false }}</el-radio>
                
            </el-radio-group> 
        </el-form>
        <!-- {{ handledClick }} -->
    </div>
</template>

<script>

export default {
    name: 'judgeChoice',
   
    data() {
        return {
            form:[
                
            ],
            radio: ""
        }
    },
    methods:{
        handledClick(){
            console.log(this.$route.params);
        }
    },
    mounted(){
        this.handledClick()
    }
}

</script>

<style scoped>
.el-form-item__content::before{
    left: 100px;
}
.checkGroup {
   float: left;
   margin-left: 50px;
   font-size: 20px;
   size:small;
   text-align: left;
}
.elExamTitle{
    width: 100%;
    height: 50px;
    margin-left: -755px;
}
::v-deep(.elExamTitle){
    font-size: 16px;
}
.el-radio{
    margin-bottom: 10px;
    font-size: 18px;
}
.choiceTitle{
    left: 100px;
}

::v-deep(.el-radio__label){
    font-size: 16px;
}

</style>

