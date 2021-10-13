import request from  "@/assets/utils/request"
const baseUrl = "/admin/sys/"
const actions = { 
    // 删除招聘信息 type、0 删除 ，1 上架 2下架
    updateItemCategory({},data) {
        return request({
            url: `${ baseUrl }updateItemCategory`,
            method:"post",
            data: data
        })
    },
    // 查询招聘信息
    findRecruitInfo({},data) {
        return request({
            url: `${ baseUrl }findRecruitInfo`,
            method:"post",
            data: data
        })
    },
    // 保存招聘信息
    saveRecruitInfo({},data) {
        return request({
            url: `${ baseUrl }saveRecruitInfo`,
            method:"post",
            data: data
        })
    },
    // 获取联系我们
    getList({},data) {
        return request({
            url: `${ baseUrl }findContactUs`,
            method:"post",
            data: data
        })
    },
    // 添加联系我们
    addItem({},data) {
        return request({
            url: `${ baseUrl }saveContactUs`,
            method:"post",
            data: data
        })
    },
    
};
export default actions;