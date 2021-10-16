<!--
 * @Description: 
 * @Version: 1.0
 * @Autor: jinchuan.lee
 * @Date: 2021-10-08 14:21:09
 * @LastEditors: jinchuan.lee
 * @LastEditTime: 2021-10-15 16:05:05
-->
<template>
    <div class = "app-nav">
        <el-tabs 
            v-model="editableTabsValue" 
            type="card"  
            @tab-remove="removeTab" 
            @tab-click='handleClick'
        >
            <el-tab-pane
                v-for="item in tabs"
                :key="item.name"
                :label="item.meta.title"
                :name="item.name"
                :closable="item.name !== 'home'"
            >
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
import { mapState,mapMutations } from "vuex"
export default {
    data() {
        return {
            editableTabsValue: this.$route.name,
        }
    },
    computed: {
        ...mapState("navigation",['tabs'])
    },
    watch:{
        $route:{
            handler(val) {
                this.editableTabsValue = val.name;
            }
        }
    },
    methods: {
        handleClick(val) {
          if (val.name === this.$route.name) {
            return
          }
           this.editableTabsValue = val.name;
           this.$router.push('./'+val.name)
        },
        removeTab(targetName) {
          let length = this.tabs.length - 1,index=0;

          // 如果关闭的标签不是当前路由的话，就不跳转
          if (targetName !== this.$route.name) {
             this.$store.commit('navigation/CLOSE_TAB',targetName)
            return
          }
          this.tabs.forEach((item,inx)=>{
            if(item.name === targetName) {
              index = inx;
            }
          })
          this.$store.commit('navigation/CLOSE_TAB',targetName)
          // 关闭的标签是最右边的话，往左边跳转一个
          if (index === length) {
            this.$router.push('.' + this.tabs[index - 1].name)
          } else {
            // 否则往右边跳转
            this.$router.push('.' + this.tabs[index].name)
          }
        }
    }
}
</script>
<style lang= "less" scoped>
    .app-nav {
      padding: 3px 10px;
      box-shadow: 0 1px 3px 0 rgb(0 0 0 / 12%), 0 0 3px 0 rgb(0 0 0 / 4%);
      /deep/.el-tabs {
         .el-tabs__header {
           border: none;
           margin: 0;
         }
         .el-tabs__item {
           height: 26px;
           line-height: 26px;
           padding: 0 10px !important;
           border: 1px solid #eee;
           margin-right: 10px;
         }
         .el-tabs__nav {
           border: none;
         }
       }
    }
</style>