import request from  "@/assets/utils/request"
const baseUrl = "/admin/sys/"
const actions = { 
    // 获取项目详情
    getDetail({},data) {
        return request({
            url: `${ baseUrl }findProject`,
            method:"post",
            data: data
        })
    },
    // 编辑项目详情
    editDetial({},data) {
        return request({
            url: `${ baseUrl }saveProject`,
            method:"post",
            data: data
        })
    },
    // 删除项目
    deleteItem({},data) {
        return request({
            url: `${ baseUrl }deleteIntroduction`,
            method:"post",
            data: data
        })
    },
    // 获取项目
    getItem({},data) {             
        return request({ 
            url: `${ baseUrl }findIntroduction`,  
            method:"post",
            data: data
        })
    },
    // 添加 && 修改项目
    addItem({},data) { 
        return request({
            url: `${ baseUrl }saveProjectIntroduction`,
            method:"post",
            data: data
        })
    },
    // 添加 && 修改类别
    addType({},data) {
        return request({
            url: `${ baseUrl }saveItemCategory`,
            method:"post",
            data: data
        })
    },
    // 获取类别
    getType({},data) {
        return request({ 
            url: `${ baseUrl }findItemCategory`,  
            method:"post",
            data: data
        })
    },
    // 删除类别
    deleteType({},data) {
        return request({
            url: `${ baseUrl }deleteItemCategory`,
            method:"post",
            data: data
        })
    },
};
export default actions;