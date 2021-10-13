<template>
    <div class = "app-container app-about" v-loading = "loading" element-loading-text="请稍后...">
        <div class = "app-about-head">
            <span class = "app-about-head-title">关于我们信息配置</span>
            <el-button size = "mini" type="primary" @click = "isEdit = true">修改</el-button>
        </div>
        <div class = "app-about-content">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm" label-position = "left">
                <el-form-item label="页面banner图：" prop="banner" >
                    <upload ref = "app_upload" @imgChange = "handleImgChange" v-show = "isEdit" />
                    <el-image 
                        style="width: 146px; height: 146px"
                        :src="bannerUrl" 
                        v-show="!isEdit"
                        :preview-src-list="[bannerUrl]"
                    >
                    </el-image>
                </el-form-item>
                <el-form-item label="中文描述：" prop="disCn" >
                    <el-input
                        type="textarea"
                        :autosize="{ minRows: 4, maxRows: 100}"
                        placeholder="请输入中文描述"
                        show-word-limit
                        v-show = "isEdit"
                        v-model="ruleForm.disCn">
                    </el-input>
                    <span v-show = "!isEdit">{{ ruleForm.disCn }}</span>
                </el-form-item>
                <el-form-item label="英文描述：" prop="disEn" >
                    <el-input
                        type="textarea"
                        :autosize="{ minRows: 4, maxRows: 100}"
                        placeholder="请输入英文描述"
                        show-word-limit
                        v-show = "isEdit"
                        v-model="ruleForm.disEn">
                    </el-input>
                    <span v-show = "!isEdit">{{ ruleForm.disEn }}</span>
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
                banner:"",
                disCn:"",
                disEn:"",
                id:""
            },
            reqData:{},
            rules: {
                banner: [
                    { required: true, message: 'banner图必须上传', trigger: 'blur' },
                ],
                disCn: [
                    { required: true, message: '请输入中文描述', trigger: 'blur' },
                ],
                disEn: [
                    { required: true, message: '请输入英文描述', trigger: 'blur' },
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
            this.ruleForm.banner = list.toString();
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
                            this.reqData = data[0];
                            this.ruleForm = JSON.parse(this.reqData.rightContent.replace(/&quot;/g,"\""));
                            this.ruleForm.id = this.reqData.id;
                            // this.reqData.leftContent = JSON.parse(this.reqData.leftContent.replace(/quot;/g,"\"").replace(/&amp;amp;/g,""));
                            this.reqData.leftContent = JSON.parse(this.reqData.leftContent.replace(/&quot;/g,"\""));
                            this.$refs.app_upload.backImgList = this.ruleForm.banner.split(",");
                            this.bannerUrl = this.imgShow + this.ruleForm.banner;
                        }
                    }
                }
            )
        },
        // 保存请求
        submitForm(formName) { 
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let rightContent = this.ruleForm;
                    let params = {
                        ...this.reqData,
                        leftContent: JSON.stringify(this.reqData.leftContent),
                        rightContent: JSON.stringify(rightContent),
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
    .app-about {
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