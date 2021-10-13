import request from  "@/assets/utils/request"
const actions = {
    editPsd({},data) {
        return request({
            url: 'admin/updatePwd',
            method:"post",
            data: data
        })
    },
    login({},data) {
        return request({
            url: 'admin/login',
            method:"post",
            data: data
        })
    }
};
export default actions;