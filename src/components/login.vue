<template>
    <div class="login">

        <div class="login-inner">
            <div class="icon1">
                <img src="./code.png"/>
            </div>
            <div class="title" v-if="showRegister">
                <a>欢迎注册</a>
            </div>

            <div class="title" v-if="!showRegister">
                <a>欢迎登陆</a>
            </div>
            <div class="form">

                
                <form class="register-form" action="" v-if="showRegister">
                    <label for="">Username</label>
                    <input type="text" class="username" v-model="username"/>
                    <label for="">Password</label>
                    <input type="password" class="password1" v-model="password1"/>             
                    <label for="">Confirm Password</label>
                    <input type="password" class="password2" v-model="password2" @keyup.enter="register"/>
                    <input @click="register" type="button" class="button" value="create"/>
                    <p class="message">已经注册过?? <a href="#" @click="changePage">登陆</a></p>
                </form>
                <form class="login-form" action="" v-if="!showRegister">
                    <label for="">Username</label>
                    <input type="text" class="username" v-model="username"/>
                    <label for="">Password</label>
                    <input type="password" class="password" v-model="password" @keyup.enter="login"/>
                    <input @click="login" type="button" class="button" value="login"/>
                    <p class="message">没注册过？ <a href="#" @click="changePage" > 注册</a></p>
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
                password1:'',
                password2:'',
                password: '',
                showRegister: false //flag is true: register page else: login page
                //showLogin: false,
            }
        },
        methods: {

            //future 检查状态：进入页面时或者路由变化时检查是否有登录状态(保存在cookie或者本地存储的值)；如果有登录态则查询登录信息(uid，头像等...)并保存起来；如果没有则跳转到登录页；
            login: function(){                           
                  
                 
                  var url="http://sornhub.com/model/login.php"
                  this.$http.options.emulateJSON = true;
                  let formData = new FormData();
                  formData.append('username', this.username);
                  formData.append('password',this.password);
                  this.$http.post(url, formData).then((response)=>{
                  //response.body是一个存有错误码的数组
                  document.cookie="token"+"="+response.body.cookie//登陆失败也会有token  这会跳转有问题 不过服务器上不会这样 可能是本地阿帕奇不行
                  var arr = document.cookie.match(new RegExp("(^| )"+"token"+"=([^;]*)(;|$)"));
                  console.log(response.body.cookie)
                  console.log(arr[2])
                  if(arr != null) {
                    console.log(arr);
                    console.log(unescape(arr[2]));
                  }
                    console.log("最新的登陆回复")
                 console.log(response)
                  for(var j=0;j<response.body.login_status.length;j++){

                      console.log("看这里")
                console.log(response.body.login_status[j])
                  if (response.body.login_status[j]==0){
                      document.cookie="user_status"+"="+"1"
                      document.cookie="user_ID"+"="+response.body.user.userID
                      document.cookie="user_type"+"="+response.body.user.usertype
                      console.log("success!!!***");
                      
                      $('<div>').appendTo('body').addClass('alert alert-info').html('登陆成功').show().delay(1000).fadeOut();
                    

                      this.$router.push({path: '/'});
                  }else if(response.body.login_status[j]==2){
                      $('<div>').appendTo('body').addClass('alert alert-danger').html('没填用户名').show().delay(1000).fadeOut();
                      break
                  //没有用户名
                  }else if(response.body.login_status[j]==3){
                      $('<div>').appendTo('body').addClass('alert alert-danger').html('没填密码').show().delay(1000).fadeOut();
                      break
                  //密码为空
                  }else if(response.body.login_status[j]==4){
                      $('<div>').appendTo('body').addClass('alert alert-danger').html('用户名或密码错误').show().delay(1000).fadeOut();
                  this.password = ''; //绝大多数情况是密码输错，所以密码清空重输
                  console.log('fail to register!');
                    //错了
                  }else{


                  }}
                              })
                //todo 函数：post数据到服务器，返回true/false传递给success（可能还要设置cookie什么的）
                //success=true;
                //console.log(success);


            },
            register: function(){
                                
                                var url="http://sornhub.com/model/register.php"
                                 let formData = new FormData();
                                formData.append('username', this.username);
                                formData.append('password',this.password1);
                                formData.append('cfpassword',this.password2);
                                 this.$http.options.emulateJSON = true;
                                    this.$http.post(url, formData).then((response)=>{
                                    console.log(response.body)
                                    for(var j=0;j<response.body.length;j++){
                                 console.log(response.body[j])
                                   if (response.body[j]==0){
                                     //注册成功
                                       console.log("success!");
                                       $('<div>').appendTo('body').addClass('alert alert-info').html('注册成功').show().delay(1000).fadeOut();
                                       this.showRegister = !this.showRegister;
                                       //todo 登录成功则从后端数据中取出session信息保存登录状态(可能需要跳转);登录不成功则提示用户不成功
                                       //todo 跳转至首页
                                   }else if(response.body[j]==1){
                                       $('<div>').appendTo('body').addClass('alert alert-danger').html('用户名没写').show().delay(1000).fadeOut();
                                       break
                                   }else if(response.body[j]==2){
                                       $('<div>').appendTo('body').addClass('alert alert-danger').html('第一个密码没写').show().delay(1000).fadeOut();    
                                        break
                                    //没有密码
                                   }else if(response.body[j]==3){
                                       $('<div>').appendTo('body').addClass('alert alert-danger').html('第二个密码没写').show().delay(1000).fadeOut();
                                       break 
                                   //没有confirm密码
                                   }else if(response.body[j]==4){
                                       $('<div>').appendTo('body').addClass('alert alert-danger').html('两个密码不一样').show().delay(1000).fadeOut();
                                       break
                                   //两个密码不一样
                                   }else if(response.body[j]==5){
                                       $('<div>').appendTo('body').addClass('alert alert-danger').html('用户名已存在').show().delay(1000).fadeOut();
                                       break
                                   //用户名已存在
                                   }else{
                                       //未知错误
                                       console.log(response.body)
                                       console.log('fail to register!');
                                       //todo 弹出用户名密码不匹配的对话框
                                       this.password = ''; //绝大多数情况是密码输错，所以密码清空重输
                                       break
                                   }}
                                        })
                             //this.$router.push({path: '/'});
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

<style>
    .login {
        /*height: 100%;*/
        width: 100%;
        /*background: #76b852;
        background: -webkit-linear-gradient(right, #76b852, #8DC26F);
        background: -moz-linear-gradient(right, #76b852, #8DC26F);
        background: -o-linear-gradient(right, #76b852, #8DC26F);
        background: linear-gradient(to left, #76b852, #8DC26F);*/
        /*background-color: #f9f9f9; 原效果 偏米白*/
/*        background-color: #fff; */
       
        z-index: 100;
        overflow: hidden;
    }
    .login-inner {
      width: 350px;
      margin: 0 auto;

    }

    .login-inner .icon1 {
        display: block;
        width: 48px;
        height: 48px;
        margin: 0 auto;
        line-height: 48px;
        text-align: center;
        font-size: 40px;
        position: relative;
        top: 100px;
    }

    .login-inner .title {
        margin-bottom: 15px;
        padding-top: 10px;
        font-size: 22px;
        font-weight: 300;
        letter-spacing: -0.5px;
        text-align: center;
        color: #333;
    }
    .login-inner .form {
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
    }
    .login-inner .form label {
        display: block;
        margin-bottom: 7px;
        font-weight: 600;
    }
    .login-inner .form input {
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
    .login-inner .form input.button {
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
    .login-inner .form input.button:hover,.form button:active,.form button:focus {
        background: #43A047;
    }

    .login-inner .form .message {
      margin: 15px 0 0;
      color: #b3b3b3;
      font-size: 12px;
      text-align: center;          
    }

    .login-inner .form .message a {
      color: #4CAF50;
      text-decoration: none;
    } 




    .alert {
	display: none;
	position: fixed;
	top: 12%;
	left: 50%;
	min-width: 300px;
	max-width: 600px;
	transform: translate(-50%,-50%);
	z-index: 99999;
	text-align: center;
	padding: 15px;
	border-radius: 3px;
}

.alert-success {
    color: #3c763d;
    background-color: #dff0d8;
    border-color: #d6e9c6;
}

.alert-info {
    color: #31708f;
    background-color: #d9edf7;
    border-color: #bce8f1;
}

.alert-warning {
    color: #8a6d3b;
    background-color: #fcf8e3;
    border-color: #faebcc;
}

.alert-danger {
    color: #a94442;
    background-color: #f2dede;
    border-color: #ebccd1;
}

</style>
