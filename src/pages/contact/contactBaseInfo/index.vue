<template>
    <div class = "app-container app-contactInfo" v-loading = "loading" element-loading-text="请稍后...">
        <div class = "app-contactInfo-head">
            <span class = "app-contactInfo-head-title">联系我们信息配置</span>
            <el-button size = "mini" type="primary" @click = "isEdit = true">修改</el-button>
        </div>
        <div class = "app-contactInfo-content">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm" label-position = "left">
                <el-form-item label="页面banner图：" prop="annex" >
                    <upload ref = "app_upload" @imgChange = "handleImgChange" v-show = "isEdit" />
                    <el-image 
                        style="width: 146px; height: 146px"
                        :src="bannerUrl" 
                        v-show="!isEdit"
                        :preview-src-list="[bannerUrl]"
                    >
                    </el-image>
                </el-form-item>
                <el-form-item label="联系电话：" prop="phone" >
                    <el-input v-model="ruleForm.phone" size = "small" placeholder = "请输入联系电话" v-show = "isEdit"></el-input>
                    <span v-show = "!isEdit">{{ ruleForm.phone }}</span>
                </el-form-item>
                <el-form-item label="邮箱：" prop="emile" >
                    <el-input v-model="ruleForm.emile" size = "small" placeholder = "请输入邮箱" v-show = "isEdit"></el-input>
                    <span v-show = "!isEdit">{{ ruleForm.emile }}</span>
                </el-form-item>
                <el-form-item label="地址：" prop="address" >
                    <el-input v-model="ruleForm.address" size = "small" placeholder = "请输入地址" v-show = "isEdit"></el-input>
                    <span v-show = "!isEdit">{{ ruleForm.address }}</span>
                </el-form-item>
                <el-form-item label="地址跳转链接：" prop="addressUrl" >
                    <el-input v-model="ruleForm.addressUrl" size = "small" placeholder = "请输入跳转URL"  v-show = "isEdit"></el-input>
                    <span v-show = "!isEdit">{{ ruleForm.addressUrl }}</span>
                </el-form-item>
                <el-form-item label="申请方式：" prop="type" >
                    <el-input
                        type="textarea"
                        :autosize="{ minRows: 2, maxRows: 6}"
                        placeholder="请输入内容"
                        maxlength="200"
                        show-word-limit
                        v-show = "isEdit"
                        v-model="ruleForm.type">
                    </el-input>
                    <span v-show = "!isEdit">{{ ruleForm.type }}</span>
                </el-form-item>
            </el-form>
            <div class = "center">
                <el-button size="small" type = "primary" @click = "submitForm('ruleForm')" v-show = "isEdit">确认修改</el-button>
            </div>
        </div>
    </div>
</template>
<script>
import upload from "@/components/upload"
import { mapActions } from "vuex" 
import { imgShow } from "@/assets/utils/config"
export default {
    components: {
        upload
    },
    data() {
        return {
            imgShow,
            loading: false,
            isEdit: false,
            bannerUrl:"",
            ruleForm: {
                annex:"",
                phone:"",
                emile:"",
                address:"",
                addressUrl:"",
                type:"",
                id:"",
            },
            rightContent:"none",
            rules: {
                annex: [
                    { required: true, message: 'banner图必须上传', trigger: 'blur' },
                ],
                phone: [
                    { required: true, message: '请输入联系方式', trigger: 'blur' },
                ],
                emile: [
                    { required: true, message: '请输入邮箱', trigger: 'blur' },
                ],
                address: [
                    { required: true, message: '请输入地址', trigger: 'blur' },
                ],
                addressUrl: [
                    { required: true, message: '请输入地址跳转链接', trigger: 'blur' },
                ],
                type: [
                    { required: true, message: '请输入申请方式', trigger: 'blur' },
                ],
            }
        }
    },
    created() {
        this.getTypeList();
    },
    methods: {
        ...mapActions("contcat",["getList","addItem"]),
        // 图片上传变化
        handleImgChange(list) {
            this.ruleForm.annex = list.toString();
        },
        // 获取表格
        getTypeList() {
            this.loading = true;
            this.getList()
            .then(
                res=>{
                    this.loading = false;
                    if(res.code == 1) {
                        let data = res.data.list;
                        if(data.length) {
                            let dataObj = data[0];
                            this.ruleForm = JSON.parse(dataObj.leftContent.replace(/&quot;/g,"\""));
                            this.ruleForm.id = dataObj.id;
                            this.$refs.app_upload.backImgList = this.ruleForm.annex.split(",");
                            this.rightContent = JSON.parse(dataObj.rightContent.replace(/&quot;/g,"\""));
                            this.bannerUrl = this.imgShow + this.ruleForm.annex;
                        }
                    }
                }
            )
        },
        // 保存请求
        submitForm(formName) { 
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let leftContent = this.ruleForm;
                    let params = {
                        id: this.ruleForm.id,
                        annex: this.ruleForm.annex,
                        leftContent: JSON.stringify(leftContent),
                        rightContent: JSON.stringify(this.rightContent),
                    }
                    this.loading = true;
                    this.addItem(params)
                    .then(
                        res=>{
                            this.loading = false;
                            if(res.code == 1) {
                                this.$message.success("保存成功！");
                                this.isEdit = false;
                                this.getTypeList();
                            }
                        }
                    )
                } else {
                    return false;
                }
            });
        },
    }
}
</script>
<style lang="less" scoped>
    .app-contactInfo {
        &-content {
            padding: 30px;
            margin-top: 20px;
            box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
            word-break: break-all;
        }
        &-head {
            display: flex;
            align-content: center;
            justify-content: space-between;
            margin-top: 10px;
            box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
            padding: 15px;
            &-title {
                font-size: 18px;
                font-weight: 600;
                color: #666;
            }
        }
    }
</style>