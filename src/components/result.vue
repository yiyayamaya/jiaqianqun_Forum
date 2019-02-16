<template>
  <div>
<h1>Result</h1>

<p>Parameter<span>parameter1</span></p>
<p>answers</p>
</div>


</template>
 
<script>

export default {
  name: 'edit',
  components: {
    
  },
  mounted() {
     


     









  },
  data () {
    return {}
      
         
    },

  methods: {
  	
  },

  beforeMount: function(){

           console.log("进来了")
        	var arr1=document.cookie.match(new RegExp("(^| )"+"user_status"+"=([^;]*)(;|$)"))
        	if(arr1==null||arr1[2]==0){
        		this.$router.push('/login')
        	}
          var url = "http://120.76.197.133/model/user.php";
          	let formData = new FormData();
          
          var theID=window.location.href.split('/');
     
          formData.append('result_id',theID[theID.length-1])
          formData.append('mode',2)

          console.log(theID[theID.length-1])
          
		
		
			this.$http.post(url, formData).then((response)=>
				{
         console.log("我是回复")
        console.log(response.body)
				})
        }//beformount结束
}
</script>
<style>
  .edit {
    height: 100%;
    width: 100%;
    position: absolute;
    border: none;
  }
  .edit-inner {
    /*max-width: 1012px;*/
    height: 100%;
    /*margin: 0 auto;*/
    border-radius: 3px;
    box-shadow: 0 2px 3px 0px rgba(0, 0, 0, 0.2), 0 0px 2px 0 rgba(0, 0, 0, 0.24);
    margin-bottom: 12px;
  }
  .left-nav {
    float:left;
    position: relative;
    pointer-events: auto;
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 233px;
    opacity: 1;
    box-shadow: 2px 2px 5px 0px #BDBDBD;
    /*border-right: 1px solid #BDBDBD;*/
  }

  .left-nav .header {
    padding-top: 10px;
    height: 50px;
  }

  .left-nav #container {
    margin-left: 10px;
    width: 50px;
    height: 50px;
    border-radius: 100px;
    background: #F5F5F5;
    float: left;
  }

  .left-nav #project-icon {
    width: 100%;
    text-align: center;
    color: #333;
    font-size: 20px;
    line-height: 50px;
  }

  .left-nav .project-name {
    padding-left: 70px;
    padding-top: 10px;
    font-size: 20px;
    font-weight: 350;
  }

  .left-nav .icons {
    margin-left: 28px;
  }

  .left-nav .icons .icon{
    float: left;
    padding-top: 2px;
  }

  .left-nav .icons span {
    padding-left: 20px;
    font-weight: 430;
  }

  .left-nav .icons .submit a{
    text-decoration: none;
    cursor: pointer;
  }

  .left-nav .icons .submit a:-webkit-any-link {
    color: #000;
  }

  .left-nav .new-file {
    padding-top: 20px;
    cursor: pointer;
  }

  .left-nav .new-folder {
    padding-top: 5px;
  }

  .left-nav .import {
    padding-top: 5px;
  }

  .left-nav .import label {
  	cursor: pointer;
  }

  .left-nav .submit {
    padding-top: 5px;
  }



  .left-nav .all-files {
    padding-top: 15px;
  }

  .left-nav .all-files span {
    padding-left: 10px;
  }

  li{
    list-style: none;
  }

  .left-nav .tree-menu ul {
    margin-top: 3px;
    margin-bottom: 0px;
    padding-left: 28px;
  }
/*  .left-nav .tree-menu {
    padding-left: 0px;
  }*/

/*  .left-nav .folder , .file {
    margin-bottom: 2px;
  }*/

  .edit-area {
    margin-left: 233px;
    height: 100%;
    /*background: #9C27B0;*/
  }
  .editor{
    margin-bottom: 50px;
    padding-top: 2px;
}

  .editor .content {
      border: 1px solid rgba(27,31,35,0.15);
      border-radius: 3px;
      max-width: 1012px;
      margin:0 auto;
      margin-top: 20px;
  }

.editor .content .header {
    box-sizing: border-box;
    height: 38px;
    border-bottom: 1px solid rgba(27,31,35,0.15);
    background: #f6f8fa;
    display: flex;
    align-items: center;
    padding: 9px 10px 10px;
    position: relative;
}

.editor .content .header p {
    margin-left: 4px;
    font-size: 14px;
    font-weight: 600;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI";
    line-height: 20px;
}

.editor .content .header svg {
	cursor: pointer;
}

.editor .content .header .icon-box {
    color: #24292e;
    height: 28px;
    border-radius: 3px;
    position: absolute;
    box-shadow:0;
    margin-right: 10px;
    line-height: 28px;
    right: 0;
    color: #555;
}

.editor .content .header .icon-box .icon-delete {
	margin-right: 8px;
}

