/*
 * @Description: 
 * @Version: 1.0
 * @Autor: jinchuan.lee
 * @Date: 2021-10-08 14:21:09
 * @LastEditors: jinchuan.lee
 * @LastEditTime: 2021-10-08 14:51:35
 */
import request from  "@/assets/utils/request"
const baseUrl = "/admin/"
const actions = { 
    // 删除新闻列表
    deleteRow({},data) {
        return request({
            url: `${ baseUrl }news/delete`,
            method:"post",
            data: data 
        })
    },
    // 获取新闻列表
    getList({},data) {
        return request({
            url: `${ baseUrl }news/find`,
            method:"post",
            data: data
        })
    }, 
    // 添加新闻列表
    addItem({},data) {
        return request({
            url: `${ baseUrl }news/save`,
            method:"post",
            data: data
        })
    },
    
};
export default actions;