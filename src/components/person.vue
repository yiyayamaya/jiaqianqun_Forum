<template>
    <div class="person">
        <div class="person-inner">
        	<div class="top-area">
	            <div class="avator">
	                <img class='main-logo' src="../components/people_big.png"/>
	            </div>
	            <div class="cover-title">{{name}}</div>
				<input @click="logout" type="button" class="button" value="logout"/>
				
	            <div class="scrolling-tabs-container">
					<ul class="nav-links user-profile-nav scrolling-tabs nav nav-tabs is-initialized">
						<li class="js-projects-tab">
						<a href="javascript:" @click="selected('project')" :class="activeClass == 0 ? 'active':''">我关注的吧
						</a></li>
						<li class="js-unread-tab">
						<a href="javascript:" @click="selected('weidu')" :class="activeClass == 1 ? 'active':''">未读回复
						</a><div class="message-count"><span>{{message.unread.length}}</span></div></li>


						<li class="js-all-tab">
						<a href="javascript:" @click="selected('yidu')" :class="activeClass == 2 ? 'active':''">全部回复
						</a><div class="message-count"><span>{{message.all.length}}</span></div></li>
						
						








					</ul>
				</div>
			</div>
		

			<div class="down-area">

	            <div class="script-box" v-if="activeClass == 0">
	                <li class="script-list" v-for="(item, index) in scriptList">
	                    <div class="title" @click="toScript(item.id)">{{item.title}}</div>
	                    <div class="description">{{item.description}}</div>
	                    <div class="footer">
	                        <div class="edit-icon" @click="editScript(item.id)"><i class="icon-edit"></i></div>
	                        <div class="delete-icon" @click="pop(item)"><i class="icon-delete"></i></div>
	                    </div>
	                </li>
	            </div>

	            




				<ul style="list-style: none;padding-left: 0px" v-if="activeClass == 1">
					<li class="issues" :class="index%2==0?'even':'odd'" v-for="(item, index) in message.unread">
			            <div>
			            	<div class="project-title" @click="viewProject(item.project.id)">{{item.project.name}}</div>
			                <div class="message-type">{{item.type}}</div>
			                <div class="message-info">#{{item.id}} · opened at {{item.time}} by <span @click="viewPerson(item.person.id)">{{item.person.name}}</span></div>
			                
			                <div @click="labelSolved(item.id,item.feedbackID)" class="icons-ok">								
								<svg t="1545840338593" class="icon" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1683" xmlns:xlink="http://www.w3.org/1999/xlink" width="32" height="32"><path d="M512 512m-448 0a448 448 0 1 0 896 0 448 448 0 1 0-896 0Z" fill="#4CAF50" p-id="1684"></path><path d="M738.133333 311.466667L448 601.6l-119.466667-119.466667-59.733333 59.733334 179.2 179.2 349.866667-349.866667z" fill="#CCFF90" p-id="1685"></path></svg>
							</div>
			            </div>
			        </li>
				</ul>
				<ul style="list-style: none;padding-left: 0px" v-if="activeClass == 2">
					<li class="issues" :class="index%2==0?'even':'odd'" v-for="(item, index) in message.all">
			            <div>
			            	<div class="project-title" @click="viewProject(item.project.id)">{{item.project.name}}</div>
			                <div class="message-type">{{item.type}}</div>
			                <div class="message-info">#{{item.id}} · opened at {{item.time}} by <span @click="viewPerson(item.person.id)">{{item.person.name}}</span></div>
			            </div>
			        </li>
				</ul>
				

	        </div>


			<div ref="popup" class="overlay" style="">
				<div class="popup">
					<h2>Alert</h2>
					<a class="close" href="javascript:" @click="close('popup1')">&times;</a>
					<div class="content">
						Are you going to delete <span style="font-weight: 600" ref="project"></span> ?
					</div>
					<input @click="deleteScript" type="button" value="YES"/>
					<input @click="close('popup1')" type="button" value="NO"/>
					<span class="alert">{{runAlert}}</span>
				</div>
			</div>

			<div ref="popup2" class="overlay" style="">
                <div class="popup">
                    <h2>Result</h2>
                    <a class="close" href="javascript:" @click="close('popup2')">&times;</a>
                    <div class="content" v-for="(oneResult, index) in results">
                    	<span class="oneResult">{{oneResult.result}}</span>
                    </div>
                </div>
            </div>

	
		</div>
    </div>


	
