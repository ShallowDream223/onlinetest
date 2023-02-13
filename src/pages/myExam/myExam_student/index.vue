<template>
  <!-- eslint-disable -->
  <div class="box">
    <el-row style="text-aline:center">
      <el-button type="primary" style="width:90px;height:40px;margin-top:25px;margin-left:97px;">刷新</el-button>
      <!-- <el-dropdown>
        <el-input
          v-model="search"
          size="mini"
          placeholder="输入关键字搜索"/>
      </el-dropdown> -->
      
      <el-button type="primary" style="width:100px;height:40px;margin-left:250px;text-align: center;margin-top:15px;">
        考试时常(分钟)</el-button> <b> —— </b>
      <el-button type="primary" style="width:100px;height:40px;margin-left:5px;text-align: center;margin-top:15px;">
        90(分钟)</el-button>
      <!-- <span class="timeruning">{{day}}天{{hr}}:{{min}}:{{sec}}</span> -->
      <el-button type="primary" style="width:90px;height:40px;margin-left:180px;text-align: center;margin-top:15px;">
        参考时间</el-button> <b> —— </b>
      <el-button type="primary" style="width:250px;height:40px;margin-left:5px;text-align: center;margin-top:15px;">
        <span>{{ dateFormat(newDate) }}</span>
        <el-input
          v-model="search"
          size="mini" style="margin-left:150px"
          placeholder="考试查询"/>
      </el-button>
      <el-input placeholder="请输入名称进行查询" v-model="search" style="width:200px">
      </el-input>
      <ul>
        <li v-for="(item,index) in searchResult" :key="index" @click="chooseClick(index) "
          :class="{active:index==isActive}">{{item}}</li>
      </ul>
      <div class="box1">
        <el-table  v-if="tableData" :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))" border style="width:1630px;">
          <el-table-column fixed prop="id" label="序号" width="160">
          </el-table-column>
          <el-table-column prop="face" label="封面" width="200">
          </el-table-column>
          <el-table-column prop="name" label="名称" width="200">
          </el-table-column>
          <el-table-column prop="grade" label="总分数" width="200">
          </el-table-column>
          <el-table-column prop="person" label="创建人" width="200">
          </el-table-column>
          <el-table-column prop="time" label="时常" width="200">
          </el-table-column>
          <el-table-column prop="update" label="更新时间" width="240">
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="160px">

            <template slot-scope="scope">
              <el-button class="btn" @click="handleClick" type="primary" size="small">详情</el-button>
             <el-button class='btn1' type="primary" size="small">编辑</el-button> 
             </template>
          </el-table-column>
        </el-table>
        <div class="box2">
          <el-pagination :page-size="20" :pager-count="11" layout="prev, pager, next" :total="1000">
          </el-pagination>
        </div>
      </div> 
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search:"",
      keyword: '',
      //从接口获取展示数据存入其中
      Chinese: [],
      newDate: new Date(),
      timer: null,
      value: '',
      value1: '',
      input: ' ',
      tableData:
        [{
          id: "1",
          face: "王大虎",
          name: "化学",
          grade: "100",
          person: "张三",
          time: "90",
          update: "2016-05-04"
        }, {
          id: "2",
          face: "王小虎",
          name: "生物",
          grade: "100",
          person: "张三",
          time: "90",
          update: "2016-05-04"
        }, {
          id: "3",
          face: "王小虎",
          name: "生物",
          grade: "100",
          person: "张三",
          time: "90",
          update: "2016-05-04"
        }, {
          id: "4",
          face: "王小虎",
          name: "生物",
          grade: "100",
          person: "张三",
          time: "90",
          update: "2016-05-04"
        }, {
          id: "5",
          face: "王小虎",
          name: "生物",
          grade: "100",
          person: "张三",
          time: "90",
          update: "2016-05-04"
        },],
        search:'',
    };
  },
  create() {
  },
  methods: {
    // submit() {
    //   let text = this.search
    //   let reg = new RegExp(text) //声明正则变量
    //   this.data = this.tableData.filter(item => reg.test(item.id)) //返回
    // },

    dateFormat(time) {
      let date = new Date(time);
      let year = date.getFullYear();
      let wk = date.getDay()
      /* 在日期格式中，月份是从0开始的，因此要加0
      * 使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
      * */
      let month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
      let day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      let hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
      let minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
      let seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      let weeks = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
      let week = weeks[wk]
      // 拼接
      return year + "年" + month + "月" + day + "日" + " " + hours + ":" + minutes + ":" + seconds + ' ' + week;
    },
    // countdown: function () {
    // 		// 定义结束时间戳
    // 		const end = Date.parse(new Date('2022-10-20 10:10:10'))
    // 		// 定义当前时间戳
    // 		const now = Date.parse(new Date())
    // 		// 做判断当倒计时结束时都为0
    // 		if (now >= end) {
    // 			this.day = 0
    // 			this.hr = 0
    // 			this.min = 0
    // 			this.sec = 0
    // 			return
    // 		}
    // 		// 用结束时间减去当前时间获得倒计时时间戳
    // 		const msec = end - now
    // 		let day = parseInt(msec / 1000 / 60 / 60 / 24) //算出天数
    // 		let hr = parseInt(msec / 1000 / 60 / 60 % 24)//算出小时数
    // 		let min = parseInt(msec / 1000 / 60 % 60)//算出分钟数
    // 		let sec = parseInt(msec / 1000 % 60)//算出秒数
    // 		//给数据赋值
    // 		this.day = day
    // 		this.hr = hr > 9 ? hr : '0' + hr
    // 		this.min = min > 9 ? min : '0' + min
    // 		this.sec = sec > 9 ? sec : '0' + sec
    // 		//定义this指向
    // 		const that = this
    // 		// 使用定时器 然后使用递归 让每一次函数能调用自己达到倒计时效果
    // 		setTimeout(function () {
    // 			that.countdown()
    // 		}, 1000)
    // 	},
    handleClick() {
      this.$router.push("/myexamstudentdetails");
    },
    // yuwen() {
    //   this.$router.push("/yuwen");
    // },
    // shuxue() {
    //   this.$router.push("/shuxue");
    // },
    // yingyu() {
    //   this.$router.push("/yingyu");
    // }
  },
  components: {},
  mounted() {
    //显示当前日期时间
    // let _this = this// 声明一个变量指向Vue实例this，保证作用域一致
    // this.timer = setInterval(() => {
    //   _this.newDate = new Date(); // 修改数据date
    // }, 1000)
  }
  // mounted: function () {
  // 		this.countdown()
  // 	},
}
</script>
<style scoped>
* {
  margin: 0px;
  padding: 0px;
}

/* .box {
  display: flex;
  background-color: rgb(235, 234, 234);
  top: 0px;
  height: 975px;
 
} */

.box1 {

  text-align: center;
  margin-left: 45px;
  margin-top: 30px;
}

.box2 {
  position: fixed;
  bottom: 0px;
  right: 40px;
}

.btn {
  width: 70px;
  height: 30px;
  background-color: rgb(13, 168, 13);
  color: white;
  margin-left: -10px;
  text-align: center;
}

.el-dropdown-link {
  cursor: pointer;
  color: #409EFF;
}

.el-icon-arrow-down {
  font-size: 12px;
}
</style>