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

			

			<div class="script-info">
				<!-- <h3>Script Information</h3> -->
				<dl class="inline-script-stats">
					<dt class="script-show-author"><span>楼主</span></dt>
					<dd class="script-show-author"><span><a href="/people/id">{{script.author}}</a></span></dd>
					<!-- 上面一行超链接需要修改！ -->
					
					
					
					
					
					
					<dt class="script-show-created-date"><span>发表于</span></dt>
					<dd class="script-show-created-date"><span>{{script.createdDate}}</span></dd>
					<dt class="script-show-updated-date"><span>最后回复于</span></dt>
					<dd class="script-show-updated-date"><span>{{script.updatedDate}}</span></dd>
					<dt class="script-show-created-date"><span>来自于</span></dt>
					<dd class="script-show-created-date"><span>{{script.tiebaname}}</span></dd>

				</dl>
			</div>

			

			<div class="script-description">
				<h3>标题</h3>
				<div class="content">{{script.desciption}}</div>
			</div>

			

			<div class="script-comment" id="jumpToComment">
			    <h3>全部回复</h3>
				<ul style="list-style: none;">





					 
					<li v-for="(item, index) in script.firstcomment">
						<a class='people' href="javascript:">
							<!-- todo 跳转到个人主界面 + 个人头像URL 一楼 没有回复按钮-->
                            <img src="../components/people_big.png"/>
                        </a>
						

			            <div class="row">
							
			                <div  class="tiezi-detail" >
								
								{{item.content }}

								
								
							</div>
							 

			                
							<span class="publish"><a href="">{{item.author}}</a> published at {{item.time}}  </span>

							<span class="cssoffloor">{{item.floornum}}楼 </span>





							

							

			            </div>
			        </li>












					<li v-for="(item, index) in script.comment">
						<a class='people' href="javascript:">
							<!-- todo 跳转到个人主界面 + 个人头像URL-->
                            <img src="../components/people_big.png"/>
                        </a>
						

			            <div class="row">
							
			                <div  class="tiezi-detail" >
								
								{{item.content }}
								
							</div>
							 

			                
							<span class="publish"><a href="">{{item.author}}</a> published at {{item.time}}  </span>

							<span class="cssoffloor">{{item.floornum}}楼 </span>

							<span v-if="showReply[item.floornum-2][item.floornum]==true" 
							class="cssofhuifu"  @click="replythisfloor(item.floornum,item.tieziid)" >收起回复  </span>


							<span v-if="!showReply[item.floornum-2][item.floornum]==true" 
							class="cssofhuifu"  @click="replythisfloor(item.floornum,item.tieziid)" >回复  </span>
							
							<span v-if="showReply[item.floornum-2][item.floornum]==true" >
							<textarea v-model="reply_te" ></textarea>
		        			<button @click="submitreply(item.floornum,item.tieziid,item.userid)" class="comment-submit">回复层主</button>
							</span>














						<ul style="list-style: none;"> <!--楼中楼开始-->


									<li v-for="(item, index) in fakecomment[item.floornum-2]">

										
										<a class='peopleoflouzhonglou' href="javascript:" >
											
											<img src="../components/people_big.png"  />
										</a>
										

										<div class="row">
											
											<div  class="tiezi-detailoflouzhonglou2" >
												
												{{item.content }}
												
											</div>
											

											
											<span class="publishoflouzhonglou2"><a href="">{{item.author}}</a> published at {{item.time}}  </span>

											

											
											
											


											

										</div>
									</li>
								</ul>                        <!--楼中楼结束-->










							

			            </div>
			        </li>

				</ul>
				<!-- todo 非登录状态无法评论 需要知道用户是否登录然后以此来弹框 -->
			    <!-- <div style="text-align: right;"></div> -->

		        
				<textarea class="comment-input" rows="5" v-model="comment_te"></textarea>
		        <button @click="submitComment" class="comment-submit">SUBMIT</button>
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
				theone:false,
				showReply:[],
				curshowreply:[],
            	date: '2018-12-27 16:30',
            	repeatTime: 1,
            	options: ['normal', 'fixed time', 'repeat'],
            	options1: ['1 minute', '30 minutes', '1 hour'],
            	styleSelected: 'normal',
				intervalSelected: '1 minute',
				fakecomment:[],
            	script: {title: '', shortDes: '', look: 120, comment: 0, love:20, author: '', lzid:'',dailyRunnings:2, totalRunnings:0, language: '', rating:{good:6, ok:0, bad:0}, version: '1.0', createdDate:'', tiebaname:'',updatedDate: '',
					parameter: [],
					firstcomment:[],
					comment:[],
					
					
            		desciption:"我正在努力加载ing"
            	},
            	submitAlert: '', 
            	alreadyLoved: false,
            	alreadyScored: false,
            	operationAlert: '',
            	scoreAlert: '',
            	runAlert: '',
				comment_te: '',
				reply_te:''
            	//todo 有一个问题 本来想着在description支持markdown 但是用引号包住它会有问题 如何解决？
            }
        },
        methods: {


			replythisfloor(floornum,tienum){
				console.log("我要回复的是"+floornum+"楼"+"帖子ID是"+tienum)

				
				
				
				this.showReply[floornum-2][floornum]=!this.showReply[floornum-2][floornum];
				console.log(this.showReply)
				console.log(this.showReply[floornum-2][floornum])
				

				
				

			},

			

			submitreply(floornum,tiezinum,id){  //回复楼中楼
			console.log(floornum,tiezinum,id);
			var url = "http://sornhub.com/model/thread.php";
			var user_status=document.cookie.match(new RegExp("(^| )"+"user_status"+"=([^;]*)(;|$)"))
			if(user_status!=null&&user_status[2]==1){
			var user_ID=document.cookie.match(new RegExp("(^| )"+"user_ID"+"=([^;]*)(;|$)"))[2]
			let formData = new FormData();
			console.log("第一次")
			var theID=window.location.href.split('/');
			console.log(theID[theID.length-1]);
			//formData.append('scriptID', theID[4]);//添加ID
			formData.append('mode', 2);//测试
			formData.append('reply_id',tiezinum );
			formData.append('comment_id', theID[theID.length-1]);//测试
			formData.append('user_id',user_ID)
			formData.append('replyedu_id',id)
			formData.append('louzhu',this.script.lzid)
			formData.append('tiezi',this.reply_te)
			//var newreply_te="回复"+floornum+"楼: "+this.reply_te
			//formData.append('tiezi',newreply_te)
			var temp_l=[]
			if(this.reply_te!=""){
			this.$http.post(url, formData).then((response)=>
			{
				console.log(response.body.username)
				console.log(response.body.time)
				console.log("我是空的吗")
				console.log(response.body)
				console.log(this.reply_te)
				if(response.body!=null){
				this.submitAlert="commit success"
				
				var curfloornum=this.script.comment.length
				//console.log("这里是curfloornum")
				//console.log(curfloornum)
				//this.script.comment.push({author: response.body.username, time: response.body.time, content: this.reply_te,floornum:curfloornum+2})
				//回复成功立刻出现在画面上 但是超链接的id是不对的所以


				//this.script.comment.push({author: response.body.username, time: response.body.time, content: this.reply_te,floornum:curfloornum+2,
				//tieziid:response.body.tiezi_id[0]["LAST_INSERT_ID()"],userid:parseInt(user_ID)})

				


				var curarr2=this.fakecomment[floornum-2];
				

				curarr2.push({author: response.body.username, time: response.body.time, content: this.reply_te,floornum:0,
				tieziid:response.body.tiezi_id[0]["LAST_INSERT_ID()"],userid:parseInt(user_ID)})

				

				var amap={};
				amap[curfloornum+2]=false;
				this.showReply.push(amap); //很重要的一段


				console.log(this.script.comment)
				
				}
				else{
				this.submitAlert="Commit failed"

				}
				this.reply_te=''

			})
			}else{
				this.submitAlert="Please input something"
			}
		       }else{
		       	this.submitAlert="Commit failed,please login"
		       }
		        },
       	       	
			submitComment(){
			var url = "http://sornhub.com/model/thread.php";
			var user_status=document.cookie.match(new RegExp("(^| )"+"user_status"+"=([^;]*)(;|$)"))
			if(user_status!=null&&user_status[2]==1){
			var user_ID=document.cookie.match(new RegExp("(^| )"+"user_ID"+"=([^;]*)(;|$)"))[2]
			let formData = new FormData();
			console.log("第一次")
			var theID=window.location.href.split('/');
			console.log(theID[theID.length-1]);
			//formData.append('scriptID', theID[4]);//添加ID
			formData.append('mode', 1);//测试
			formData.append('comment_id', theID[theID.length-1]);//测试
			formData.append('user_id',user_ID)
			formData.append('tiezi',this.comment_te)
			formData.append('louzhu',this.script.lzid)
			var temp_l=[]
			if(this.comment_te!=""){
			this.$http.post(url, formData).then((response)=>
			{
				console.log(response.body.username)
				console.log(response.body.time)
				
				console.log(response.body.tiezi_id[0]["LAST_INSERT_ID()"])
				
				console.log(this.comment_te)
				if(response.body!=null){
				this.submitAlert="commit success"
				
				var curfloornum=this.script.comment.length
				//console.log("这里是curfloornum")
				//console.log(curfloornum)
				this.script.comment.push({author: response.body.username, time: response.body.time, content: this.comment_te,floornum:curfloornum+2,
				tieziid:response.body.tiezi_id[0]["LAST_INSERT_ID()"],userid:parseInt(user_ID)})
				//回复成功立刻出现在画面上 但是超链接的id是不对的所以
				
				var amap={};
				amap[curfloornum+2]=false;
				this.showReply.push(amap); //新发表的暂时不能回复

				/*
				document.cookie="justthread"+"="+theID[theID.length-1]

				this.$router.replace({
                path:'/forjump',
                name:'forjump'
				})
				*/
				
				
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
        	
        	

        },beforeMount: function(){

			/*
			this.$root.Bus.$on('eventofthread',value=>{
                this.script.comment=value
			})
			*/


            var url = "http://sornhub.com/model/thread.php";
			let formData = new FormData();
			
		
			
			console.log("第一次啊啊啊啊啊啊啊啊啊啊啊啊")
			var theID=window.location.href.split('/');
			
			formData.append('comment_id', theID[theID.length-1]);//测试
			formData.append('mode', 0);//测试
			
			
			var temp_l=[]
		this.$http.post(url, formData).then((response)=>
		{
			console.log("我是回复来来来")
			console.log(response.body)
			this.script.desciption=response.body.comments[0].userComment
			
			this.script.author=response.body.comments[0].username
			this.script.createdDate=response.body.comments[0].postTime
			this.script.tiebaname=response.body.comments[0].scriptTitle
			this.script.lzid=response.body.comments[0].userID
			var first_comment=[]
			var temp_comment=[]

			first_comment.push({author:this.script.author,time:this.script.createdDate,
			floornum:1,content:response.body.comments[0].thread_content})
			
			this.script.firstcomment=first_comment

			var _this=this;
			var thisfake=[];
			var yingshe={};
			for(var i =response.body.huifu.length-1;i>=0;i--){  //倒着循环 正好符合php返回的倒序

			if(response.body.huifu[i].commentType==0)
			{
				console.log("我是ok的"+i)
			temp_comment.push({author: response.body.huifu_user[i], userid:response.body.huifu[i].userID, time: response.body.huifu[i].postTime, 
				content: response.body.huifu[i].userComment,tieziid:response.body.huifu[i].tieziID,floornum:temp_comment.length+2})
			var amap={};
			amap[response.body.huifu.length-i+1]=false;
			this.showReply.push(amap);

			yingshe[response.body.huifu[i].tieziID]=temp_comment.length+1;
			var zilou=[];
			thisfake.push(zilou);
			}
			else if(response.body.huifu[i].commentType==1)
			{
				

			}


			
			}//for 结束

			this.fakecomment=thisfake;
			console.log("看这里")
			console.log(this.fakecomment)
			console.log(yingshe)

			for(var i =response.body.huifu.length-1;i>=0;i--){  //倒着循环 正好符合php返回的倒序

			if(response.body.huifu[i].commentType==0)
			{
				
			}
			else if(response.body.huifu[i].commentType==1)
			{	

				
				var fatherid=response.body.huifu[i].notify_cz_tiezi_id;
				var fatherfloor=yingshe[fatherid];
				console.log(fatherfloor)

				
				
				var curarr=this.fakecomment[fatherfloor-2];
				console.log("世界聚焦于你")
				console.log(curarr)
				
				console.log(typeof(curarr))

				curarr.push({author: response.body.huifu_user[i],userid:response.body.huifu[i].userID, time: response.body.huifu[i].postTime,
				content:response.body.huifu[i].userComment,tieziid:response.body.huifu[i].tieziID,floornum:0}); 
								//这里居然能改变this.fake的值 应该是浅复制 而且居然改变了529行的输出 
			
				
				
				

			}


			
			}//for 结束













			console.log(temp_comment)
			this.script.comment=temp_comment

			console.log("刚初始化")

			console.log(this.script.comment)
			console.log(this.fakecomment)
		
		})            
		},//beforeMount结束    
		
		

		/*
		beforeDestory(){
            this.$root.Bus.$off('eventofthread')
		},*/
		//上一个监听 是vheader组件传给list组件  这里都在thread组件里 
    }
</script>

<style type="text/css">
	.script {
        height: auto;
        width: 100%;
       
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
	.script .script-comment .tiezi-detail {
		padding-top: 30px;
		padding-bottom: 30px;
		font-size: 15px;
    	line-height: 1.6;
    	margin-bottom: 6px;
	}

	.script .script-comment .tiezi-detailoflouzhonglou {
		padding-top: 10px;
		padding-bottom: 0px;
		font-size: 10px;
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

	.script .script-comment .publishoflouzhonglou {
		font-family: inherit;
	    font-weight: 500;
	    line-height: 1.1;
	    font-size: 8px;
	   	color: #9c9c9c;
	}

	.script .script-comment .cssoffloor {

		display: flex;
   		padding-left: 500px;
		font-family: inherit;
	    font-weight: 500;
	    line-height: 1.1;
	    font-size: 12px;
	   	color: #9c9c9c;
	}

	.script .script-comment .cssofhuifu {

		display: flex;
   		padding-left: 500px;
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
	.script .script-comment textarea {
    	height: 95px;
    	border-radius: 0;
    	display: block;
    	width: 97.5%;
    	padding: 4px 12px;
    	font-size: 18px;
	    color: #555;
	    background-color: #fff;
	    border: 1px solid #ccc;
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

	.script .script-comment .peopleoflouzhonglou {
		margin-left: 70px;
		margin-bottom: 70px;
		
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