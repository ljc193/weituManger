<template>
    <div class = "operation-header">
            <div class = "operation-header-left">
                <el-input 
                    placeholder = "请输入搜索内容" 
                    v-model="form.keyword" 
                    size = "mini"
                    style="width:280px"
                    clearable
                    @keyup.enter.native="handleQuery"
                >
                </el-input>
                <el-button 
                    type="primary" 
                    icon="el-icon-search" 
                    size="mini" 
                    @click="handleQuery"
                    class = "ml15"
                >
                    搜索
                </el-button>
                <el-button 
                    icon="el-icon-refresh" 
                    size="mini" 
                    @click="resetQuery"
                >
                重置
                </el-button>
            </div>
            <div class = "operation-header-right">
                <el-button
                    type="primary"
                    icon="el-icon-plus"
                    size="mini"
                    @click="handleAdd"
                >新增</el-button>
                <el-button
                    type="danger"
                    icon="el-icon-delete"
                    size="mini"
                    :disabled="multiple"
                    @click="handleDelete"
                >批量删除</el-button>
            </div>
        </div>
</template> 
<script>
export default {
    data() {
        return {
            form: {
                keyword:""
            },
            single: false,
            multiple:false
        }
    },
    methods: {
        handleDelete() {
            this.$emit("operation","3")
        },
        handleAdd() {
            this.$emit("operation","1")
        },
        resetQuery() {
            this.form.keyword = "";
            this.$emit("search","")
        },
        handleQuery() {
            this.$emit("search",this.form.keyword)
        }
    }
}
</script>
<style lang="less" scoped>
.operation-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    &-left,&-right {
        max-width: 50%;
        display: flex;
        align-items: center;
    }
}
</style>