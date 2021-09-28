import request from  "@/assets/utils/request"
const actions = {
    login({},data) {
        return request({
            url: 'admin/login',
            method:"post",
            data: data
        })
    }
};
export default actions;