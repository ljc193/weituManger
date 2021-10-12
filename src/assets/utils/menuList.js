let menuList = [
	{
        "path": "/home",
		"title": "首页",
		"url": 'home/index',
		"children": []
    },
    // {
    //     "path": "/baseMsg_wrapper",
	// 	"title": "基础信息",
	// 	"children": [
	// 	    {
	// 			"path": "/baseMsg",
	// 			"title": "导航显示",
	// 			"url": 'baseMsg/index'
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
				"url": 'project/projectType/index'
		    },{
				"path": "/projectItem",
				"title": "上传项目",
				"url": 'project/projectItem/index'
		    }
		]
    },
	{
		"path": "/news",
		"title": "新闻管理",
		"url": 'news/index',
		"children": []
    },
	{
		"path": "/team",
		"title": "团队管理",
		"url": 'team/index',
		"children": []
    },
	{
        "path": "/contact",
		"title": "联系我们",
		"children": [
		    {
				"path": "/contactBaseInfo",
				"title": "页面设置",
				"url": 'contact/contactBaseInfo/index'
		    },{
				"path": "/positionManagement",
				"title": "职位管理",
				"url": 'contact/position/index'
		    }
		]
    },
	{
		"path": "/about",
		"title": "关于我们",
		"url": 'about/index',
		"children": []
    },
	
]
export default menuList;