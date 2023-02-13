<template>
  <div class="cardfather">
    <div id="card">
      <el-row>
        <el-col
          :span="4"
          v-for="item in items"
          :key="item.id"
          :offset="1"
          class="card"
        >
          <el-card
            :body-style="{ padding: '0px' }"
            shadow="hover"
            @click.native="turnToDetails"
          >
            <!-- 使用el-card时，会导致点击事件失效，用 @click.native=""可解决问题。 -->
            <img v-bind:src="item.src" class="image" />
            <div style="padding: 14px">
              <span>{{ item.examname }}</span>
              <div class="bottom clearfix">
                <time class="time">{{ item.openingtime }}</time>
                <!-- <el-button type="text" class="button">详情</el-button> -->
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [],
    };
  },
  methods: {
    turnToDetails() {
      this.$router.push("/examdetail");
    },
  },
  mounted() {
    this.$api
      .examCard({})
      .then((res) => {
        this.items = res.data.arguments[2];
      })
      .then(() => {
        this.items.forEach((item) => {
          if (item.examname == "语文") {
            // 使用v-for循环遍历绑定图片（:src="xxx.imgUrl"），图片不显示
            // 原因：
            // src直接写成静态的，会经过webpack进行编译，从而得到打包后正确的图片真实路径，然而，src写成动态的，webpack就不会进行编译，原封不动的把所绑定的地址放到img的src属性中
            // element.src = "../../assets/img/language.png";
            // 解决方法  使用require() + 相对路径来引用图片
            item.src = require("../../assets/img/language.png");
          } else if (item.examname == "数学") {
            item.src = require("../../assets/img/math.jpg");
          } else if (item.examname == "英语") {
            item.src = require("../../assets/img/english.jpg");
          }
        });
      });
  },
};
</script>

<style>
.cardfather {
  overflow: hidden;
}
#card {
  margin-top: 30px;
  margin-left: 20px;
  border: 1px solid #ebeef5;
  background-color: white;
}
.card {
  margin-top: 20px;
}
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  height: 20vh;
  display: block;
  /* 
  object-fit: cover;
  要设置height
  图片自动平铺填充
   */
  object-fit: cover;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
</style>