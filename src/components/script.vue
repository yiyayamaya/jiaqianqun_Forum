<!-- 待修改！！！ -->
<template>
	<div class="script">
		<div class="script-inner">
			<div class="script-header">
				<h1>{{script.title}}</h1>
				<p>{{script.shortDes}}</p>
				<div class="script-icons">
			        <span class="look"><i class="icon-eye"></i>{{script.look}}</span>
			        <span class="love"><i class="icon-love"></i>{{script.love}}</span>
	                <span class="comment" style="border-right:0"><i class="icon-comment"></i>{{script.comment.length}}</span>
				</div>
			</div>

			<div class="script-feedback">
			    <a rel="nofollow" href="javascript:" @click.prevent="loveit">喜爱</a>,
				 <a rel="nofollow" href="#popup2"> 打分</a>, 
				 <a rel="nofollow" href="javascript:" @click="viewCode">查看本吧详情</a> or 
				 <a rel="nofollow" href="#popup1" @click="report">举报本吧</a>
			   	<span class="alert">{{operationAlert}}</span>
			</div>

			<div class="script-info">
				<!-- <h3>Script Information</h3> -->
				<dl class="inline-script-stats">
					<dt class="script-show-author"><span>Author</span></dt>
					<dd class="script-show-author"><span><a href="/people/id">{{script.author}}</a></span></dd>
					<!-- 上面一行超链接需要修改！ -->
					<dt class="script-show-daily-runnings"><span>Daily runnings</span></dt>
					<dd class="script-show-daily-runnings"><span>{{script.dailyRunnings}}</span></dd>
					<dt class="script-show-total-runnings"><span>Total runnings</span></dt>
					<dd class="script-show-total-runnings"><span>{{script.totalRunnings}}</span></dd>
					
					<dd class="script-show-language"><span>{{script.language}}</span></dd>
					<dt class="script-list-ratings"><span>Rating</span></dt>
					<dd class="script-list-ratings"><span>
						<span class="good-rating-count" title="Number of people who rated it Good or added it to favorites.">{{script.rating.good}}</span>
						<span class="ok-rating-count" title="Number of people who rated it OK.">{{script.rating.ok}}</span>
						<span class="bad-rating-count" title="Number of people who rated it Bad.">{{script.rating.bad}}</span>
					</span></dd>
					<dt class="script-show-version"><span>Version</span></dt>
					<dd class="script-show-version"><span>{{script.version}}</span></dd>
					<dt class="script-show-created-date"><span>Created</span></dt>
					<dd class="script-show-created-date"><span>{{script.createdDate}}</span></dd>
					<dt class="script-show-updated-date"><span>Updated</span></dt>
					<dd class="script-show-updated-date"><span>{{script.updatedDate}}</span></dd>

				</dl>
			</div>

			

			<div class="script-description">
				<h3>Author's Description</h3>
				<div class="content">{{script.desciption}}</div>
			</div>

			


								

			<div class="script-comment" id="jumpToComment">
			    <h3>主题帖</h3>
				<ul style="list-style: none;">
					<li v-for="(item, index) in script.comment">
						<a class='people' href="javascript:">
							<!-- todo 跳转到个人主界面 + 个人头像URL-->
                            <img src="../components/people_big.png"/>
                        </a>
						

			            <div class="row">

						
							<a :href ="'/#/thread/'+item.threadid">

							
			                <div  class="comment-detail" >
								
								{{item.title }}
								
								
							</div>

							</a>

							<div class="zhuticontent" >
								
								{{item.content}}
								
								
							</div>


							

			                <span class="publish"><a href="">{{item.author}}</a> published at {{item.time}}</span>
			            </div>
			        </li>
				</ul>
				<!-- todo 非登录状态无法评论 需要知道用户是否登录然后以此来弹框 -->
			    <!-- <div style="text-align: right;"></div> -->

				<div class="title-input" >
		        <textarea  v-model="title_te"></textarea>
				</div>

				<div class="comment-input" >
		        <textarea  v-model="comment_te"></textarea>
				</div>

				
		        <button @click="submitComment" class="comment-submit">发帖</button>
		        <span class="alert">{{submitAlert}}</span>
		        </div> 
			</div>




			<div id="popup1" class="overlay" style="">
				<div class="popup">
					<h2>Reporting</h2>
					<a class="close" href="#">&times;</a>
					<div class="content">
						Thanks for your reporting , the administor will deal with this problem within 2 days !
					</div>
				</div>
			</div>

			<div id="popup2" class="overlay" style="">
				<div class="popup">
					<h2>Give a score</h2>
					<a class="close" href="#">&times;</a>
					<div class="content">
						<button class="good" @click="giveScore(0)">GOOD</button>
						<button class="ok" @click="giveScore(1)">OK</button>
						<button class="bad" @click="giveScore(2)">BAD</button>
						<span class="alert">{{scoreAlert}}</span>
					</div>
				</div>
			</div>

			<div ref="popup3" class="overlay" style="">
				<div class="popup">
					<h2>Pass parameters</h2>
					<a class="close" href="javascript:" @click="close('popup3')">&times;</a>
					<div class="content-2" v-for="(item, index) in script.parameter">
						<label>{{item.name}}</label>
						<input type="text" :placeholder="item.usage" class="parameter" v-model="item.value"></input>
					</div>
					<input @click="run" type="button" class="button" value="run"/>
					<span class="alert">{{runAlert}}</span>
				</div>
			</div>

			<div ref="popup4" class="overlay" style="">
				<div class="popup">
					<h2>Choose a date</h2>
					<a class="close" href="javascript:" @click="close('popup4')">&times;</a>
					<!-- <div class="content"> -->
						<date-pick v-model="date" :pickTime="true" :format="'YYYY-MM-DD HH:mm'"></date-pick>
