<template>
    <el-dialog
        title="新增项目类型"
        :visible.sync="isShow"
        class = "app-dialog"
        :close-on-press-escape = "false"
        :close-on-click-modal = "false"
        @open = "resetForm('ruleForm')"
        width="500px"
    >
        <div class = "addType_wrapper" v-loading = "loading" element-loading-text="请稍后...">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" label-position = "left">
                <el-form-item label="中文名称" prop="name">
                    <el-input v-model="ruleForm.name" size = "small" placeholder = "请输入中文名称"></el-input>
                </el-form-item>
                <el-form-item label="英文名称" prop="englishName">
                    <el-input v-model="ruleForm.englishName" size = "small" placeholder = "请输入英文名称"></el-input>
                </el-form-item>
                <el-form-item label="排序" prop="sort">
                    <el-input-number v-model="ruleForm.sort" size = "small" placeholder = "请输入排序" :min="1"></el-input-number>
                </el-form-item>
            </el-form>
            <div class = "center mt30">
                <el-button size = "mini" type = "warning" @click = "isShow = false">取消</el-button>
                <el-button size = "mini" type = "primary" @click = "submitForm('ruleForm')">提交</el-button>
            </div>
        </div>
    </el-dialog>
</template>
<script>
import { mapActions } from "vuex" 
export default {
    props: {
        dialogVisible: Boolean,
        isEdit: Boolean,
    },
    computed: {
        isShow: {
            get() {
                return this.dialogVisible
            },
            set(val) {
                this.$emit('update:dialogVisible',val)
            }
        }  
    },
    data() {
        return {
            ruleForm: {
                name: '',
                englishName: '',
                sort:"",
                id:""
            },
            loading: false,
            rules: {
                name: [
                    { required: true, message: '请输入中文名称', trigger: 'blur' },
                ],
                englishName: [
                    { required: true, message: '请输入英文名称', trigger: 'blur' },
                ],
            }
        }
    },
    methods: {
        ...mapActions("project",["addType"]),
        // 设置值
        setRow(row) {
            this.ruleForm = Object.assign(this.ruleForm,{...row})
        },
        // 保存请求
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.loading = true;
                    this.addType(this.ruleForm)
                    .then(
                        res=>{
                            this.loading = false;
                            if(res.code == 1) {
                                this.$message.success("保存成功！");
                                this.isShow = false;
                                this.$emit("refresh")
                            }
                        }
                    )
                } else {
                    return false;
                }
            });
        },
        resetForm(formName) {
            if(this.isEdit) return;
            this.$nextTick(()=>{
                this.$refs[formName].resetFields();
            })
        }
    }
}
</script>