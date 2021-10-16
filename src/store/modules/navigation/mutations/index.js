/*
 * @Description: 
 * @Version: 1.0
 * @Autor: jinchuan.lee
 * @Date: 2021-10-08 14:21:09
 * @LastEditors: jinchuan.lee
 * @LastEditTime: 2021-10-15 15:49:49
 */
const mutations = {
    GET_TABLIST(state,val){
        console.log(val)
        if (val.name === 'home') {
           state.currentTab = null
       } else {
           state.currentTab = val
           let result = state.tabs.findIndex(item => item.name === val.name)
           result === -1 ? state.tabs.push(val) : ''

       }
    },
    //关闭标签
    CLOSE_TAB(state, val) {
        console.log(val)
       let result = state.tabs.findIndex(item => item.name === val)
       state.tabs.splice(result, 1)
    },
}
export default mutations;