<template>
    <div class="search">
        <div class="search-inner">
            <div class="big-title">
                <div class="logo-box">
                    <img class='main-logo' src="../components/code.png"/>
                </div>
                <div class="title">
                    <a>这是首页 </a>
                </div>
                <!-- <img src="./autoscript4.jpg" style="padding-left: 76.5px;"/>  -->
                <!-- style="padding:50px 0 0 40px" 上右下左 -->
            </div>
            <div class="search-bar">
                <input @keyup.enter="search" type="search" class="search-term" v-model="searchTerm" placeholder="What are you looking for?"/>
                <span @click="search" class="icon"><i class="icon-search"></i></span>
            </div>
        </div>
</div>
</template>

<script type="text/javascript">
    export default {
        name: 'search',
        data() {
            return {
                searchTerm: '', //用户搜索的内容
            }
        },
        methods: {
            search(searchTerm) {
            document.cookie="content_search"+"="+this.searchTerm
            var url = "http://211.159.186.183/model/search.php"; 
            let formData = new FormData();
            if(this.searchTerm!=""){
                formData.append('search_key', this.searchTerm);
            }
            var temp_l=[]
            this.$http.post(url, formData).then((response)=>{
                for(var i=0;i<response.body.length;i++){
                temp_l.push({title: response.body[i].scriptTitle, description: response.body[i].scriptIntro,id: response.body[i].scriptID})
               
            }
            })
            document.cookie="content_date"+"="+""
            document.cookie="content_language"+"="+""
            console.log("偷偷跳转1")
            this.toPage(temp_l)
            }  ,//search 结束

         toPage: function(templist_t){

             console.log("偷偷跳转2")
            this.$router.push({name: 'list', params :{ 
                templist:templist_t
                } 
                })
        }

        }
    }
</script>

<style type="text/css">
    .search {
        /*height: 100%;*/
        width: 100%;
        /*background-color: #f9f9f9;*/
        position: absolute;
        z-index: 100;
    }
    .search-inner {
        width: 595px;
        margin: 0 auto;
        overflow: hidden;
        vertical-align: middle;
    }
    .big-title {
        margin-top: 100px;
/*        padding-left: 135px;*/
        font-size: 70px;
        font-weight: 320;
        align-content: center;
        align-items: center;
    }
    .big-title .logo-box {
        float: left;
    }
    .big-title .logo-box .main-logo{
        height: 60px;
        width: 60px;
        padding-top: 23px;
        padding-right: 20px;
        padding-left: 96px;

    }
/*    .big-title .title {
        float: right;
    }*/
    .search-bar{
        margin-top: 45px;
        height: 42px;
        text-align: center;
    }

    .search-bar .icon{
        -webkit-border-top-right-radius: 5px;
        -webkit-border-bottom-right-radius: 5px;
        -moz-border-radius-top-right: 5px;
        -moz-border-radius-bottom-right: 5px;
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
        background: none;
        height: 30px;
        width: 25.15px;
        padding-left: 3.5px;
        padding-top: 7px;
        float: right;
        color: #4f5b66;
        border: 1px solid #999;
        border-left: none;
        -webkit-transition: all .55s ease;
        -moz-transition: all .55s ease;
        -ms-transition: all .55s ease;
        -o-transition: all .55s ease;
        transition: all .55s ease;
    }
    .search-bar .icon-search{
        position: relative;
        top: 0px;
        left: -2px;
    }
    .search-bar .search-term{
        font-size: 14px;
        background: none;
        color: #071216;
        height: 39px;
        width: 565px;
        padding-left: 20px;
        border: 1px solid #999;
        border-right: none;
        float: left;
        
        -webkit-border-top-left-radius: 5px;
        -webkit-border-bottom-left-radius: 5px;
        -moz-border-top-left-radius: 5px;
        -moz-border-bottom-left-radius: 5px;
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
    }
    .search-term:hover{
        border-color: #a0a0a0 #b9b9b9 #b9b9b9 #b9b9b9;
    }
    .search-term:focus{
        border-color:#4d90fe;
    }
    .search-bar:hover{
        cursor: pointer;
    }

</style>