<!-- 						<button class="button" v-if="" @click="close('popup5')">OK</button> -->
					<!-- </div> -->
				</div>
			</div>

			<div ref="popup5" class="overlay" style="">
				<div class="popup">
					<h2>Choose repeat times</h2>
					<a class="close" href="javascript:" @click="close('popup5')">&times;</a>
					<div class="content-3">
					<label>repeat time</label>
					<input type="text" class="repeat-time" v-model.number="repeatTime"></input>
                	<span class="alert" v-if="repeatTime>100">No more than 100</span>
                	<label >select interval</label>
                	<v-select class="select-interval" v-model="intervalSelected" v-on:input="selectInterval(intervalSelected)" :options="options1"></v-select>
                	<button class="button" v-if="repeatTime<=100" @click="close('popup5')">OK</button>
					</div>
				</div>
			</div>
			

		</div>
	</div>
</template>

<script>
	import vSelect from './Select'
	import DatePick from 'vue-date-pick';
	import '../../node_modules/vue-date-pick/dist/vueDatePick.css';
    export default {
        name: 'script',
        components: {
            vSelect:vSelect,
            DatePick:DatePick,
        },
        data() {
            return{
            	date: '2018-12-27 16:30',
            	repeatTime: 1,
            	options: ['normal', 'fixed time', 'repeat'],
            	options1: ['1 minute', '30 minutes', '1 hour'],
            	styleSelected: 'normal',
            	intervalSelected: '1 minute',
            	script: {title: '', shortDes: '', look: 120, comment: 0, love:20, author: '', dailyRunnings:2, totalRunnings:0, language: '', rating:{good:6, ok:0, bad:0}, version: '1.0', createdDate:'', updatedDate: '',
            		parameter: [],
            		comment:[],
            		desciption: "我正在努力加载中 "
            	},
            	submitAlert: '', 
            	alreadyLoved: false,
            	alreadyScored: false,
            	operationAlert: '',
            	scoreAlert: '',
            	runAlert: '',
				comment_te: '',
				title_te:''
            	//todo 有一个问题 本来想着在description支持markdown 但是用引号包住它会有问题 如何解决？
            }
        },
        methods: {
			


			

			toThread(id) {
				this.$router.push({path: `/thread/${id}`})
				console.log("看到这条说明你执行了toThread");
            	//todo跳转到主题帖thread
            },
        	viewCode(){
        		this.$router.push({path: `/view/${this.script.id}`}) 
        	},
        	selectStyle(data){
        		//todo 将data传给数据层styleSelected
        		console.log('styleSelected');
                console.log(data);
        	},
        	selectInterval(data){
                console.log(this.intervalSelected);
        	},
        	pop(){
        		//todo 分类执行脚本（根据styleSelected的内容）原来的run改成弹窗
        		this.$refs.popup3.style.visibility = 'visible';
        		this.$refs.popup3.style.opacity = 1;
        		console.log('run')

        	},
        	run(){
        		var user_status=document.cookie.match(new RegExp("(^| )"+"user_status"+"=([^;]*)(;|$)"))
				if(user_status!=null&&user_status[2]==1){
        		var theID=window.location.href.split('/');
        		var url = "http://120.76.197.133/model/run_script.php";
                this.$http.options.emulateJSON = true;
                let formData = new FormData();
                var para_temp=''
                console.log(this.script.parameter)
                for(var i =0;i<this.script.parameter.length;i++){
                	para_temp+=this.script.parameter[i].value+'))'
                }
                console.log(para_temp)

                formData.append('script_id', theID[theID.length-1]);
                formData.append('language',this.script.language);
                formData.append('parameters',para_temp)
                formData.append('mode',0)
                var status=0
                var user_ID=''
           		var arr1=document.cookie.match(new RegExp("(^| )"+"user_status"+"=([^;]*)(;|$)"))
				var arr2=document.cookie.match(new RegExp("(^| )"+"user_ID"+"=([^;]*)(;|$)"))
				if(arr1!=null){
					status=arr1[2]
				}
				if(arr2!=null){
					user_ID=arr2[2]
				}
           		if(status==1){
           			formData.append('user_id',user_ID);
           		}
           		console.log(formData)
                this.$http.post(url, formData).then((response)=>{
                	this.runAlert="success"
                	console.log(response)
                })
            	}else{
            		this.runAlert="Please login"
            	}
        		//todo 分类执行脚本（根据styleSelected的内容）
        	},
        	close(){
        		this.$refs.popup3.style.visibility = 'hidden';
        		this.$refs.popup3.style.opacity = 0;
        		console.log('close')
        	},
        	loveit(){
				
				//关注贴吧
				if(this.alreadyLoved == false){
					var user_status = document.cookie.match(new RegExp("(^| )"+"user_status"+"=([^;]*)(;|$)"));
					if(user_status!=null&&user_status[2]==1){
					var url = "http://211.159.186.183/model/user.php";
					let formData = new FormData();
					var user_ID = document.cookie.match(new RegExp("(^| )"+"user_ID"+"=([^;]*)(;|$)"))[2];

					formData.append('user_id',user_ID)
					var theID=window.location.href.split('/');
					console.log(theID[theID.length-1])
					formData.append('script_id', theID[theID.length-1]);//测试
					formData.append('mode',5)
					this.$http.post(url, formData).then((response)=>
					{
						console.log(response)
					})
					this.script.love += 1;
					this.alreadyLoved = true;
					console.log('喜欢该脚本');
					}else{
					this.operationAlert = 'Please Login';

					}
				}else{
					this.operationAlert = 'You already LOVE this script';
				}
			}, 
			
			//发表主题帖
			submitComment(){
			var url = "http://211.159.186.183/model/script.php";
			var user_status=document.cookie.match(new RegExp("(^| )"+"user_status"+"=([^;]*)(;|$)"))
			if(user_status!=null&&user_status[2]==1){
			var user_ID=document.cookie.match(new RegExp("(^| )"+"user_ID"+"=([^;]*)(;|$)"))[2]
			let formData = new FormData();
			console.log("第一次")
			var theID=window.location.href.split('/');
			console.log(theID[theID.length-1]);
			//formData.append('scriptID', theID[4]);//添加ID
			formData.append('mode', 2);//mode2 新加了一个查询最新insertid的功能
			formData.append('script_id', theID[theID.length-1]);//测试
			formData.append('user_id',user_ID)
			formData.append('comment',this.title_te)
			formData.append('thread_content',this.comment_te)
			var temp_l=[]
			if(this.comment_te!=""){
			this.$http.post(url, formData).then((response)=>
			{
				console.log(response.body.username)
				console.log(response.body.time)
				console.log("我是空的吗")
				
				console.log(response.body)
				console.log(response.body.thread_id[0]["LAST_INSERT_ID()"])
				console.log(this.comment_te)

				if(response.body!=null){//刚发帖不刷新不重新post 页面上就出现
				this.submitAlert="commit success"

				

				var curthreadid
				this.script.comment.unshift({author: response.body.username, time: response.body.time, 
				title: this.title_te,content:this.comment_te,threadid:response.body.thread_id[0]["LAST_INSERT_ID()"]})
				}

				else{
				this.submitAlert="Commit failed"

				}
				this.comment_te=''

			})
			}else{
				this.submitAlert="Please input something"
			}
		       }else{
		       	this.submitAlert="Commit failed,please login"
		       }
		        },
        	report(){
        		var url = "http://211.159.186.183/model/script.php";
        		var user_status=document.cookie.match(new RegExp("(^| )"+"user_status"+"=([^;]*)(;|$)"))
        		if(user_status!=null&&user_status[2]==1){
        		var arr2=document.cookie.match(new RegExp("(^| )"+"user_ID"+"=([^;]*)(;|$)"))
				let formData = new FormData();
				formData.append('user_id',arr2[2])
				var theID=window.location.href.split('/');
				formData.append('script_id', theID[theID.length-1]);//测试
				formData.append('mode',4)
				this.$http.post(url, formData).then((response)=>
				{
				console.log(response)
				})
        		}
        		
        		//todo 传消息给管理员
        		console.log("report");
        	},
        	giveScore(rank){
        		//todo 数据传给数据库
        		if(this.alreadyScored == false){
	        		if (rank == 0){
	        			this.script.rating.good += 1;
	        		}else if(rank == 1){
	        			this.script.rating.ok += 1;
	        		}else if(rank == 2){
	        			this.script.rating.bad += 1;
	        		}
	        		this.alreadyScored = true;
	        		this.scoreAlert = "success"
	        	}else{
	        		this.scoreAlert = "already give a score"
	        	}
	        	//todo 停一会去掉alert
        		console.log("give score");
        	}

        },beforeMount: function(){
			var url = "http://211.159.186.183/model/script.php";
			//url="http://120.76.197.133/model/script.php";
			let formData = new FormData();
			var arr1=document.cookie.match(new RegExp("(^| )"+"user_status"+"=([^;]*)(;|$)"))
			var arr2=document.cookie.match(new RegExp("(^| )"+"user_ID"+"=([^;]*)(;|$)"))
			var islog=0
			var user_ID=''
			if(arr1!=null){
				islog=arr1[2]
				console.log(islog)
			}
			if(arr2!=null){
				user_ID=arr2[2]
			}
			console.log("第一次")
			var theID=window.location.href.split('/');
			formData.append('script_id', theID[theID.length-1]);//测试
			formData.append('mode', 0);//测试
			console.log("我是发送")
			console.log(formData.getAll("script_id"))
			if(islog==1){
				formData.append('user_id', user_ID);
			}
			console.log(islog)
			var temp_l=[]
		this.$http.post(url, formData).then((response)=>
		{
			console.log("我是回复")
			
			console.log(response.body)
			var temp_comment=[]
			this.script.title=response.body.script.scriptTitle;
			this.script.author=response.body.script.username;
			this.script.shortDes=response.body.script.scriptIntro;
			this.script.createdDate=response.body.script.createTime;
			this.script.updatedDate=response.body.script.updateTime;
			this.script.totalRunnings=response.body.script.clickCount;
			//this.script.language=response.body.script.scriptlanguage;
			this.script.look=response.body.script.clickCount;
			this.script.love=response.body.script.score;
			this.script.comment=response.body.comments.length
			this.script.dailyRunnings=response.body.script.usageCount;
			this.script.desciption=response.body.script.scriptIntro
			var temp_ar=response.body.parameters

			if(temp_ar!=null)
			{
			for(var i=0;i<temp_ar.length;i++){
				this.script.parameter.push({name:temp_ar[i].name,usage:temp_ar[i].description})
			}
			}
			if(response.body.is_scored!=null){
				if(response.body.is_scored==1){
					this.alreadyLoved=true
				}
			}
			for(var i =0;i<response.body.comments.length;i++){
			temp_comment.push({author: response.body.comments[i].username, time: response.body.comments[i].postTime, 
				title: response.body.comments[i].userComment,threadid:response.body.comments[i].commentID,
				content:response.body.comments[i].thread_content})
			}
			this.script.comment=temp_comment
			console.log(response)

		})            
		}//beforeMount结束           
    }
