<template>
    <el-dialog
        title="新增项目简介"
        :visible.sync="isShow"
        class = "app-dialog"
        :close-on-press-escape = "false"
        :close-on-click-modal = "false"
        @open = "resetForm('ruleForm')"
        width="500px"
    >
        <div class = "addType_wrapper" v-loading = "loading" element-loading-text="请稍后...">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" label-position = "left">
                <el-form-item label="项目名称" prop="name">
                    <el-input v-model="ruleForm.name" size = "small" placeholder = "请输入项目名称"></el-input>
                </el-form-item>
                <el-form-item label="项目地址" prop="content">
                    <el-input v-model="ruleForm.content" size = "small" placeholder = "请输入项目地址"></el-input>
                </el-form-item>
                <el-form-item label="项目所属" prop="itemCategoryId">
                    <el-select v-model="ruleForm.itemCategoryId" placeholder="请选择" size = "small">
                        <el-option
                            v-for="item in typeList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="项目类型" prop="type">
                    <el-select v-model="ruleForm.type" placeholder="请选择" size = "small">
                        <el-option
                            v-for="item in statusList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="封面" prop="cover">
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
        isEdit: Boolean,
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
                name: '',
                content: '',
                itemCategoryId:"",
                sort:"",
                cover:"",
                type:"", // 类型 1 图片 2 视频 3 图片集
                id:""
            },
            typeList:[],
            statusList:[
                { name:"图片",id:"1" },
                { name:"视频",id:"2" },
            ],
            loading: false,
            rules: {
                name: [
                    { required: true, message: '请输入项目名称', trigger: 'blur' },
                ],
                content: [
                    { required: true, message: '请输入项目地址', trigger: 'blur' },
                ],
                itemCategoryId: [
                    { required: true, message: '请选择项目所属', trigger: 'blur' },
                ],
                type: [
                    { required: true, message: '请选择项目类型', trigger: 'blur' },
                ],
                cover: [
                    { required: true, message: '必须上传一个封面', trigger: 'blur' },
                ],
            }
        }
    },
    methods: {
        ...mapActions("project",["addItem","getType"]),
        // 设置值
        setRow(row) {
            this.ruleForm = Object.assign(this.ruleForm,{...row});
            this.$nextTick(()=>{
                this.$refs.app_upload.backImgList = this.ruleForm.cover.split(",")
            })
        },
        // 图片上传变化
        handleImgChange(list) {
            this.ruleForm.cover = list.toString();
        },
        // 获取类型
        getTypeList() {
            this.getType()
            .then(
                res=>{
                    if(res.code == 1) {
                        this.typeList = res.data.list;
                    }
                }
            )
        },
        // 保存请求
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.loading = true;
                    this.addItem(this.ruleForm)
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
            this.getTypeList();
            if(this.isEdit) return;
            this.$nextTick(()=>{
                this.$refs[formName].resetFields();
                this.$refs.app_upload.backImgList = []
            })
        }
    }
}
</script>