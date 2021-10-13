<template>
    <el-dialog
        title="编辑招聘信息"
        :visible.sync="isShow"
        class = "app-dialog"
        :close-on-press-escape = "false"
        :close-on-click-modal = "false"
        @close = "resetForm('ruleForm')"
        width="500px"
    >
        <div class = "addType_wrapper" v-loading = "loading" element-loading-text="请稍后...">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" label-position = "left">
                <el-form-item label="职位" prop="position" >
                    <el-input v-model="ruleForm.position" size = "small" placeholder = "请输入职位"></el-input>
                </el-form-item>
                <el-form-item label="职位需求" prop="requirement" >
                    <el-input
                        type="textarea"
                        :autosize="{ minRows: 4, maxRows: 100}"
                        placeholder="请输入职位需求，多条需求用中文分号隔开"
                        show-word-limit
                        v-model="ruleForm.requirement">
                    </el-input>
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
        row: {
            type: Object,
            default: ()=>{ return {} }
        },
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
                position:"",
                positionDescribe:"无",
                requirement:"",
                releaseTime:"2021-10-10",
                sort:1,
                id:""
            },
            loading: false,
            rules: {
                position: [
                    { required: true, message: '请输入职位', trigger: 'blur' },
                ],
                requirement: [
                    { required: true, message: '请输入职位需求', trigger: 'blur' },
                ],
            }
        }
    },
    methods: {
        ...mapActions("contcat",["saveRecruitInfo"]),
        // 设置值
        setRow(row) {
            this.ruleForm = Object.assign(this.ruleForm,row);
            this.ruleForm.releaseTime = new Date(this.ruleForm.releaseTime).toLocaleString();
        },
        // 保存请求
        submitForm(formName) { 
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let params = Object.assign({},{
                        ...this.ruleForm
                    })
                    this.loading = true;
                    this.saveRecruitInfo(params)
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
                for(var i in this.ruleForm) {
                    this.ruleForm[i] = "";
                }
                this.ruleForm.positionDescribe = "无";
                this.ruleForm.releaseTime = "2021-10-10";
                delete this.ruleForm.state
            })
        }
    }
}
</script>