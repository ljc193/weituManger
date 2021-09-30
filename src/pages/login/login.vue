<template>
    <div class = "login_wrapper">
        <img src="/static/img/h_4.jpg" alt="" class = "login_wrapper-bg"> 
        <div class = "login-content" v-loading = "loading" element-loading-text="正在登录...">
            <h3 class = "login-content-title">纬图后台管理系统</h3>
            <el-form ref="login_form" :model="form" :rules="rules">
                <el-form-item prop="name">
                    <el-input v-model="form.name" placeholder="请输入用户名">
                        <i slot="prefix" class="el-input__icon el-icon-s-custom"></i>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input v-model="form.password" placeholder="请输入用户密码" type = "password">
                        <i slot="prefix" class="el-input__icon el-icon-lock"></i>
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <div class = "login-codeWrapper">
                        <el-input v-model="form.code" placeholder="验证码">
                            <i slot="prefix" class="el-input__icon el-icon-key"></i>
                        </el-input>
                        <span class = "login-code" @click = "getCode" >{{ loginCode }}</span>
                    </div>
                </el-form-item>
                <el-form-item>
                    <el-checkbox v-model="form.isRember">记住密码</el-checkbox>
                </el-form-item>
                <el-form-item>
                    <el-button  type = "primary" style = "width:100%" @click = "handleLogin">登录</el-button>
                </el-form-item>
            </el-form> 
        </div>
    </div>
</template>
<script>
import { mapActions } from "vuex" 
export default {
    data() {
        return {
            form: {
                name:"",
                password:"",
                code:"",
                isRember: false,
            },
            loginCode:"",
            loading: false,
            rules: {
                name: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                ],
                password:[
                    { required: true, message: '请输入用户密码', trigger: 'blur' },
                ]
            }
        }
    },
    created() {
        this.getCode();
        if(localStorage.getItem("userName")) {
            this.form.name = localStorage.getItem("userName");
        }
        if(localStorage.getItem("passWord")) {
            this.form.password = localStorage.getItem("password");
        }
        this.form.isRember = localStorage.getItem("isRember")?true:false
    },
    methods: {
        ...mapActions("users",["login"]),
        /* 登录 */
        handleLogin() {
            
            this.$refs.login_form.validate((valid) => {
                
                if (valid) { // 验证账号密码
                    if(!this.form.code) return this.$message.warning("请输入验证码！")
                    if(this.form.code.toUpperCase() != this.loginCode.toUpperCase()) {
                        this.$message.warning("验证码输入错误！");
                        this.getCode();
                        return;
                    }

                    /* 验证完毕 */
                    localStorage.setItem("isRember",this.form.isRember);
                    if(this.form.isRember) { // 记住密码
                        localStorage.setItem('userName',this.form.name);
                        localStorage.setItem('passWord',this.form.password);
                    }else {
                        localStorage.removeItem('userName');
                        localStorage.removeItem('passWord');
                    }
                    this.loading = true;
                    this.login(
                        {
                            lognName:this.form.name,
                            pwd: this.form.password
                        }
                    )
                    .then(
                        res=>{
                            this.loading = false;
                            if(res.code == 1) { // 登录成功
                                let token = res.data;
                                this.$setByKey("token",token);
                                this.$setByKey("userName",this.form.name);
                                this.$message.success("登录成功！")
                                this.$router.push('/home')
                            }
                        }
                    )
                } else {
                    return false;
                }
            });
        },
        /* 获取验证码 */
        getCode() {
            var code = "";
            var codeLength = 4; //验证码的长度
            var codeChars = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
            'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z',
            'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'); 
            for (var i = 0; i < codeLength; i++){
                var charNum = Math.floor(Math.random() * 52);//设置随机产生
                code += codeChars[charNum];
            }
            this.loginCode = code;
        }
    }
}
</script>
<style lang = "less" scoped>
    .login_wrapper {
        width: 100%;
        height: 100%;
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        .login-content {
            border-radius: 6px;
            background: #fff;
            width: 400px;
            padding: 25px 25px 5px 25px;
            position: absolute;
            top: 50%;
            left: 50%;
            box-sizing: border-box;
            transform: translate(-50%,-50%);
            .login-codeWrapper {
                display: flex;
                align-items: center;
                .login-code {
                    display: block;
                    width: 100px;
                    height: 40px;
                    margin-left: 20px;
                    font-weight: 600;
                    text-align: center;
                    background-color: silver;
                    color:brown; 
                    cursor: pointer;
                    user-select: none;
                }
            }
            &-title {
                text-align: center;
                color: #707070;
                font-size: 1.17rem;
                font-weight: 500;
                margin: 0 auto 30px auto;
            }
        }
        &-bg {
            width: 100%;
            height: 100%;
            display: block;
            object-fit: cover;
            object-position: center top;
            user-select: none;
        }
    }
</style>
