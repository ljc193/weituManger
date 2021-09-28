<template>
    <div class = "app-menu">
        <el-menu 
            router 
            mode="vertical" 
            background-color="#304156" 
            text-color="#bfcbd9" 
            default-active="/func1" 
            active-text-color="#409EFF"
            :collapse="isCollapse"
        >
            <sidebar-item v-for="menu in menuList" :key="menu.path" :item="menu" />
        </el-menu>
    </div>
</template>
<script>
import menuList from "@/assets/utils/menuList.js"
import SidebarItem from './menuSidebarItem'
export default {
    components: {
        SidebarItem
    },
    data() {
        return {
            isCollapse: false,
            menuList,
        }
    },
    methods: {
     
    }
}
</script>
<style lang="less" scoped>
    .app-menu {
        width: 100%;
        height: 100%;
        /deep/.el-menu {
            width: 100%;
            height: 100%;
        }
    }
    
</style>