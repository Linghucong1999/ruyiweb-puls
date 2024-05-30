import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/index';
import httpServer from './service/httpServer'; //axios拦截器
import * as mUtils from "@/common/js/mUtils";
import config from "@/config";
import filter from './filters/index';
import lottie from 'vue-lottie';

import * as API from "@/api/index";
import Element from "element-ui";
import "@/common/style/element-variables.less";
import "@/common/style/index.less";
import "@/common/style/element-ui.less";
import "animate.css";
import VueClipboard from 'vue-clipboard2';

Vue.use(VueClipboard);
Vue.use(Element);
Vue.component("lottie", lottie);

/**
 * 引入公共方法
 */
Vue.prototype.$mUtils = mUtils;
Vue.prototype.$axios = httpServer;
Vue.prototype.$api = API;

//全局注册过滤器
Object.keys(filter).forEach(key => {
  Vue.filter(key, filter[key]);
});

//登录成功后跳转方法,在用户登录后能够回到登录前访问的页面
Vue.prototype.goBeforeLogin = function () {
  let url = mUtils.Cookie.get("beforeLoginUrl");
  url = decodeURIComponent(url);
  if (!url || url.indexOf('/author') !== -1) {
    router.push('/');
  } else {
    router.push(url);
    mUtils.Cookie.set('beforeLoginUrl', '', 1 / 24 / 60, window.location.host, window.location.pathname.substring(0, window.location.pathname.length - 1));
  }
};

//公共配置

Vue.prototype.$config = config;

// String.prototype.replaceAll = function (s1, s2) {
//   return this.replace(new RegExp(s1, "gm"), s2);
// }
import "@/permission"; //权控

Vue.config.productionTip = false;

store.commit("getUserFromLocal");

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
