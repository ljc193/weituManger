import request from  "@/assets/utils/request"
const baseUrl = "/admin/sys/"
const actions = { 
    // 获取首页列表
    deleteRow({},data) {
        return request({
            url: `${ baseUrl }deleteHomePage`,
            method:"post",
            data: data
        })
    },
    // 获取首页列表
    getList({},data) {
        return request({
            url: `${ baseUrl }findHomePage`,
            method:"post",
            data: data
        })
    },
    // 添加首页列表
    addItem({},data) {
        return request({
            url: `${ baseUrl }saveHomePage`,
            method:"post",
            data: data
        })
    },
    
};
export default actions;