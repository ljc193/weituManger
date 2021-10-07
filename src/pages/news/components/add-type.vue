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
                <el-form-item label="新闻标题" prop="title" >
                    <el-input v-model="ruleForm.title" size = "small" placeholder = "请输入项目名"></el-input>
                </el-form-item>
                <el-form-item label="新闻背景" prop="cover">
                    <upload ref = "app_upload" @imgChange = "handleImgChange" />
                </el-form-item>
                <el-form-item label="内容中文" prop="contentCn">
                    <el-input
                        type="textarea"
                        :autosize="{ minRows: 2, maxRows: 6}"
                        placeholder="请输入内容"
                        v-model="ruleForm.contentCn">
                    </el-input>
                </el-form-item>
                <el-form-item label="内容英文" prop="contentEn">
                    <el-input
                        type="textarea"
                        :autosize="{ minRows: 2, maxRows: 6}"
                        placeholder="请输入内容"
                        v-model="ruleForm.contentEn">
                    </el-input>
                </el-form-item>
                <el-form-item label="是否发布" prop="issue">
                    <el-switch
                        v-model="ruleForm.issue"
                        active-color="#13ce66"
                        inactive-color="#ff4949">
                    </el-switch>
                </el-form-item>
                <el-form-item label="发布时间" prop="issueTime">
                    <el-date-picker
                        v-model="ruleForm.issueTime"
                        type="date"
                        value-format = "yyyy年MM月dd日"
                        size = "small"
                        placeholder="选择日期">
                    </el-date-picker>
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
                cover:"",
                contentCn:"",
                contentEn:"",
                issue:false,  // 是否发布
                issueTime:"", // 发布时间
                sort:"",
                id:""
            },
            loading: false,
            rules: {
                title: [
                    { required: true, message: '请输入新闻标题', trigger: 'blur' },
                ],
                cover: [
                    { required: true, message: '请上传新闻背景', trigger: 'blur' },
                ],
                contentCn: [
                    { required: true, message: '请输入中文新闻内容', trigger: 'blur' },
                ],
                contentEn: [
                    { required: true, message: '请输入英文新闻内容', trigger: 'blur' },
                ],
                imgAddress: [
                    { required: true, message: '请上传项目图片', trigger: 'blur' },
                ],
                
            }
        }
    },
    methods: {
        ...mapActions("news",["addItem"]),
        // 设置值
        setRow(row) {
            this.ruleForm = Object.assign(this.ruleForm,row);
            this.$refs.app_upload.backImgList = this.ruleForm.cover.split(",")
        },
        // 图片上传变化
        handleImgChange(list) {
            this.ruleForm.cover = list.toString();
        },
        // 保存请求
        submitForm(formName) { 
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let params = Object.assign({},{
                        ...this.ruleForm,
                        content: JSON.stringify({ contentCn: this.ruleForm.contentCn,contentEn: this.ruleForm.contentEn }),
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