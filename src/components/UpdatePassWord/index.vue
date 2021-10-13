<template>
    <!-- 修改密码界面 -->
    <el-dialog title="修改密码" width="40%" :visible.sync="cgpwdVisible" :close-on-click-modal="false" :modal-append-to-body='false'>
        <el-form :model="dataForm" label-width="100px" :rules="dataFormRules" ref="dataForm" :size="size"
            label-position="right">
            <el-form-item label="旧密码" prop="plainPassword">
                <el-input v-model="dataForm.plainPassword" type="password" auto-complete="off" clearable></el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="pwd">
                <el-input v-model="dataForm.pwd" type="password" auto-complete="off" clearable></el-input>
            </el-form-item>
             <el-form-item label="重复新密码" prop="repwd">
                <el-input v-model="dataForm.repwd" type="password" auto-complete="off" clearable></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer" style="margin-top: 5px;">
            <el-button  @click.native="cgpwdVisible = false" size = "small">取消</el-button>
            <el-button  type="primary" @click.native="submitForm" :loading="editLoading" size = "small">确认修改</el-button>
        </div>
    </el-dialog>
</template>

<script>
import { mapActions } from "vuex" 
export default {
  data() {
    return {
      size: 'small',
            cgpwdVisible: false, // 编辑界面是否显示
      editLoading: false,   //载入图标
      //初始化数据
      dataForm: {
                plainPassword: '',
                pwd: '',
                repwd:''
      },
      //设置属性
      dataFormRules: {
                plainPassword: [
                    { required: true, message: '请输入旧密码', trigger: 'blur' }
        ],
                pwd: [
                    { required: true, message: '请输入新密码', trigger: 'blur' }
        ],
           repwd: [
                    { required: true, message: '请再次输入新密码', trigger: 'blur' }
        ]
      },
      //获取全局url
      baseUrl: this.$baseUrl
    }
  },
  methods: {
    ...mapActions("users",["editPsd"]),
  　// 设置可见性
    setCgpwdVisible: function (cgpwdVisible) {
      this.cgpwdVisible = cgpwdVisible
    },

      // 提交请求
    　submitForm: function () {
        //this.$refs.XXX 获取ref绑定的节点
        this.$refs.dataForm.validate((valid) => {
          if (valid) {
            if(this.dataForm.repwd != this.dataForm.pwd) {
                return this.$message.warning("两次输入密码不一致")
            }
            this.$confirm('确认修改密码吗？修改成功后需要重新登录', '提示', {}).then(() => {
              this.editPsd(this.dataForm)
              .then(
                res=>{
                  if(res.code == "1") {
                    this.$message.success("修改成功")
                    this.$router.push({path:"/login"})
                  }
                }
              )
            })
          }
        })
     }
  },
//mounted： 在这发起后端请求，拿回数据，配合路由钩子做一些事情  （dom渲染完成 组件挂载完成 ）
  mounted() {
        
    }
}
</script>

<style scoped>

</style>