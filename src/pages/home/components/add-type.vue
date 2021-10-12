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
                <el-form-item label="项目名称" prop="title" >
                    <el-input v-model="ruleForm.title" size = "small" placeholder = "请输入项目名"></el-input>
                </el-form-item>
                <el-form-item label="项目地点" prop="address">
                    <el-input v-model="ruleForm.address" size = "small" placeholder = "请输入项目地点"></el-input>
                </el-form-item>
                <el-form-item label="项目时间" prop="date">
                    <el-input v-model="ruleForm.date" size = "small" placeholder = "请输入项目时间"></el-input>
                </el-form-item>
                <el-form-item label="项目图片" prop="imgAddress">
                    <upload ref = "app_upload" @imgChange = "handleImgChange" />
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
                title:"",
                address:"",
                date:"",
                imgAddress:"",
                sort:"",
                id:""
            },
            loading: false,
            rules: {
                title: [
                    { required: true, message: '请输入项目名称', trigger: 'blur' },
                ],
                address: [
                    { required: true, message: '请输入项目地址', trigger: 'blur' },
                ],
                area: [
                    { required: true, message: '请输入中文面积', trigger: 'blur' },
                ],
                date: [
                    { required: true, message: '请输入项目时间', trigger: 'blur' },
                ],
                imgAddress: [
                    { required: true, message: '请上传项目图片', trigger: 'blur' },
                ],
                
            }
        }
    },
    methods: {
        ...mapActions("home",["addItem"]),
        // 设置值
        setRow(row) {
            this.ruleForm = Object.assign(this.ruleForm,row);
            this.$refs.app_upload.backImgList = this.ruleForm.imgAddress.split(",")
        },
        // 图片上传变化
        handleImgChange(list) {
            console.log(list)
            this.ruleForm.imgAddress = list.toString();
        },
        // 保存请求
        submitForm(formName) { 
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let params = Object.assign({},{
                        ...this.ruleForm,
                        hdescribe: JSON.stringify({ address: this.ruleForm.address,date: this.ruleForm.date }),
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
                this.$refs.app_upload.backImgList = [];
                for(var i in this.ruleForm) {
                    this.ruleForm[i] = "";
                }
            })
        }
    }
}
</script>