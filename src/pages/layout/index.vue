<template>
    <div class = "app_layout">
        <div class='app_layout-menu'>
            <app-menu></app-menu>
        </div>
        <div class='app_layout-main'>
            <div class='app_layout-main-header'>
                <app-header></app-header>
            </div>
            <div class='app_layout-main-nav'>
                <app-nav></app-nav>
            </div>
            <div class='app__layout-main-content'>
                <router-view/>
            </div>
        </div>
    </div>
</template>
<script>
import appMenu from "@/components/layout/menu/menu.vue"
import appHeader from "@/components/layout/header"
import appNav from "@/components/layout/navbar"
export default {
    components: {
        appMenu,
        appHeader,
        appNav
    },
    data() {
        return {

        }
    }
}
</script>
<style lang="less" scoped>
    .app_layout {
        &-main {
            margin-left: 200px;
            min-height: 100%;
        }
        &-menu {
            position: fixed;
            left: 0;
            top: 0;
            height: 100%;
            z-index: 1001;
            width: 200px;
        }
    }
</style>