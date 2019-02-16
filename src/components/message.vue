<template>
	<div class="message-box">
        <div class="message-inner">
        	<div class="top-area">
        		<div class="cover-title">
	            <h1>Notifications</h1>
	            </div>
	            <div class="scrolling-tabs-container">
					<ul class="nav-links">
						<li class="js-soloved-tab">
						<a href="javascript:" @click="selected('unsolved')" :class="activeClass == 0 ? 'active':''">Unsolved
						</a><div class="message-count"><span>{{message.unsolved.length}}</span></div></li>
						
						<li class="js-unsolved-tab">
						<a href="javascript:" @click="selected('solved')" :class="activeClass == 1 ? 'active':''">Solvedsssssssssssssssssssssssssssssssssssssssss
						</a><div class="message-count"><span>{{message.solved.length}}</span></div></li>
						<li class="js-all-tab">
						<a href="javascript:" @click="selected('all')" :class="activeClass == 2 ? 'active':''">All
						</a><div class="message-count"><span>{{message.all.length}}</span></div></li>
					</ul>
				</div>
			</div>
		

			<div class="down-area">
				<ul style="list-style: none;padding-left: 0px" v-if="activeClass == 0">
					<li class="issues" :class="index%2==0?'even':'odd'" v-for="(item, index) in message.unsolved">
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
				<ul style="list-style: none;padding-left: 0px" v-if="activeClass == 1">
					<li class="issues" :class="index%2==0?'even':'odd'" v-for="(item, index) in message.solved">
			            <div>
			            	<div class="project-title" @click="viewProject(item.project.id)">{{item.project.name}}</div>
			                <div class="message-type">{{item.type}}</div>
			                <div class="message-info">#{{item.id}} · opened at {{item.time}} by <span @click="viewPerson(item.person.id)">{{item.person.name}}</span></div>
			            </div>
			        </li>
				</ul>
				<ul style="list-style: none;padding-left: 0px" v-if="activeClass == 2">
					<li class="issues" :class="index%2==0?'even':'odd'" v-for="(item, index) in message.all">
			            <div>
			            	<div class="project-title" @click="viewProject(item.project.id)">{{item.project.name}}</div>
			                <div class="message-type" title="type of this">{{item.type}}</div>
			                <div class="message-info">#{{item.id}} · opened at {{item.time}} by <span @click="viewPerson(item.person.id)">{{item.person.name}}</span></div>
			            </div>
			        </li>
				</ul>
	        </div>


<!-- 			<div ref="popup" class="overlay" style="">
				<div class="popup">
					<h2>Alert</h2>
					<a class="close" href="javascript:" @click="close">&times;</a>
					<div class="content">
						Are you going to delete <span style="font-weight: 600" ref="project"></span> ?
					</div>
					<input @click="deleteScript" type="button" value="YES"/>
					<input @click="close" type="button" value="NO"/>
					<span class="alert">{{runAlert}}</span>
				</div>
			</div> -->


        </div>
    </div>
</template>

