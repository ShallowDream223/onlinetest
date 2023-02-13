<template>
  <div class="menu-container">
    <template v-for="v in menuList" :index="v.path">
      <!-- <el-submenu :index="v.name" v-if="v.children&&v.children.length>0" :key="v.name">
                <template slot="title">
                    <i class="iconfont" :class="v.meta.icon"></i>
                    <span>{{v.meta.title}}</span>
                </template>
                <el-menu-item-group>
                    <my-nav :menuList="v.children"></my-nav>
                </el-menu-item-group>
            </el-submenu> -->
      <!-- @click="gotoRoute(v.name)"  改成了element ui  <el-menu>里的router设置，在menu-item中要绑定对应的router :route="{ path: v.path, query: { name: v.name } }  -->
      <el-menu-item
        :key="v.name"
        :index="v.name"
        v-if="
          v.name !== 'examstudentlist' &&
          v.name !== 'gradedetails' &&
          v.name !== 'myexamstudentdetails' &&
          v.name != 'examdetail'
        "
        :route="{ path: v.path, query: { name: v.name } }"
      >
        <i class="iconfont" :class="v.meta.icon"></i>
        <span slot="title">{{ v.meta.title }}</span>
      </el-menu-item>
    </template>
  </div>
</template>
<script>
export default {
  name: "my-nav",
  props: {
    menuList: {
      type: Array,
      default: function () {
        return [];
      },
    },
  },
  methods: {
    gotoRoute(name) {
      this.$router.push({ name }); // push(path)  push({name:''})
    },
  },
};
</script>