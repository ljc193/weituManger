let menuList = [
	{
        "path": "/home",
		"title": "首页",
		"url": 'home/index',
		"children": []
    },
    {
        "path": "/baseMsg_wrapper",
		"title": "网站基础信息",
		"children": [
		    {
				"path": "/baseMsg",
				"title": "导航显示",
				"url": 'baseMsg/index'
		    },
		]
    },
	
]
export default menuList;