<script>
	export default {
        name: 'message',
        data() {
            return {
                activeClass: 0,//显示哪个面板
                message:{
				'solved':[{id:1,project:{id:125,name:'search music'},person:{id:126,name:'Nicole'},time:'2018-12-03 16:46',type:'report'},
                {id:2,project:{id:264,name:'stylish weibo'},person:{id:15,name:'Jason'},time:'2018-12-08 1:36',type:'bug'}
                ,
                {id:3,project:{id:224,name:'baidu-cloud download'},person:{id:165,name:'Mike'},time:'2018-12-23 1:36',type:'report'}
                ],
                
                'unsolved':[
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
            selected(type){
            	if(type=="unsolved"){
            		this.activeClass = 0;
            	}else if(type=="solved"){
            		this.activeClass = 1;
            	}else if(type=="all"){
            		this.activeClass = 2;
            	}
            },
            viewProject(id){
            	//跳转到该工程的代码 查看是否有恶意行为
            	this.$router.push({path: `/edit/${id}`})
            },
            viewPerson(id){
            	this.$router.push({path: `/person/${id}`})
            },
            labelSolved(id,typeid){
				//todo 数据库标记该问题已解决
				var url = "http://211.159.186.183/model/admin.php";
				let formData = new FormData();
				
				var arr2=document.cookie.match(new RegExp("(^| )"+"user_ID"+"=([^;]*)(;|$)"))
			
			
				var user_ID=''
			
				if(arr2!=null){
				user_ID=arr2[2]
				}
				formData.append('mode',1);
				formData.append('user_id',user_ID);
				formData.append('feedback_id',typeid);//typeid是feedbackid

				console.log('标记该问题已解决')
				console.log(user_ID)
				console.log(typeid)

				this.$http.post(url, formData).then((response)=>//根据后台response 写入前台的脚本作者题目描述等等
				{
					console.log('我是回复')

					console.log(response.body)
				})   


				for(var i=0;i<this.message.unsolved.length;i++)
				{
					if(this.message.unsolved[i].feedbackID==typeid)
					{
						console.log('我删的是脚本id是')
						console.log(this.message.unsolved[i].id)
						var theindex=i;
						
					}

				}
				console.log('我删的是脚本索引是')
				console.log(theindex)
				
				this.message.solved.push(this.message.unsolved[theindex]);
				this.message.unsolved.splice(theindex,1);
				console.log(this.message.unsolved.length)


		
		           



            }
		},
		beforeMount: function(){  //进入script界面前 把script_id post给后台 收到信息显示在前台上
            var url = "http://211.159.186.183/model/admin.php";
			let formData = new FormData();
			var arr2=document.cookie.match(new RegExp("(^| )"+"user_ID"+"=([^;]*)(;|$)"))
			
			
			var user_ID=''
			
			if(arr2!=null){
				user_ID=arr2[2]
			}
			formData.append('mode',0);
			formData.append('user_id',user_ID);
			
			var temp_l=[]
		this.$http.post(url, formData).then((response)=>//根据后台response 写入前台的脚本作者题目描述等等
		{
			console.log("我是回复")
			console.log(this.message.solved)
			console.log(response.body)
			console.log(response.body['solved'])

			var myall=[];



			var myunsolved=[];
			
			for(var i=0;i<response.body['unsolved'].length;i++)
			{
				var oneunsolved={id:0,project:{id:0,name:''},person:{id:0,name:''},time:'',type:'',feedbackID:0};
				//response.body['solved'][i];
				oneunsolved.id=response.body['unsolved'][i]['scriptID'];
				
				oneunsolved.person.name=response.body['unsolved'][i]['requestUsername'];
				oneunsolved.project.name=response.body['unsolved'][i]['scriptTitle'];
				oneunsolved.feedbackID=response.body['unsolved'][i]['feedbackID'];
				oneunsolved.time=response.body['unsolved'][i]['createTime'];


				myunsolved.push(oneunsolved)
				myall.push(oneunsolved)
			}

			this.message.unsolved=myunsolved;
			var mysolved=[];
			
			for(var i=0;i<response.body['solved'].length;i++)
			{
				var onesolved={id:0,project:{id:0,name:''},person:{id:0,name:''},time:'',type:''};
				//response.body['solved'][i];
				onesolved.id=response.body['solved'][i]['scriptID'];
				
				onesolved.person.name=response.body['solved'][i]['requestUsername'];
				onesolved.project.name=response.body['solved'][i]['scriptTitle'];
				onesolved.time=response.body['solved'][i]['createTime'];
				mysolved.push(onesolved)
				myall.push(onesolved)
			}

			this.message.solved=mysolved;



			
			this.message.all=myall;
			
		})            
		}//beforeMount结束    
    }
</script>

<style type="text/css">
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

	.message-inner .nav-links .message-count {
		margin-bottom: 10px;
	}

	.message-inner .scrolling-tabs-container .nav-links .active {
	    color: #000;
	    font-weight: 600;
	    border-bottom: 2px solid #6666c4;
	}

	.message-inner .message-count {
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

	.message-inner .down-area .project-title{
		color: #2e2e2e;
		cursor: pointer;
		font-weight: 600;
		font-size: 15px;
    	word-break: break-word;
    	float: left;
	}

	.message-inner .down-area .message-type {
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
	.message-inner .down-area .message-info{
	    font-weight: 400;
	    color: #707070;
	    font-size: 14px;
	    word-break: break-word;
	}
	.message-inner .down-area .message-info span{
		cursor: pointer;
	}
	.message-inner .down-area .message-info span:hover{
		font-weight: 600;
		border-bottom: 2px solid #e5e5e5;
	}

	.message-inner .down-area .issues{ 
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

	.message-inner .down-area .issues .icons-ok{
		float: right;
		position: relative;
		top: -40px;
		right: 18px;
		cursor: pointer;
	}

</style>