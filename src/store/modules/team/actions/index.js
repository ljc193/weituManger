import request from  "@/assets/utils/request"
const baseUrl = "/admin/sys/"
const actions = { 
    // 删除新闻列表
    deleteRow({},data) {
        return request({
            url: `${ baseUrl }deleteTeamIntroduct`,
            method:"post",
            data: data 
        })
    },
    // 获取新闻列表
    getList({},data) { 
        return request({
            url: `${ baseUrl }findTeamIntroduct`,
            method:"post",
            data: data
        })
    },
    // 添加新闻列表
    addItem({},data) {
        return request({
            url: `${ baseUrl }saveTeamIntroduct`,
            method:"post",
            data: data
        })
    },
    
};
export default actions;