</template>

<script>
	
	export default {
        name: 'person',
        data() {
            return {
                name: '', //用户名
                activeClass: 2,//显示哪个面板
                deleteItem: -1,
                historyList: [],
				scriptList: [],  //todo示例 读入数据库中的数据
				results: [],
				runAlert:'',
				






				 message:{
				
                
                'unread':[
                {id:4,project:{id:125,name:'search music'},person:{id:126,name:'Nicole',time:'2018-12-03 16:46'},type:'report'},
                {id:5,project:{id:264,name:'stylish weibo'},person:{id:15,name:'Jason'},time:'2018-12-08 1:36',type:'bug'}
                ],
                'all':[
                {id:1,project:{id:125,name:'search music'},person:{id:126,name:'Nicole'},time:'2018-12-03 16:46',type:'report'},
                {id:2,project:{id:264,name:'stylish weibo'},person:{id:15,name:'Jason'},time:'2018-12-08 1:36',type:'bug'},
                {id:3,project:{id:224,name:'baidu-cloud download'},person:{id:165,name:'Mike'},time:'2018-12-23 1:36',type:'report'},
                {id:4,project:{id:125,name:'search music'},person:{id:126,name:'Nicole',time:'2018-12-03 16:46'},type:'report'},
                {id:5,project:{id:264,name:'stylish weibo'},person:{id:15,name:'Jason'},time:'2018-12-08 1:36',type:'bug'}
                ]},

            }
        },
        methods: {
            selected(type) {
            	if(type=="project"){
            		this.activeClass = 0;
            	}else if(type=="weidu"){
            		this.activeClass = 1;
				}
				else if(type=="yidu"){
            		this.activeClass = 2;
				}
				
            },
            toScript(id) {
            	this.$router.push({path: `/script/${id}`})
            	//todo跳转到history对应的project
            },
            editScript(id) {
            	//todo 跳转到编辑该脚本页面
            	this.$router.push({path: `/edit/${id}`})
            	console.log(id)
            },
            deleteScript() {
            	//todo 从数据库删除id为此的脚本
            	this.$refs.popup.style.visibility = 'hidden';
        		this.$refs.popup.style.opacity = 0;
            	console.log(this.deleteItem.id)
            	var url = "http://sornhub.com/model/user.php";
				let formData = new FormData();
				formData.append('mode',1)
				formData.append('script_id',this.deleteItem.id)
				this.$http.post(url, formData).then((response)=>
				{
					console.log(response)
					if(response.body==0){
						Array.prototype.indexOf = function(val) {
							for (var i = 0; i < this.length; i++) {
							if (this[i] == val) return i;
										}
								return -1;
							};
						Array.prototype.remove = function(val) {
						var index = this.indexOf(val);
						if (index > -1) {
						this.splice(index, 1);
							}
							};
						this.scriptList.remove(this.deleteItem)
					}
				})	
            },
            pop(item){
        		//todo 分类执行脚本（根据styleSelected的内容）原来的run改成弹窗
        		this.$refs.popup.style.visibility = 'visible';
        		this.$refs.popup.style.opacity = 1;
        		this.$refs.project.innerHTML = item.title;
        		this.deleteItem = item;
			},
			pop2(){
				this.$refs.popup2.style.visibility = 'visible';
				this.$refs.popup2.style.opacity = 1;				
			},
        	close(popitem){
				console.log(popitem)
				if(popitem=="popup1"){
        			this.$refs.popup.style.visibility = 'hidden';
        			this.$refs.popup.style.opacity = 0;
				}else if(popitem=="popup2"){
        			this.$refs.popup2.style.visibility = 'hidden';
        			this.$refs.popup2.style.opacity = 0;
				}

        		console.log('close')
			},
			logout(){
				document.cookie="user_status"+'=;  expires=Thu, 01 Jan 1970 00:00:01 GMT;'
				document.cookie="user_ID"+'= ;expires=Thu, 01 Jan 1970 00:00:01 GMT;'
				document.cookie="user_type"+'=;  expires=Thu, 01 Jan 1970 00:00:01 GMT;'
				document.cookie="token"+'=;  expires=Thu, 01 Jan 1970 00:00:01 GMT;'
				//this.$router.push({path: `/login/`})
				this.$router.push({path: '/'});
			},
        	loadRes(id){
				//弹出结果框
				var url = "http://sornhub.com/model/user.php";
				let formData = new FormData();
			
				formData.append('result_id',id)
				formData.append('mode',2)

				this.$http.post(url, formData).then((response)=>
						{
				console.log("我是回复")
				this.results=response.body;
				console.log(this.results)
				// console.log(this.results[0])
						})
				this.pop2();
				}
        },beforeMount: function(){
        	var arr1=document.cookie.match(new RegExp("(^| )"+"user_status"+"=([^;]*)(;|$)"))
        	if(arr1==null||arr1[2]==0){
        		this.$router.push('/login')
        	}
        	var url = "http://sornhub.com/model/user.php";
			let formData = new FormData();
			var arr = document.cookie.match(new RegExp("(^| )"+"user_ID"+"=([^;]*)(;|$)"));
			//console.log(arr[2])
			formData.append('user_id',arr[2])
			formData.append('mode',4)
			this.$http.post(url, formData).then((response)=>
				{
				console.log("person 的回复")
				console.log(response.body)
				console.log(response.body['gottenset'])
				console.log(response.body['gottenset2'])
				this.name =response.body.username
				var temp_h=[]
				for(var i=0;i<response.body.scripts_loved.length;i++){
					
					temp_h.push({id: response.body.scripts_loved[i][0].scriptID,title:response.body.scripts_loved[i][0].scriptTitle,
					description:response.body.scripts_loved[i][0].scriptIntro})
				}
				this.scriptList=temp_h
				/*
				var temp1_h=[]
				console.log(response.body.scripts_run)
				for(var i=0;i<response.body.scripts_run.length;i++){
					var par_temp=[]
					for(var j=0;j<response.body.scripts_run[i].parameter_names.length;j++){
						par_temp.push({name:response.body.scripts_run[i].parameter_names[j].name,para:response.body.scripts_run[i].parameter[j]})
					}
					temp1_h.push({id:response.body.scripts_run[i].scriptID,title:response.body.scripts_run[i].scriptTitle,index:0,parameter:par_temp,author:response.body.scripts_run[i].username,hisid:response.body.scripts_run[i].historyID})
				}
				this.historyList=temp1_h
				*/







				var allreply=[];



			
			
			for(var i=0;i<response.body['final'].length;i++)
			{
				
				

				if(response.body['gottenset'][response.body['final'][i]['tieziID']]==2) //用key索引太慢 不知道怎么处理 参见265行输出

				{
					var onereply={id:response.body['final'][i]['tieziID'],
				project:{id:0,name:response.body['final'][i]['userComment']},person:{id:2,name:'2'},
				time:response.body['final'][i]['postTime'],type:'',feedbackID:0};
				}
				else if (response.body['gottenset'][response.body['final'][i]['tieziID']]==1)
				
				{
					var onereply={id:response.body['final'][i]['tieziID'],
				project:{id:0,name:response.body['final'][i]['userComment']},person:{id:1,name:'1'},
				time:response.body['final'][i]['postTime'],type:'',feedbackID:0};
				}


				allreply.push(onereply)
			}

			
			

		



			
			this.message.all=allreply;











				})
        }

    }
