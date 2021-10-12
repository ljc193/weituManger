import Vue from 'vue'
import App from './App'
import router from './router'
import "@/assets/style/index.less"
import 'element-ui/lib/theme-chalk/index.css'
import ElementUI from 'element-ui'
import { getByKey,setByKey } from "@/assets/utils/function.js"
import request from "@/assets/utils/request.js"
import store from "@/store";
import { uploadUrl } from "@/assets/utils/config"

Vue.config.productionTip = false
Vue.use(ElementUI);


Vue.prototype.$setByKey = Vue.$setByKey = setByKey;
Vue.prototype.$getByKey = Vue.$getByKey = getByKey;
Vue.prototype.$uploadUrl = Vue.$uploadUrl = uploadUrl;
Vue.prototype.$req = Vue.$req = request;  // window挂载请求
new Vue({
  el: '#app',
  router,
  components: { App },
  store,
  template: '<App/>'
})


Date.prototype.format = function(fmt) { 
  var o = { 
     "M+" : this.getMonth()+1,                 //月份 
     "d+" : this.getDate(),                    //日 
     "h+" : this.getHours(),                   //小时 
     "m+" : this.getMinutes(),                 //分 
     "s+" : this.getSeconds(),                 //秒 
     "q+" : Math.floor((this.getMonth()+3)/3), //季度 
     "S"  : this.getMilliseconds()             //毫秒 
 }; 
 if(/(y+)/.test(fmt)) {
         fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
 }
  for(var k in o) {
     if(new RegExp("("+ k +")").test(fmt)){
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
      }
  }
 return fmt; 
} 