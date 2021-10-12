<template>
    <div>
        <el-upload 
            :action="$uploadUrl"
            list-type="picture-card"
            :on-preview="handlePreview"
            :headers="headers" 
            :on-success="coverOnSuccess" 
            :file-list="coverDatas" 
            :on-remove="coverHandleRemove"
        >
            <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="coverDialogVisible" append-to-body>
            <img width="100%" :src="coverDialogImageUrl" alt="">
        </el-dialog>
    </div>
</template>
<script>
import { imgShow } from "@/assets/utils/config"
export default {
    data() {
        return {
            coverDialogVisible: false,
            backImgList:[],
            coverDialogImageUrl:"",
            headers: {
                token: this.$getByKey("token")
            },
        }
    },
    computed: {
        coverDatas() {
            return this.backImgList.map((i,index)=> {
                return {
                    url:imgShow + i,
                }
            })
        }
    },
    methods: {
        handlePreview(file) {
            this.coverDialogImageUrl = file.url;
            this.coverDialogVisible = true;
        },
        coverHandleRemove(file, fileList) {
            this.backImgList.forEach((i,index)=>{
                if((imgShow + i) == file.url) {
                    this.backImgList.splice(index,1);
                    this.$emit('imgChange',this.backImgList)
                }
            })
            
        },
        coverOnSuccess(response, file, fileList) {
            if(response.code == 1) {
                let data = response.data;
                this.backImgList = this.backImgList.concat(data);
                this.$emit('imgChange',this.backImgList)
            }else {
                this.backImgList = [];
                this.$message.error("上传失败！")
            }
        },
    }
}
</script>
<style lang="less" scoped>
    /deep/ .el-upload-list {
        .el-upload-list__item {
            transition: none !important;
        }
    }
</style>