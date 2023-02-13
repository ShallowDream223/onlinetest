<template>
    <div>
        <!-- <el-form label-width="80px" label-height="20px" class="formBox">
            <el-form-item label="" class="choiceTitle">
                <div class="elExamTitle">{{$route.query.data.title}}</div>
            </el-form-item>
             <el-checkbox-group v-model="checkList" class="checkGroup" >
                <el-checkbox label='1' style="height:50px">{{ $route.query.data.checkA }}</el-checkbox>
                <br>
                <el-checkbox label="2">{{ $route.query.data.checkB }}</el-checkbox>
                <br>
                <el-checkbox label="3">{{ $route.query.data.checkC }}</el-checkbox>
                <br> 
                <el-checkbox label="a">{{ $route.query.data.checkD }}</el-checkbox>
            </el-checkbox-group>  -->
            <!-- <el-checkbox-group v-model="checkList">
                
                <el-checkbox label="复选框 A" value="1" v-model="hobbies01"></el-checkbox>
                <br>
                <el-checkbox label="复选框 B" value="2" v-model="hobbies01"></el-checkbox>
                <br>
                <el-checkbox label="复选框 C" value="3" v-model="hobbies01"></el-checkbox>
            </el-checkbox-group>
        </el-form> --> -->
        <!-- {{ handledClick }} -->
        <div id="checkbookanswer">
      <el-row>
        <p style="height:50px;line-height:50px">第{{$route.query.data.id}}题：{{$route.query.data.titile}}</p >
        <div class="choose" style="height:300px;line-height:50px;padding-left: 50px;">
            <label for="A">
                <input  type="checkbox" title="a" name="choose" id="A">A、{{$route.query.data.checkB}}
            </label><br/>
            <label for="B">
                <input  type="checkbox" title="b" name="choose" id="B">B、{{$route.query.data.checkB}}
            </label><br/>
            <label for="C">
                <input  type="checkbox" title="c" name="choose" id="C">C、{{$route.query.data.checkB}}
            </label><br/>
            <label for="D">
                <input  type="checkbox" title="d" name="choose" id="D">D、{{$route.query.data.checkB}}
            </label>
        </div>
        </el-row>
    </div>
    </div>
</template>

<script>

export default {
    name: 'multipleChoice',
    // computed: {
    //     handledClick() {
    //         console.log(this.$route.query.title);
    //     }
    // },
    data() {
        return {
            form: [

            ],
            checkList: ""
        }
    },
    methods: {
        handledClick() {
            console.log(this.$route.params);
        }
    },
    mounted() {
        this.handledClick()
    }
}

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

::v-deep(.el-checkbox) {
    margin-bottom: 10px;
    font-size: 18px;
}

.choiceTitle {
    left: 100px;
}

::v-deep(.el-checkbox__label) {
    font-size: 16px;
}
.choose{
    height: 200px;
    width: 300px;
}
</style>