.editor .content .header .icon-box i {
	cursor: pointer;
}

.editor .content .header .babel {
    margin-right: 93px;
}

.editor .content .content-inner {
    
  
    padding:30px 45px;
    border: none;
    outline: none;
}

.editor .content .pen {
    border: none;
    outline: none;
}

.editor .title {
    height: 69px;
    /*border-bottom: 1px solid rgba(27,31,35,0.15);*/
    /*background-color: #fafbfc;*/
    /*background: #fff;*/
    font-size: 16px;
}

.editor .title .title-box{
    justify-content: space-between;
    max-width: 1012px;
    margin: 0 auto;
    display: flex;
    position: relative;
}

.editor .title .title-box .title-inner {
    box-sizing: border-box;
    height: 69px;
    display: flex;
    align-items: center;
    padding-top: 15px;
}

.editor .title .title-box .title-inner strong {
    line-height: 16px;
    margin-left: 10px;
    color: #0366d6;
    font-size: 16px;
}
.editor .title .title-box .title-inner span {
    color: #24292e;
    font-size: 18px;
    background-color: #fafbfc;
    width: 300px;
    height: 40px;
    font-weight: 500;
    margin-left: 18px;
    margin-top: 12px;
}
.editor .title .title-box .title-inner button {
    color: #24292e;
    height: 28px;
    border-radius: 3px;
    box-shadow:0;
    background-color: #eff3f6;
    border: 1px solid rgba(27,31,35,0.15);
    // align-self: end;
}


.editor .title .title-box .tool {
    align-self: center;
    display: flex;
}


.editor .title .title-box .tool .watch .iconfont {
    font-size: 20px;
    position: relative;
    color: #444;
    top: 3px;
}

.overlay {
  position: fixed;
  top: 0%;
  bottom: 0%;
  left: 0%;
  right: 0%;
  background: rgba(0, 0, 0, 0.7);
  transition: opacity 400ms;
  visibility: hidden;
  opacity: 0;
}

/*.overlay#scrollable {
    overflow-y: scroll;
    height: 100%;
}*/

.overlay:target {
  visibility: visible;
  opacity: 1;
}

/*.popup-outer {
  position: fixed;
  left: 385px;
  top: 40px;
  overflow-y: scroll;
}*/

.edit-inner .popup {
  margin: 0px auto;
  /*margin-top: 10px;*/
  padding-top: 12px;
  padding-left: 30px;
  background: #fff;
  border-radius: 5px;
  width: 50%;
  overflow-y:scroll;
  overflow-x:hidden;
  height: 100%;
  position: relative;
  transition: all 5s ease-in-out;
  

}

.edit-inner .popup h2 {
  margin-top: 0;
  color: #333;
  font-family: Tahoma, Arial, sans-serif;
}
.edit-inner .popup .close {
  position: absolute;
  top: 20px;
  right: 30px;
  transition: all 200ms;
  font-size: 30px;
  font-weight: bold;
  text-decoration: none;
  color: #333;
}
.edit-inner .popup .close:hover {
  color: #06D85F;
}
.edit-inner .popup .content {
  max-height: 50%;
}
.edit-inner .popup .content .label {
  display: block;
}
.edit-inner .popup .content input[type="text"] {
    box-sizing: border-box;
    margin-top: 5px;
    height: 32px;
    margin-bottom: 15px;
    /*display: block;*/
    width: 230px;
    min-height: 34px;
    padding: 6px 8px;
    line-height: 20px;
    color: #24292e;
    border: 1px solid #d1d5da;
    border-radius: 3px;
    // outline: none;
    box-shadow: inset 0 1px 2px rgba(27,31,35,0.075);
}

.edit-inner .popup .content label {
    display: block;
    margin-bottom: 7px;
    font-weight: 600;
}

.edit-inner .popup .content textarea{
    box-sizing: border-box;
    margin-top: 5px;
    height: 100px;
    margin-bottom: 15px;
    display: block;
    width: 480px;
    min-height: 34px;
    padding: 6px 8px;
    line-height: 20px;
    color: #24292e;
    border: 1px solid #d1d5da;
    border-radius: 3px;
    // outline: none;
    box-shadow: inset 0 1px 2px rgba(27,31,35,0.075);
}

.edit-inner .popup .content input[type="button"]{
        color: #fff;
        background-image: linear-gradient(-180deg, #34d058 0%, #28a745 90%);
        background-color: #28a745;
        padding: 2px 10px;
        margin-top: 15px;
        font-size: 14px;
        font-weight: 600;
        line-height: 20px;
        white-space: nowrap;
        vertical-align: middle;
        -webkit-transition: all 0.3 ease;
        transition: all 0.3 ease;
        cursor: pointer;
        outline: none;
}

.edit-inner .content .publishalert {
    position: relative;
    top: 10px;
    padding: 2px 10px;
    color: red;
}



</style>