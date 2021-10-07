<template>
    <el-dialog
        title="编辑项目详情"
        :visible.sync="isShow"
        class = "app-dialog"
        :close-on-press-escape = "false"
        :close-on-click-modal = "false"
        @close = "resetForm('ruleForm')"
        width="500px"
    >
        <div class = "addType_wrapper" v-loading = "loading" element-loading-text="请稍后...">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" label-position = "left">
                <el-form-item label="名称CN" prop="title" >
                    <el-input v-model="ruleForm.title" size = "small" placeholder = "请输入中文名称" disabled></el-input>
                </el-form-item>
                <el-form-item label="名称EN" prop="titles">
                    <el-input v-model="ruleForm.titles" size = "small" placeholder = "请输入英文名称"></el-input>
                </el-form-item>
                <el-form-item label="面积CN" prop="area">
                    <el-input v-model="ruleForm.area" size = "small" placeholder = "请输入中文面积"></el-input>
                </el-form-item>
                <el-form-item label="面积EN" prop="areas">
                    <el-input v-model="ruleForm.areas" size = "small" placeholder = "请输入英文面积"></el-input>
                </el-form-item>
                <el-form-item label="地址CN" prop="address">
                    <el-input v-model="ruleForm.address" size = "small" placeholder = "请输入中文地址"></el-input>
                </el-form-item>
                <el-form-item label="地址EN" prop="addresss">
                    <el-input v-model="ruleForm.addresss" size = "small" placeholder = "请输入英文地址"></el-input>
                </el-form-item>
                <el-form-item label="时间CN" prop="date">
                    <el-input v-model="ruleForm.date" size = "small" placeholder = "请输入中文时间"></el-input>
                </el-form-item>
                <el-form-item label="时间EN" prop="dates">
                    <el-input v-model="ruleForm.dates" size = "small" placeholder = "请输入英文时间"></el-input>
                </el-form-item>
                <el-form-item label="详情图片" prop="annex">
                    <upload ref = "app_upload" @imgChange = "handleImgChange" />
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
                title: "",
                titles:"",
                area:"",
                areas:"",
                address:"",
                addresss:"",
                date:"",
                dates:"",
                projectIntroductionId:"", // 项目id
                annex:"", // 图片地址
                id:""
            },
            loading: false,
            rules: {
                title: [
                    { required: true, message: '请输入中文名称', trigger: 'blur' },
                ],
                titles: [
                    { required: true, message: '请输入英文名称', trigger: 'blur' },
                ],
                area: [
                    { required: true, message: '请输入中文面积', trigger: 'blur' },
                ],
                areas: [
                    { required: true, message: '请输入英文面积', trigger: 'blur' },
                ],
                address: [
                    { required: true, message: '请输入中文地址', trigger: 'blur' },
                ],
                addresss: [
                    { required: true, message: '请输入英文地址', trigger: 'blur' },
                ],
                date: [
                    { required: true, message: '请输入中文时间', trigger: 'blur' },
                ],
                dates: [
                    { required: true, message: '请输入英文时间', trigger: 'blur' },
                ],
                annex: [
                    { required: true, message: '请选择图片', trigger: 'blur' },
                ],
                
            }
        }
    },
    methods: {
        ...mapActions("project",["editDetial","getDetail"]),
        // 设置值
        setRow(row) {
            this.ruleForm = Object.assign(this.ruleForm,{
                title: row.name,
                projectIntroductionId: row.id
            });
            this.handleGetDetail(row);
        },
        // 获取详情
        handleGetDetail(row) {
            this.loading = true;
            this.getDetail({ projectIntroductionId:row.id })
            .then(
                res=>{
                    this.loading = false;
                    if(res.code == 1) { 
                        let data = res.data.leftContent.replace(/&quot;/g,"\"")
                        this.ruleForm = Object.assign(this.ruleForm,{
                            ...JSON.parse(data)
                        });
                        this.$refs.app_upload.backImgList = this.ruleForm.annex.split(",")
                    }
                }
            )
        },
        // 图片上传变化
        handleImgChange(list) {
            this.ruleForm.annex = list.toString();
        },
        // 保存请求
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let params = Object.assign({},{
                        ...this.ruleForm,
                        leftContent: JSON.stringify(this.ruleForm),
                        rightContent: JSON.stringify(this.ruleForm)
                    })
                    this.loading = true;
                    this.editDetial(params)
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