</script>

<style>
	.person {
        /*height: 100%;*/
        width: 100%;
        /*background-color: #f9f9f9;*/
       
        z-index: 100;
    }
    .person-inner {
        width: 100%;
        margin: 0 auto;
        overflow: hidden;
        vertical-align: middle;
    }
    .avator {
        margin-top: 5px;
/*        padding-left: 135px;*/
        font-size: 70px;
        font-weight: 320;
        align-content: center;
        align-items: center;
    }
    .avator .main-logo {
    	width: 90px;
    	height: 90px;
    }

    .top-area {
    	text-align: center;
	    /*background: #fafafa;*/
	    padding-top: 20px;
	    position: relative;
    }

	.person-inner .top-area .button{
		color: #fff;
        /* background-image: linear-gradient(-180deg,  0%,  90%); */
        background-color: #28a745;
		margin-left: 10px;
        font-size: 14px;
        font-weight: 500;
        line-height: 20px;
        white-space: nowrap;
        -webkit-transition: all 0.3 ease;
        transition: all 0.3 ease;
        cursor: pointer;
		border: none;

	}

	.person-inner .top-area .button:hover{
		background-color: rgb(19, 177, 56);
	}

    .down-area {
        max-width: 1012px;
        margin: 0 auto;
    }

    .cover-title {
	    color: #2e2e2e;
	    font-size: 23px;
	    text-align: center;
		display: inline;
	}

	.scrolling-tabs-container{
		position: relative;
		margin-top: 10px;
		width: 805px;
		margin: 0 auto;
		margin-top: 10px;
		/* align-content: center;
		align-items: center; */
	}

	.nav-links .scrolling-tabs {
	    float: none;
	    overflow-x: auto;
	    overflow-y: hidden;
	    -webkit-overflow-scrolling: touch;
	    display: flex;
	    flex-wrap: nowrap;
	    
	}

	.scrolling-tabs-container .nav-links {
	    overflow-x: auto;
	    overflow-y: hidden;
	    -webkit-overflow-scrolling: touch;
	    display: flex;
	    flex-wrap: nowrap;
		margin: 0 auto;
	}

	.person-inner ul {
	    display: block;
		list-style-type: none;
		list-style: none;
	    margin-block-start: 1em;
	    margin-block-end: 1em;
	    margin-inline-start: 0px;
	    margin-inline-end: 0px;
		padding-inline-start: 40px;
		margin: 0 auto;
		padding: 0;
		
	}

	.nav-links li{
	    display: flex;
	    list-style: none;
		height: auto;
	    border-bottom: 1px solid #e5e5e5;
    	text-align: -webkit-match-parent;
	}

	.scrolling-tabs-container .nav-links a {
	    transition: background-color 100ms linear, color 100ms linear, border 100ms linear;
	    text-decoration: none;
    	background-color: transparent;
    	cursor: pointer;
    	padding-top: 0px;
    	padding-left: 10px;
    	padding-right: 10px;
	    padding-bottom: 8px;
	    font-size: 14px;
	    line-height: 28px;
	    color: #707070;
	    border: 0;
	    border-bottom: 2px solid transparent;
	    white-space: nowrap;
	}

