/*
 * @Description: 
 * @Version: 1.0
 * @Autor: jinchuan.lee
 * @Date: 2021-10-08 14:21:09
 * @LastEditors: jinchuan.lee
 * @LastEditTime: 2021-10-15 15:40:34
 */
let menuList = [
	{
        "path": "/home",
		"title": "首页",
		"children": []
    },
    // {
    //     "path": "/baseMsg_wrapper",
	// 	"title": "基础信息",
	// 	"children": [
	// 	    {
	// 			"path": "/baseMsg",
	// 			"title": "导航显示",
	// 	    },
	// 	]
    // },
	{
        "path": "/project",
		"title": "项目配置",
		"children": [
		    {
				"path": "/projectType",
				"title": "类别设置",
		    },{
				"path": "/projectItem",
				"title": "上传项目",
		    }
		]
    },
	{
		"path": "/news",
		"title": "新闻管理",
		"children": []
    },
	{
		"path": "/team",
		"title": "团队管理",
		"children": []
    },
	{
        "path": "/contact",
		"title": "联系我们",
		"children": [
		    {
				"path": "/contactBaseInfo",
				"title": "页面设置",
		    },{
				"path": "/position",
				"title": "职位管理",
		    }
		]
    },
	{
		"path": "/about",
		"title": "关于我们",
		"children": []
    },
	
]
export default menuList;