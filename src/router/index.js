/*
 * @Description: 
 * @Version: 1.0
 * @Autor: jinchuan.lee
 * @Date: 2021-10-08 14:21:09
 * @LastEditors: jinchuan.lee
 * @LastEditTime: 2021-10-15 16:02:24
 */
import Vue from 'vue'
import Router from 'vue-router'
import menuList from '@/assets/utils/menuList'
import layout from "@/pages/layout/layout"
import store from '../store/index.js'
Vue.use(Router)

let routeList = [];
const components = require.context('@/pages', true, /\.vue$/);
let datas = []
if (menuList && menuList.length) {
  menuList.forEach(item => {
    if (item.children.length == 0) {
      if (datas.indexOf(item) == -1) {
        datas.push({
          name: item.path.substring(1),
          path: item.path,
          title: item.title
        });
      }
    } else {
      item.children.forEach(i => {
        if (datas.indexOf(i) == -1) {
          datas.push({
            name: i.path.substring(1),
            path: i.path,
            title: i.title
          });
        }
      })
    }
  })
};
components.keys().forEach(n => {
  let fileName = n.slice(n.lastIndexOf('/')).replace(/\.vue$/, "");
  let view = "pages" + n.slice(1);
  datas.forEach((item, index) => {
    if (item.path == fileName) {
      routeList.push({
        name: item.name,
        meta:{
          title: item.title
        },
        path: item.path,
        component: resolve => require(['@/' + view], resolve),
      })
    }
  })
});

const router = new Router({
  mode:"history",
  routes: [
    {
      path:"",
      component: layout,
      children: routeList
    },
    {
			path: '/login',
      name:"login",
			component: resolve => require(['@/pages/login/login'], resolve)
		},

  ]
})
router.beforeEach((to,from,next)=>{
  let _this = new Vue();
	if(to.path != '/login'){
		if(_this.$getByKey('token')){
			if (to.matched.length ===0) {  //如果未匹配到路由
				from.name ? next() : next('/error');   //如果上级也未匹配到路由则跳转登录页面，如果上级能匹配到则转上级路由
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
