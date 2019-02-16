<template>
    <header class="vheader">
        <div class="header-inner">
            <div class="box" @click="toPages('/')">
                <div class="logo-box">
                    <img class='main-logo' src="../components/code.png"/>
                </div>
                <div class="title">
                    <a>借钱群贴吧</a>
                </div>
            </div>
            <div class="icon-box">
                <div class="search-box">
                    <i class="icon-search"></i>
                    <input type="text" name="" value="" v-model="searchTerm" placeholder="搜索贴吧" @keyup.enter="search()">
                </div>
                <div class="message" @click="getmessage()"><i class="icon-bell" /></i></div>
                <div class="add" @click="toPages('/add')">+</div>
                <div class="avatar" v-show="isLogin" @click="showPersonalPage()"><i class="icon-people" /></i></div> 
                <!-- todo... 有时间加入资料修改问题 -->
                <div id="login-button" class="login-button" v-show="!isLogin" @click="login()">Login</div>
            </div>
        </div>
    </header>
</template>
<script>
    import List from '../components/list.vue'
    import {mapGetters, mapMutations} from 'vuex'

export default {
    name: 'vHeader',
    data() {
        return {
            isLogin: false,
            searchTerm: document.cookie.match(new RegExp("(^| )"+"content_search"+"=([^;]*)(;|$)"))!=null?document.cookie.match(new RegExp("(^| )"+"content_search"+"=([^;]*)(;|$)"))[2]:'',
            islist: false
        }
    },watch:{
        '$route'(to,from){

            console.log("正在监听")
            console.log( to , from )
            this.isLogin=document.cookie.match(new RegExp("(^| )"+"user_status"+"=([^;]*)(;|$)"))!=null?document.cookie.match(new RegExp("(^| )"+"user_status"+"=([^;]*)(;|$)"))[2]=="1"?true:false:false
            if(to.name=="script"){
                this.searchTerm=""
            }
            if(to.name=='list'){
                 console.log("正在监听之我跳到list了 islist为真")
                this.islist=true
            }else{
                console.log("正在监听之 islist为假")
                this.islist=false
            }
        }
    },
    methods: {
        login() {
            this.searchTerm=""
            this.$router.push('/login');
            //todo 跳转到login界面 同时需要记住当前状态，如果登陆成功最后需要返回此页（此页面header中显示头像图标）
            
        },
        toPages(page) {
            //todo 跳转到相应的界面 login之所以要分开是因为登陆需要做特殊处理
            this.searchTerm=""
            console.log('进入', page);
            if(page!='/add'){
            this.$router.push(page);
            }else{
            if(this.isLogin){
            this.$router.push(page);
            }else{
            this.$router.push('/login');
            }
        }
        },showPersonalPage(){
            this.$router.push('/person');
        },
        search(searchTerm) {
            console.log(this.$root.Bus)
            console.log('搜索中...');
            document.cookie="content_search"+"="+this.searchTerm
             var url = "http://211.159.186.183/model/search.php"; 
            this.$http.options.emulateJSON = true;
            let formData = new FormData();
            if(this.searchTerm!=""){
                formData.append('search_key', this.searchTerm);
                formData.append('mode', 1);//mode1 关键词搜索
                var arr = document.cookie.match(new RegExp("(^| )"+"content_date"+"=([^;]*)(;|$)"));
                console.log(arr)
                if(arr!=null&&arr[2]!="all"){
                    if(arr[2]=="last week"){
                    formData.append("time","W");
                    }else if(arr[2]=="last month"){
                    formData.append("time","M")
                    }else if(arr[2]=="last year"){
                    formData.append("time","Y")
                    }
                }
                var arr1 = document.cookie.match(new RegExp("(^| )"+"content_language"+"=([^;]*)(;|$)"));
                if(arr1!=null&&arr1[2]!=""){
                    var forpost=""
                    forpost=forpost.concat(arr1[2])
                    formData.append('language', forpost);
                }
            }
            var temp_l=[]
            this.$http.post(url, formData).then((response)=>{
                console.log("来自search的回复")
                console.log(response.body)
                for(var i=0;i<response.body.length;i++){
               temp_l.push({title: response.body[i].scriptTitle, description: response.body[i].scriptIntro,
                id: response.body[i].scriptID})//新加一个id
            }
            if(this.islist){
            console.log("这句话决定性的")
            this.$root.Bus.$emit('eventTime',temp_l)

            }else{
            document.cookie="content_date"+"="+""
            document.cookie="content_language"+"="+""
            this.toPage(temp_l)
            }
            })
        },
        toPage: function(templist_t){
            this.$router.push({name: 'list', params :{ 
                templist:templist_t
                } 
                })
        },updated: function(){
            var content_search=document.cookie.match(new RegExp("(^| )"+"content_search"+"=([^;]*)(;|$)"))
            if(content_search!=null){
                this.searchTerm=content_search[2];
            }
        },getmessage(){
            var idhere=document.cookie.match(new RegExp("(^| )"+"user_ID"+"=([^;]*)(;|$)"))[2];
            var typehere=document.cookie.match(new RegExp("(^| )"+"user_type"+"=([^;]*)(;|$)"))[2];
           // console.log("msg");
             //console.log(msg);
             if(typehere==1)
                {
                this.$router.push({path: `/message/${idhere}`}) 
                }
            else{
                this.$router.push({path:'/login'}) 
            }
            
        },


    },
}
</script>
<style>
    .vheader {
        background: #fff;
        /*box-shadow: 0 2px 4px rgba(0,0,0,0.1);*/
        box-shadow: 2px 0px 5px 0px #BDBDBD;
        transition: 0.2s cubic-bezier(0, 0, 0, 1);
    }
    .header-inner {
        max-width: 1012px;
        position: sticky;
        margin: 0 auto;
        display: flex;
        height: 58px;
        justify-content: space-between;
    }
    .header-inner .box {
        padding: 9px 0;
        max-width: 1012px;
        display: flex;
        align-items: center;
        cursor: pointer;
    }

    .header-inner .box .logo-box{
        margin-right: 15px;
    }
    .header-inner .box .logo-box img {
        width: 42px;
        height: 42px;
        padding-top: 5px;
    }
    .header-inner .box .title {
        font-size: 27px;
    }
    .header-inner .icon-box {
        align-items: center;
        align-self: center;
        display: flex;
        justify-content: space-between;
        width: 350px;
    }

    .header-inner .icon-box .search-box {
        position:relative;
        top:3px;
        background-color: #ffffff;
        border: 1px solid #999;
        font-size: 14px;
        height: 25px;
        width: 200px;
        text-align: center;
        vertical-align:middle;
    }

    .header-inner .icon-box .search-box:focus {
        border-color:#4d90fe;
    }
    .header-inner .icon-box .search-box:hover {
        border-color: #a0a0a0 #b9b9b9 #b9b9b9 #b9b9b9;
    }
    .header-inner .icon-box .search-box icon-search {
        position: relative;
        top:-2px;
    }
    .header-inner .icon-box .search-box i {
        display: inline-block;
        padding-top: 6px;
        padding-left: 3px;
    }
    .header-inner .icon-box .search-box input {
        color: #000;
        margin: 4px 0 6px 0;
        height:18px;
        vertical-align:middle;
        line-height:18px;
        border: none;
        outline: none;
    }
    
    .header-inner .icon-box .message {
        position: relative;
        top: 5px;
        height: 24px;
        cursor: pointer;
    }

    .header-inner .icon-box .message:hover, .add:hover, .avatar:hover, .login-button:hover{
        color: #707070;
    }
    .header-inner .icon-box .add {
        font-size: 28px;
        font-weight: bold;
        cursor: pointer;
        position: relative;
        top: -1px;
    }

    .header-inner .icon-box .avatar {  /*todo登陆后的状态 默认头像需要放在服务器上有一个地址 用户修改图像再重新换地址*/

/*        background: url(http://ovs5x36k4.bkt.clouddn.com/06.jpg);
        background-size: 20px 20px;
        border-radius: 3px;*/
        cursor: pointer;
        position: relative;
        top: 3px;
    }
    .header-inner .icon-box .login-button {
        cursor: pointer;
    }
</style>
