<template>
    <div>
        <el-container style="margin-left:0">
            <el-main style="padding:0 auto">
                <el-table :data="tableData.slice((currentPage - 1) * pageSize,currentPage * pageSize)"
                    style="width: 97%;margin:50px auto;" border height="619px" padding-top:100px>
                    <el-table-column prop="id" label="序号" width="80" style="height:'40px'">
                    </el-table-column>
                    <el-table-column prop="name" label="考试名称">
                    </el-table-column>
                    <el-table-column prop="totalScore" label="总分数">
                    </el-table-column>
                    <el-table-column prop="founder" label="创建人">
                    </el-table-column>
                    <el-table-column prop="time" label="时长">
                    </el-table-column>
                    <el-table-column prop="updateTime" label="更新时间">
                    </el-table-column>
                    <el-table-column prop="operate" label="操作" width="100" align="center">
                        <el-button type="success" plain @click="toExam()" size="small" v-if="!full">考试
                        </el-button>
                    </el-table-column>
                </el-table>
                <!-- 分页 -->
                <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                    :current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper" :total="tableData.length"
                    style='text-align:center;padding: 0 5px;'>
                </el-pagination>
            </el-main>
        </el-container>
    </div>
</template>

<script>

export default {
    name: 'examStudent',

    data() {
        return {
            //true是进入全屏，false是退出全屏
            full: false,
            formLabelWidth: "120px",
            content: "",
            //表格数据
            tableData: [
                {
                    id: "1",
                    name: "JAVA第一阶段",
                    totalScore: "100",
                    founder: "管理员",
                    time: "90分钟",
                    updateTime: "2022-10-11"
                },
                {
                    id: "2",
                    name: "JAVA第一阶段",
                    totalScore: "100",
                    founder: "管理员",
                    time: "90分钟",
                    updateTime: "2022-10-11"
                },
                {
                    id: "3",
                    name: "JAVA第一阶段",
                    totalScore: "100",
                    founder: "管理员",
                    time: "90分钟",
                    updateTime: "2022-10-11"
                },
                {
                    id: "4",
                    name: "JAVA第一阶段",
                    totalScore: "100",
                    founder: "管理员",
                    time: "90分钟",
                    updateTime: "2022-10-11"
                },
                {
                    id: "5",
                    name: "JAVA第一阶段",
                    totalScore: "100",
                    founder: "管理员",
                    time: "90分钟",
                    updateTime: "2022-10-11"
                },
                {
                    id: "6",
                    name: "JAVA第一阶段",
                    totalScore: "100",
                    founder: "管理员",
                    time: "90分钟",
                    updateTime: "2022-10-11"
                },
                {
                    id: "7",
                    name: "JAVA第一阶段",
                    totalScore: "100",
                    founder: "管理员",
                    time: "90分钟",
                    updateTime: "2022-10-11"
                },
                {
                    id: "8",
                    name: "JAVA第一阶段",
                    totalScore: "100",
                    founder: "管理员",
                    time: "90分钟",
                    updateTime: "2022-10-11"
                },
                {
                    id: "9",
                    name: "JAVA第一阶段",
                    totalScore: "100",
                    founder: "管理员",
                    time: "90分钟",
                    updateTime: "2022-10-11"
                },
                {
                    id: "10",
                    name: "JAVA第一阶段",
                    totalScore: "100",
                    founder: "管理员",
                    time: "90分钟",
                    updateTime: "2022-10-11"
                },
                {
                    id: "11",
                    name: "JAVA第一阶段",
                    totalScore: "100",
                    founder: "管理员",
                    time: "90分钟",
                    updateTime: "2022-10-11"
                },
                {
                    id: "12",
                    name: "JAVA第一阶段",
                    totalScore: "100",
                    founder: "管理员",
                    time: "90分钟",
                    updateTime: "2022-10-11"
                },
                {
                    id: "13",
                    name: "JAVA第一阶段",
                    totalScore: "100",
                    founder: "管理员",
                    time: "90分钟",
                    updateTime: "2022-10-11"
                },
                {
                    id: "14",
                    name: "JAVA第一阶段",
                    totalScore: "100",
                    founder: "管理员",
                    time: "90分钟",
                    updateTime: "2022-10-11"
                },
                {
                    id: "15",
                    name: "JAVA第一阶段",
                    totalScore: "100",
                    founder: "管理员",
                    time: "90分钟",
                    updateTime: "2022-10-11"
                },
            ],
            //当前页
            currentPage: 1,
            //一页要展示的条数
            pageSize: 10,
        }
    },

   
    mounted() {
        //这里是监听F11案件的
        window.addEventListener("keydown", this.KeyDown, true); // 监听按键事件
    },
    
    methods: {
        //分页器
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            this.pageSize = val
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            this.currentPage = val
        },
        //跳转考试页面 ,
        toExam() {
            this.$confirm('进入考试将不能退出，是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$router.push('/examstudentlist');
                this.fullScreen();
                this.$message({
                    type: 'success',
                    message: '开始考试!'
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '取消考试'
                });
            });
        },
         //进去考试全屏
    // 全屏展示
    fullScreen() {
      this.$fullscreen.enter(this.$refs["container"], {
        wrap: false,
      });
    },
    // 判断当前的屏幕是否为全屏状态
    judgeCurrentScreen() {
      // 非全屏状态
      if (!this.checkFull()) {
        this.isFullscreen = false;
      }
      // 全屏状态
      if (this.checkFull()) {
        this.isFullscreen = true;
      }
    },
    // 判断全屏
    checkFull() {
      //判断浏览器是否处于全屏状态 （需要考虑兼容问题）
      //火狐浏览器
      var isFull =
        document.mozFullScreen ||
        
        document.fullScreen ||
        //谷歌浏览器及Webkit内核浏览器
        document.webkitIsFullScreen ||
        document.webkitRequestFullScreen ||
        document.mozRequestFullScreen ||
        document.msFullscreenEnabled;
      if (isFull === undefined) {
        isFull = false;
      }
      return isFull;
    },
        //监听ESC事件，解决点击按钮全屏后按ESC退出再点击按钮不生效问题。
        checkFull() {
            //判断浏览器是否处于全屏状态 （需要考虑兼容问题）
            //火狐浏览器
            let isFull =
                document.mozFullScreen ||
                document.fullScreen ||
                //谷歌浏览器及Webkit内核浏览器
                document.webkitIsFullScreen ||
                document.webkitRequestFullScreen ||
                document.mozRequestFullScreen ||
                document.msFullscreenEnabled;
            if (isFull === undefined) {
                isFull = false;
            }
            return isFull;
        },
        //点击考试出现弹框
        // open() {
        //     this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        //         confirmButtonText: '确定',
        //         cancelButtonText: '取消',
        //         type: 'warning'
        //     }).then(() => {
        //         this.$message({
        //             type: 'success',
        //             message: '删除成功!'
        //         });
        //     }).catch(() => {
        //         this.$message({
        //             type: 'info',
        //             message: '已取消删除'
        //         });
        //     });
        // }
    },
}
</script>

<style scoped>
::v-deep(.el-table) {
    padding: 0;
}

.el-main {
    padding: 0 auto;
}

.refreshButton {
    width: 90px;
    height: 40px;
    margin-left: 25px;
}

.contraner {
    height: 60px;
    display: flex;
    justify-content: center;
    color: #8d979f;
}

.contraner>span {
    margin: 0 0 0 2px;
}

.left {
    width: 160px;
    height: 60px;
    margin: 0 35px 0 0;
}

.contraner>.center {
    height: 60px;
    width: 610px;
    float: left;
}

.contraner>.center>ul {

    display: flex;
    justify-content: space-between;
    list-style: none;
    padding: 0;
    margin: 0;
}

.contraner>.center>ul>li {
    padding: 0 40px;

}

.mus>li:hover {
    color: #fff;
    background-color: #1890ff;
    cursor: pointer;
}

.right {
    width: 300px;
    height: 60px;
    margin: 0 0 0 100px
}
</style>