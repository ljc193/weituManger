import Vue from 'vue'
import Router from 'vue-router'
import menuList from '@/assets/utils/menuList'
import layout from "@/pages/layout"
import store from '../store/index.js'
const _import = require("./_import_" + process.env.NODE_ENV);
Vue.use(Router)

let routeList = [];
for(var i=0;i<menuList.length;i++) {
  addRouter(menuList[i])
}
function addRouter(data){
  if(data && data.children && data.children.length){
    for (var i=0;i<data.children.length;i++) {
      addRouter(data.children[i]);
    }
  }else{
    //赋值
    routeList.push({
      path: data.path.substring(1),
      name: data.path.replace(data.path[0],data.path[0].toUpperCase()),
      component: _import(data.url),
      meta: {
        title: data.path.substring(1),
        label: data.title
      }
    });
  }
}
const router = new Router({
  mode:"history",
  routes: [
    {
      path:"",
      component: layout,
      children: routeList
    },
    {
      path:"/login",
      name:"Login",
      component: _import("login/login")
    }

  ]
})
router.beforeEach((to,from,next)=>{
  let _this = new Vue();
	if(to.path != '/login'){
		if(_this.$getByKey('token')){
			if (to.matched.length ===0) {  //如果未匹配到路由
				form.name ? next() : next('/error');   //如果上级也未匹配到路由则跳转登录页面，如果上级能匹配到则转上级路由
			} else {
        store.commit("navigation/GET_TABLIST",to)
				next();    //如果匹配到正确跳转
			}
		}else{
			next('/login');
		}


	}else{
		next();
	}
})
export default router;