</script>

<style type="text/css">
	.script {
        height: auto;
        width: 100%;
        position: absolute;
        border: none;
/*        background-color: #fff;*/
    }
    .script .script-inner {
    	position: relative;
    	top: 20px;
        max-width: 1012px;
        height: 100%;
        margin: 0 auto;
        border-radius: 3px;
    	box-shadow: 0 2px 3px 0px rgba(0, 0, 0, 0.2), 0 0px 2px 0 rgba(0, 0, 0, 0.24);
    	background-color: #fff;
    	margin-bottom: 12px;
    }

	.script .script-header {
	    border-bottom: 1px solid #e8e8e8;
	    border-radius: 3px 3px 0 0;
	    border-top: 1px solid #fff;
	    height: auto;
	    margin: auto;
	    padding: 20px 25px 0;
	}
    .script .script-header h1 {
	    margin-top: 0px;
	    font-size: 32px;
	    font-weight: 600;
	    color: #262626;
	    margin-block-end: 0.1em;
	}

	.script .script-header p {
		margin-top: 0px;
    	color: dimgray;
	}

	.script .script-header .script-icons {
		margin-bottom: 12px;
	}

	.script .script-header .script-icons span {
	    border-right: 1px solid #e8e8e8;
	    display: inline-block;
	    height: 20px;
	    line-height: 20px;
	    margin-right: 10px;
	    padding-right: 10px;
	}

	.script .script-header .script-icons i {
		display: inline-block;
		font-size: inherit; 
		font: normal normal normal 14px/1 FontAwesome;
		-webkit-font-smoothing: antialiased;
	    -moz-osx-font-smoothing: grayscale;
	    transform: translate(0, 0);
	    padding-right: 5px;
	}

	.script-feedback{
		margin-top: 20px;
		margin-left: 22px;
	}

	.script-run {
		width: 380px;
		height: 85px;
		margin-top: 25px;
		margin-left: 22px;
	}

	.script .script-inner h3 {
		margin-block-start: 10px;
		margin-block-end: 15px;
	}

	.script .script-inner h5 {
		margin-block-start: 10px;
		margin-block-end: 15px;
		font-size: 14px;
	}

