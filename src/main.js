import Vue from 'vue'
import App from './App'
import router from './router'
import "@/assets/style/index.less"
import 'element-ui/lib/theme-chalk/index.css'
import ElementUI from 'element-ui'
import { getByKey,setByKey } from "@/assets/utils/function"
import request from "@/assets/utils/request"
import store from "@/store";

Vue.config.productionTip = false
Vue.use(ElementUI);


Vue.prototype.$setByKey = Vue.$setByKey = setByKey;
Vue.prototype.$getByKey = Vue.$getByKey = getByKey;
Vue.prototype.$req = Vue.$req = request;  // window挂载请求
new Vue({
  el: '#app',
  router,
  components: { App },
  store,
  template: '<App/>'
})
