<template>
  <div id="content">
    <router-view class="content"></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
#content {
  background-color: aliceblue;
  height: 100vh;
  height: calc(100vh - 50px);
  //子元素设置margin-top，但父元素也继承了这个margin-top,怎么解决
  // 这是因为默认情况下，父元素会继承它的子元素的 margin 值。要解决这个问题，可以使用 CSS 中的 overflow 属性，将其设置为 "hidden"。
  // overflow: hidden;
  //但是这个是公共组件，设置了overflow: hidden会导致问题管理页面滑块消失
}
</style>
