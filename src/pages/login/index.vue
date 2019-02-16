<template>
    <div class="login">
        <div class="login-inner">
            <div class="icon">
                <img src="../code.png"/>
            </div>
            <div class="title">
                <a>Welcome to Auto Script</a>
            </div>
            <div class="form">
                <form class="register-form" action="" v-if="showRegister">
                    <label for="">Username</label>
                    <input type="text" class="username" v-model="username"/>
                    <label for="">Password</label>
                    <input type="password" class="password" v-model="password"/>             
                    <label for="">Confirm Password</label>
                    <input type="password" class="password" v-model="password"/>
                    <input @click="register" type="button" class="button" value="create"/>
                    <p class="message">Already registered? <a href="#" @click="changePage">Sign In</a></p>
                </form>
                <form class="login-form" action="" v-if="showLogin">
                    <label for="">Username</label>
                    <input type="text" class="username" v-model="username"/>
                    <label for="">Password</label>
                    <input type="password" class="password" v-model="password"/>
                    <input @click="login" type="button" class="button" value="login"/>
                    <p class="message">Not registered? <a href="#" @click="changePage">Sign up</a></p>
                </form>
            </div>
        </div>
    </div>
</template>

<script type="text/javascript">
    export default {
        name: 'login',
        data() {
            return {
                username: '',
                password: '',
                showRegister: true, //flag is true: register page else: login page
                showLogin: false,
            }
        },
        methods: {
            
            //future 检查状态：进入页面时或者路由变化时检查是否有登录状态(保存在cookie或者本地存储的值)；如果有登录态则查询登录信息(uid，头像等...)并保存起来；如果没有则跳转到登录页；
            login: function(){
                var success = false;
                //todo 函数：post数据到服务器，返回true/false传递给success（可能还要设置cookie什么的）
                if (success)
                    console.log("success!");
                    //todo 登录成功则从后端数据中取出session信息保存登录状态(可能需要跳转);登录不成功则提示用户不成功
                    //todo 跳转至首页
                else{
                    console.log('fail to login!');
                    //todo 弹出用户名密码不匹配的对话框
                    this.password = ''; //绝大多数情况是密码输错，所以密码清空重输
                }

            },
            register: function(){
                //todo 首先判断密码是否一样 其次判断用户名是否已存在 
                //若创建成功 服务器需建立一个session; 否则提示用户创建失败
            },
            changePage: function(){
                this.showRegister = !this.showRegister;
                this.showLogin = !this.showLogin;
            }
        }
    }
</script>

<style lang="less" scoped>
    .login {
        height: 100%;
        width: 100%;
        /*background: #76b852;
        background: -webkit-linear-gradient(right, #76b852, #8DC26F);
        background: -moz-linear-gradient(right, #76b852, #8DC26F);
        background: -o-linear-gradient(right, #76b852, #8DC26F);
        background: linear-gradient(to left, #76b852, #8DC26F);*/
        background-color: #f9f9f9;
        position: absolute;
        z-index: 100;
        overflow: hidden;
    }
    .login-inner {
      width: 350px;
      margin: 0 auto;
    }

    .icon {
        padding-top: 52px;
        padding-bottom: 24px;
        display: block;
        width: 48px;
        height: 48px;
        margin: 0 auto;
        line-height: 48px;
        text-align: center;
        font-size: 40px;
        position: relative;
        top: 5px;
    }

    .title {
        margin-bottom: 15px;
        font-size: 22px;
        font-weight: 300;
        letter-spacing: -0.5px;
        text-align: center;
        color: #333;
    }
    .form {
      position: relative;
      z-index: 1;
      background: #FFFFFF;
      max-width: 360px;
      margin: 0 auto 100px;
      padding: 20px;
      box-sizing: border-box;
      border-radius: 5px;
      border: 1px solid #d8dee2;
      font-size: 14px;
      //box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
        label {
            display: block;
            margin-bottom: 7px;
            font-weight: 600;
        }
        input {
            box-sizing: border-box;
            margin-top: 5px;
            height: 32px;
            margin-bottom: 15px;
            display: block;
            width: 100%;
            min-height: 34px;
            padding: 6px 8px;
            line-height: 20px;
            color: #24292e;
            border: 1px solid #d1d5da;
            border-radius: 3px;
            // outline: none;
            box-shadow: inset 0 1px 2px rgba(27,31,35,0.075);
        }
        input.button {
            margin-top: 20px;
            text-align: center;
            text-transform: uppercase;
            color: #fff;
            background-image: linear-gradient(-180deg, #34d058 0%, #28a745 90%);
            background-color: #28a745;
            padding: 6px 12px;
            font-size: 14px;
            font-weight: 600;
            line-height: 20px;
            white-space: nowrap;
            vertical-align: middle;
            -webkit-transition: all 0.3 ease;
            transition: all 0.3 ease;
            cursor: pointer;
            width: 100%;
        }
        input.button:hover,.form button:active,.form button:focus {
            background: #43A047;
        }

        .message {
          margin: 15px 0 0;
          color: #b3b3b3;
          font-size: 12px;
          text-align: center;
          a {
              color: #4CAF50;
              text-decoration: none;
            }           
        }
    }

</style>