/*	.nav-links li.active a, .nav-links li.active button, .nav-links li a.active {

	}*/

	.nav-links li a:hover {
	    border-bottom: 2px solid #6666c4;
	}

	.nav-links .js-projects-tab{
		/* padding-left: 545.5px; */
	}


	.scrolling-tabs-container .nav-links .active {
	    color: #000;
	    font-weight: 600;
	    border-bottom: 2px solid #6666c4;
	}
    .script-box {
        display: flex;
        flex-direction: row;
        max-width: 1012px;
        justify-content: space-between;
        flex-wrap: wrap;
        padding: 0;
        margin-top: 25px;
    }
    .script-box .script-list {
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        list-style: none;
        width: 300px;
        border: 1px solid rgba(60, 60, 60, .2);
        border-radius: 3px;
        padding: 15px 15px 8px 15px;
        margin-top: 10px;
        margin-bottom: 25px;
        /*box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2), 0 0px 2px 0 rgba(0, 0, 0, 0.24);*/
    }
    .script-box .script-list .title {
        height: 21px;
        font-weight: 600;
        color: #0366d6;
        cursor: pointer;
        font-size: 16px;
        padding: 0;
        white-space: nowrap;
        overflow: hidden !important;
        text-overflow: ellipsis;
        /*overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;*/
    }
    .script-box .script-list .description {
        font-size: 12px;
        color: #666;
        height: 65px;
        margin-top: 8px;
        margin-bottom: 12px;
        display: -webkit-box;
        -webkit-line-clamp: 4;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .script-box .footer {
        display: flex;
        justify-content: space-between;
        width: 35px;
        height: 15px;
        margin-top: 8px;
        font-size: 10px;
    }

    .script-box .footer i {
    	cursor: pointer;
    }

    .icon-eye:hover {
        /*cursor: pointer;*/
        color: #6d6e70;
    }

    .icon-comment:hover {
        /*cursor: pointer;*/
        color: #6d6e70;
    }

    .icon-love:hover {
        /*cursor: pointer;*/
        color: #6d6e70;
    }

    .history-list {
    	width: 100%;
        margin: 0 auto;
    }

    .history-list .item{
    	margin-top: 18px;
    	height: 40px;
    	border-bottom: 1px solid #eee;
    	padding: 20px 0;
    }

      .history-list #container{
      	margin-top: 5px;
      	margin-left: 7px;
	    width: 35px;
	    height: 35px;
	    border-radius: 100px;
	    background: #F5F5F5;
	    float: left;
	  }

	  .history-list #project-icon {
	    width: 100%;
	    text-align: center;
	    color: #333;
	    font-size: 20px;
	    line-height: 35px;
	  }

	  .history-list .project-name {
	    padding-left: 30px;
	    padding-top: 10px;
	    font-size: 18px;
	    font-weight: 480;
	    float: left;
	  }

	  .history-list .info-icon {
	 	padding-left: 8px;
	    margin-top: 12px;
	    float: left;
	    cursor: pointer;
	  }

	  .history-list .project-para {

	  	float: right;
	  }

	  .history-list {
	  	max-width: 600px;
	  }


	.history-list .item a {
	    text-decoration: none;
    	background-color: transparent;
    	cursor: pointer;
	}

	.history-list .item a:-webkit-any-link {
		color: #2e2e2e;
	}

	.history-list .item a:hover {
	    transition: background-color 100ms linear, color 100ms linear, border 100ms linear;
	    text-decoration: underline;
	    color: #6666c4;		
	}

	.para-name {
	    display: inline-block;
	    color: #707070;
	    font-size: 13px;
	    line-height: 20px;
	    /*margin: -5px 3px;*/
	    padding: 0 7px;
	    margin-bottom: 4px;
	    margin-right: 7px;
	    border: 1px solid #e5e5e5;
	    border-radius: 100px;
	    font-weight: 400;
	}

	.para-para {
		font-size: 13px;
	    font-weight: 400;
	    line-height: 1;
	    color: #212529;
	}

	.person .popup input[type="button"]{
		/*background-color: #28a745;*/
		width: 53px;
		height: 25px;
		border: none;
		cursor: pointer;
		border: 1px solid #d1d5da;
        border-radius: 3px;
        margin-top: 8px;
	}

.overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.7);
  transition: opacity 400ms;
  visibility: hidden;
  opacity: 0;
}
.overlay:target {
  visibility: visible;
  opacity: 1;
}

.popup {
  margin: 140px auto;
  padding: 20px;
  background: #fff;
  border-radius: 5px;
  width: 30%;
  position: relative;
  transition: all 5s ease-in-out;
}

.popup h2 {
  margin-top: 0;
  color: #333;
  font-family: Tahoma, Arial, sans-serif;
}
.popup .close {
  position: absolute;
  top: 20px;
  right: 30px;
  transition: all 200ms;
  font-size: 30px;
  font-weight: bold;
  text-decoration: none;
  color: #333;
}
.popup .close:hover {
  color: #06D85F;
}
.popup .content {
  max-height: 50%;
  overflow: auto;
}




.message-box {
        width: 100%;
        position: absolute;
        z-index: 100;
    }
    .message-inner {
        width: 100%;
        margin: 0 auto;
        overflow: hidden;
        vertical-align: middle;
        max-width: 1012px;
    }

	.message-inner .cover-title {
	    padding-top: 10px;
	    border-bottom: 1px solid #e5e5e5;
	}

   	.message-inner h1 {
	    margin: 16px 0;
	    font-size: 1.75em;
	    font-weight: 600;
	    color: #2e2e2e;
	}

	.message-inner .scrolling-tabs-container{

		width: 800px;
		position: relative;
	}
	.message-inner .scrolling-tabs-container .nav-links {
	    overflow-x: auto;
	    overflow-y: hidden;
	    -webkit-overflow-scrolling: touch;
	    display: flex;
	    flex-wrap: nowrap;
	    padding-left: 0px;
	    margin-bottom: 0px;
	}

	.message-inner .nav-links li{
	    display: flex;
	    list-style: none;
	    height: auto;
	    border-bottom: 1px solid #e5e5e5;
    	text-align: -webkit-match-parent;
	}

	.message-inner .scrolling-tabs-container .nav-links a {
	    transition: background-color 100ms linear, color 100ms linear, border 100ms linear;
	    text-decoration: none;
    	background-color: transparent;
    	cursor: pointer;
    	padding-top: 0px;
    	padding-left: 0px;
    	padding-right: 0px;
	    padding-bottom: 8px;
	    font-size: 14px;
	    line-height: 28px;
	    color: #707070;
	    border: 0;
	    border-bottom: 2px solid transparent;
	    white-space: nowrap;
	}

	.message-inner .nav-links li a:hover {
	    border-bottom: 2px solid #6666c4;
	}

	.person .nav-links .message-count {
		margin-bottom: 10px;
	}

	.message-inner .scrolling-tabs-container .nav-links .active {
	    color: #000;
	    font-weight: 600;
	    border-bottom: 2px solid #6666c4;
	}

	.person-inner .message-count {
		font-weight: 400;
	    background-color: rgba(0,0,0,0.07);
	    color: #707070;
	    font-size: 12px;
	    font-style: normal;
	    display: inline-block;
	    text-align: center;
	    white-space: nowrap;
	    vertical-align: baseline;
	    border-radius: 10rem;
	    padding-top: 6px;
	    padding-left: 4px;
	    padding-right: 4px;
	    padding-bottom: 4px;
	    margin-right: 10px;
	    border-top-left-radius: 10rem;
	    border-top-right-radius: 10rem;
	    border-bottom-right-radius: 10rem;
	    border-bottom-left-radius: 10rem;
	}

	.message-inner .down-area ul {
		margin-top: 0px;
	}

	.person-inner .down-area .project-title{
		color: #2e2e2e;
		cursor: pointer;
		font-weight: 600;
		font-size: 15px;
    	word-break: break-word;
    	float: left;
	}

	.person-inner .down-area .message-type {
	    display: inline-block;
	    color: #707070;
	    font-size: 12px;
	    line-height: 20px;
	    /*margin: -5px 3px;*/
	    padding: 0 7px;
	    margin-bottom: 4px;
	    margin-right: 7px;
	    margin-left: 10px;
	    border: 1px solid #e5e5e5;
	    border-radius: 100px;
	    font-weight: 400;
	    cursor: pointer;
	}
	.person-inner .down-area .message-info{
	    font-weight: 400;
	    color: #707070;
	    font-size: 14px;
	    word-break: break-word;
	}
	.person-inner .down-area .message-info span{
		cursor: pointer;
	}
	.person-inner .down-area .message-info span:hover{
		font-weight: 600;
		border-bottom: 2px solid #e5e5e5;
	}

	.person .down-area .issues{ 
    	border-color: #e1e8d5;		
    	padding: 12px 0;
    	padding-left: 10px;
	    border-bottom: 1px solid #eee;
	    display: block;

	}

	.message-inner .down-area .even{
		background: #f3fff2;
	}

	.message-inner .down-area .odd{
		background: #fafafa;
	}

	.person-inner .down-area .issues .icons-ok{
		float: right;
		position: relative;
		top: -40px;
		right: 18px;
		cursor: pointer;
	}





</style>