/*	.script-run h3 {
		padding-left: 3px;
		margin-block-start: 10px;
		margin-block-end: 10px;

	}*/

	.select-run-style {
		width: 180px;
		margin-top: 10px;
		float: left;
	}
	.run-button {
        margin-top: 10px;
        text-align: center;
        color: #fff;
        background-color: #5cb85c;
        border-color: #4cae4c;
        font-size: 14px;
        font-weight: 400;
        line-height: 30px;
        white-space: nowrap;
        vertical-align: middle;
        -webkit-transition: all 0.3 ease;
        transition: all 0.3 ease;
        cursor: pointer;
        float: right;
        width: 180px;
        height: 38px; 
        touch-action: manipulation;
    	cursor: pointer;
    	border: 1px solid transparent;
    	border-radius: 4px;  
    }

    .run-button:hover {
        background: rgb(68, 157, 68);
    }


	.script-info {
    	max-width: 800px;
    	padding-top: 20px;
	}

	.inline-script-stats {
	    -moz-column-count: 2;
	    -webkit-column-count: 2;
	    column-count: 2;
	}
	.inline-script-stats dt {
	    clear: left;
	    font-weight: 600;
	    text-align: right;
	    padding-right: 1em;
	}
	.inline-script-stats, .inline-script-stats dt, .inline-script-stats dd {
	    vertical-align: top;
	    margin: 0;
	    /*padding: 0;*/
	    font-size: 16px;
	}
	.inline-script-stats dt, .inline-script-stats dd {
	    float: left;
	    width: 50%;
	    box-sizing: border-box;
	    overflow-wrap: break-word;
	}

	.good-rating-count {
	    background-color: rgba(51,155,51,0.1);
	    border-color: rgba(51,155,51,0.3);
	    color: #1E971E;
	    color: #339b33;
	}
	.ok-rating-count {
	    background-color: rgba(155,155,0,0.1);
	    border-color: rgba(155,155,0,0.3);
	    color: #a80;
	    color: #9b9b00;
	}
	.bad-rating-count {
	    background-color: rgba(155,51,51,0.1);
	    border-color: rgba(155,51,51,0.3);
	    color: #9b3333;
	}
	.good-rating-count, .ok-rating-count, .bad-rating-count {
	    display: inline-block;
	    min-width: 1em;
	    text-align: center;
	    padding: 0 0.25em;
	    border: 1px solid #DDDDDD;
	    border-radius: 10px;
	}

	.script-description {
		margin-left: 22px;
		margin-right: 22px;
	}

	.script-description .content {
    	background-color: #fafafa;
	}

	.script-parameter {
		margin-top: 20px;
		margin-left: 22px;
/*		margin-bottom: 30px;*/
	}

	.script table {
	    background-color: transparent;
	    border-collapse: collapse;
	    border-spacing: 0;

	}
	.script tbody {
	    display: table-row-group;
	    vertical-align: middle;
	    border-color: inherit;
	}
	.script tr {
	    display: table-row;
	    vertical-align: inherit;
	    border-color: inherit;
	}
	.script td {
	    border: 1px solid #ddd;
	    padding: 5px 10px;
	}
	.script table tr td:first-child {
	    background: #fafafa;
	    width: 150px;
	}
	.script td, th {
	    display: table-cell;
	    vertical-align: inherit;
	}
	.script .script-comment{
		margin-top: 20px;
		margin-left: 22px;
		margin-right: 22px;
	}

	.script .script-comment h3 {
		border-bottom: 1px solid #eee;
	}

	.script .script-comment li {
		padding-left: 0px;
		padding-top: 10px;
		padding-bottom: 15px;
		border-bottom: 1px solid #eee;
	}
	.script .script-comment .comment-detail {
		font-size: 20px;
    	line-height: 1.6;
    	margin-bottom: 6px;
	}

	.script .script-comment .zhuticontent{
		font-size: 15px;
    	line-height: 1.6;
    	margin-bottom: 6px;
	}
	.script .script-comment .publish {
		font-family: inherit;
	    font-weight: 500;
	    line-height: 1.1;
	    font-size: 12px;
	   	color: #9c9c9c;
	}

	.script .script-comment img {
		    width: 48px;
    vertical-align: top;
        max-width: 100%;
    max-height: 100%;
    border-radius: 4px;
	}
	.script .script-comment .comment-input textarea {
    	height: 195px;
    	border-radius: 0;
    	display: block;
    	width: 97.5%;
    	padding: 4px 12px;
    	font-size: 18px;
	    color: #555;
	    background-color: #fff;
	    border: 4px solid #ccc;
	    border-radius: 4px;
	}

	.script .script-comment .title-input textarea {
    	height: 30px;
    	border-radius: 0;
    	display: block;
    	width: 97.5%;
    	padding: 4px 12px;
    	font-size: 18px;
	    color: #555;
	    background-color: #fff;
	    border: 4px solid #ccc;
	    border-radius: 4px;
	}

	.script .script-comment .comment-submit {
		margin-top: 15px;
		margin-bottom: 30px;
		font-weight: 700;
	    color: #fff;
	    background-color: #4f83c3;
	    display: inline-block;
	    font-weight: normal;
	    text-align: center;
	    vertical-align: middle;
	    -ms-touch-action: manipulation;
	    touch-action: manipulation;
	    cursor: pointer;
	    background-image: none;
	    border: 1px solid transparent;
	    white-space: nowrap;
	    padding: 6px 12px;
	    font-size: 14px;
	    line-height: 1.42857143;
	    border-radius: 4px;
	    -webkit-user-select: none;
	    -moz-user-select: none;
	    -ms-user-select: none;
	    user-select: none;
	}

	.script .script-comment .comment-submit:hover{
		background-color: rgb(57, 106, 166);
	}

	.script .script-comment .row {
		margin-left: 70px;
	}

	.script .script-comment .people {
		float: left;
	}

	.script .script a {
		color: #3b5998;
	}


	.script .alert {
		color: red;
		position: relative;
		/*top: -5px;*/
		top: 4px;
		left: 8px;
	}

	.popup .content button{
		/*background-color: #28a745;*/
		width: 53px;
		height: 25px;
		border: none;
		cursor: pointer;
		border: 1px solid #d1d5da;
        border-radius: 3px;
        margin-bottom: 10px;
	}

	.script .popup .content .good.{
		background-color: rgba(51,155,51,0.1);
	    color: #1E971E;
	    color: #339b33;
	}

	.script .popup .content .ok {
		margin-left: 30px;
	    background-color: rgba(155,155,0,0.1);
	    color: #a80;
	    color: #9b9b00;
	}

	.script .popup .content .bad {
		margin-left: 30px;
	    background-color: rgba(155,51,51,0.1);
	    color: #9b3333;
	}

    .script .popup .content-2 label {
        display: block;
        margin-bottom: 7px;
        font-weight: 600;
        font-size: 15px;
    }

	.script .popup .content-2 input {
        box-sizing: border-box;
        margin-top: 5px;
        height: 28px;
        margin-bottom: 10px;
        display: block;
        width: 100%;
        min-height: 34px;
        padding: 6px 8px;
        line-height: 18px;
        color: #24292e;
        border: 1px solid #d1d5da;
        border-radius: 3px;
        // outline: none;
        box-shadow: inset 0 1px 2px rgba(27,31,35,0.075);
    }
    .script .popup .button {
        margin-top: 5px;
        text-align: center;
        text-transform: uppercase;
        color: #fff;
        background-image: linear-gradient(-180deg, #34d058 0%, #28a745 90%);
        background-color: #28a745;
        padding: 3px 12px;
        font-size: 14px;
        font-weight: 600;
        line-height: 20px;
        white-space: nowrap;
        vertical-align: middle;
        -webkit-transition: all 0.3 ease;
        transition: all 0.3 ease;
        cursor: pointer;
    }



.script .overlay {
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
.script .overlay:target {
  visibility: visible;
  opacity: 1;
}

.script .popup {
  margin: 140px auto;
  padding: 20px;
  background: #fff;
  border-radius: 5px;
  width: 45%;
  position: relative;
  transition: all 5s ease-in-out;
}

.script .popup h2 {
  margin-top: 0;
  color: #333;
  font-family: Tahoma, Arial, sans-serif;
}
.script .popup .close {
  position: absolute;
  top: 20px;
  right: 30px;
  transition: all 200ms;
  font-size: 30px;
  font-weight: bold;
  text-decoration: none;
  color: #333;
}
.script .popup .close:hover {
  color: #06D85F;
}
.script .popup .content {
  max-height: 50%;
  overflow: auto;
}

.script .popup .content-3 .repeat-time {
        box-sizing: border-box;
        margin-top: 5px;
        height: 28px;
        margin-bottom: 10px;
        min-height: 34px;
        padding: 6px 8px;
        line-height: 18px;
        color: #24292e;
        border: 1px solid #d1d5da;
        border-radius: 3px;
        // outline: none;
        box-shadow: inset 0 1px 2px rgba(27,31,35,0.075);
}

.script .popup .content-3 label {
	display: block;
    margin-bottom: 7px;
    font-weight: 600;
}

.script .popup .content-3 .select-interval{
    width: 187px;
}

.script .popup .button{
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


@media screen and (max-width: 700px){
  .box{
    width: 70%;
  }
  .popup{
    width: 70%;
  }
}

/*	.script-description h3 {
		margin-left: 22px;
		margin-block-end: 1em;
	}*/

</style>