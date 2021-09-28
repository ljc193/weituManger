const mutations = {
    GET_TABLIST(state,val){
        if (val.meta.title === 'home') {
           state.currentTab = null
       } else {
           state.currentTab = val
           let result = state.tabs.findIndex(item => item.name === val.name)
           result === -1 ? state.tabs.push(val) : ''

       }
    },
    //关闭标签
    CLOSE_TAB(state, val) {
       let result = state.tabs.findIndex(item => item.name === val)
       state.tabs.splice(result, 1)
    },
}
export default mutations;