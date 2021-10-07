<template>
    <el-dialog
        title="编辑首页"
        :visible.sync="isShow"
        class = "app-dialog"
        :close-on-press-escape = "false"
        :close-on-click-modal = "false"
        @close = "resetForm('ruleForm')"
        width="500px"
    >
        <div class = "addType_wrapper" v-loading = "loading" element-loading-text="请稍后...">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" label-position = "left">
                <el-form-item label="人物名称" prop="name" >
                    <el-input v-model="ruleForm.name" size = "small" placeholder = "请输入人物名称"></el-input>
                </el-form-item>
                <el-form-item label="人物头像" prop="imgAddress">
                    <upload ref = "app_upload" @imgChange = "handleImgChange" />
                </el-form-item>
                <el-form-item label="人物职位" prop="position">
                    <el-input v-model="ruleForm.position" size = "small" placeholder = "请输入人物职位"></el-input>
                </el-form-item>
                <el-form-item label="人物描述" prop="characterDescription">
                    <el-input
                        type="textarea"
                        :autosize="{ minRows: 2, maxRows: 6}"
                        placeholder="请输入内容"
                        v-model="ruleForm.characterDescription">
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
import upload from "@/components/upload"
export default {
    props: {
        dialogVisible: Boolean,
        row: {
            type: Object,
            default: ()=>{ return {} }
        },
    },
    components: {
        upload
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
                name:"",
                imgAddress:"",
                position:"",
                characterDescription:"",  // 任务描述
                sort:"",
                id:""
            },
            loading: false,
            rules: {
                name: [
                    { required: true, message: '请输入人物名称', trigger: 'blur' },
                ],
                imgAddress: [
                    { required: true, message: '请上传人物头像', trigger: 'blur' },
                ],
                position: [
                    { required: true, message: '请输入人物职位', trigger: 'blur' },
                ],
                characterDescription: [
                    { required: true, message: '请输入人物描述', trigger: 'blur' },
                ],
                
            }
        }
    },
    methods: {
        ...mapActions("team",["addItem"]),
        // 设置值
        setRow(row) {
            this.ruleForm = Object.assign(this.ruleForm,row);
            this.$refs.app_upload.backImgList = this.ruleForm.imgAddress.split(",")
        },
        // 图片上传变化
        handleImgChange(list) {
            this.ruleForm.imgAddress = list.toString();
        },
        // 保存请求
        submitForm(formName) { 
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let params = Object.assign({},{
                        ...this.ruleForm,
                    })
                    this.loading = true;
                    this.addItem(params)
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
                this.$refs.app_upload.backImgList = []
            })
        }
    }
}
</script>