import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import "./plugins/element.js";
import "./router/permission";
import "./assets/css/index.scss";
import fullscreen from "vue-fullscreen";
import api from "./api/api.js";
Vue.use(fullscreen);
// 将api挂载到vue的原型上
Vue.prototype.$api = api;
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
