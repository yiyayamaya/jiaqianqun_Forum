<template>
    <!-- 已废弃 -->
    <div class="new">
        <div class="new-inner">
            <div class="new-header">
                <h1>创建新贴吧</h1>
                <p>半数核心成员审核通过即可创建成功哦</p>
            </div>
            <div class="project-info">
                <div class="project-name-box">
                    <label for="">贴吧名</label>
                    <input type="text" class="project-name" v-model="projectName"/>
                </div>
                <!--
                <div class="project-lang-box">
                    <label for="">分区</label>
                    <v-select class="select-language" v-model="langSelected" v-on:input="selectLanguage(langSelected)" :options="options2" style="margin-top: 8px;"></v-select>
                </div>
                -->
                <div class="project-desc-box">
                    <label>吧简介</label>
                    <textarea class="project-desc" rows="5" v-model="projectDesc"></textarea>
                </div>




              

                <input @click="createProject" type="button" class="button" value="申请创建"/>

            </div>

            <div ref="popup" class="overlay" style="">
                <div class="popup">
                    <h2>Create project</h2>
                    <div class="content">
                        <a class="close" href="javascript:" @click="close">&times;</a>
                        <span class="alert" v-if="createStatus">Already success to create! Do you want to view this project ?</span>
                        <span class="alert" v-else>fail to create ! Please create again !</span>
                    </div>
                    <div class="button-container">
                        <button @click="toPages(true)">sure, I want</button>
                        <button @click="toPages(false)" id="right-button">no, thanks</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script type="text/javascript">
    import vSelect from './Select'
    import upload from './upload/upload'

    export default {
        name: 'add',
        components: {
            vSelect:vSelect,
            Upload:upload,
        },
        data() {
            return {
                file: null,
                loadingStatus: false,
                projectName: '',
                projectDesc: '',
                langSelected: 'Python',
                options2: ['Ruby','Python','JavaScript','PHP','Perl'],
                paraCountAlert: 'no more than 6',
                createAlert: '',
                createStatus: true,
                paramterCount: 0,
                paranames: [],
                parausages: [],
                paraexamples: [],
                id: 0
            }
        },
        methods: {
            createProject(){
                var paraList = [];
                var success = false;
                //todo 新建工程 服务器添加文件夹 + 跳转到编辑器页面 页面特殊处理 编辑特定编号的脚本工程
                //数据接口已经准备好 但需要检查是否满足要求
                console.log(this.projectName);
                console.log(this.langSelected);
                console.log(this.file)
                console.log(this.projectDesc);  
                var para_test=[]
                if(this.projectName!=''&&this.projectDesc!=''){
                if(this.parameterCount==0){
                //todo 新建工程 服务器添加文件夹 + 跳转到编辑器页面 页面特殊处理 编辑特定编号的脚本工程
                var url = "http://sornhub.com/model/script.php";
                var user_ID=document.cookie.match(new RegExp("(^| )"+"user_ID"+"=([^;]*)(;|$)"))
                this.$http.options.emulateJSON = true;
                let formData = new FormData();
                console.log(user_ID[2])
                formData.append('mode', 1);
                formData.append('user_id',user_ID[2]);
                formData.append('title',this.projectName)
                formData.append('intro',this.projectDesc)
                formData.append('language',this.langSelected)
                formData.append('parameter_name','')
                //formData.append('upload_file',this.file)
                formData.append('parameter_intro','')
                formData.append('parameters','')
                this.$http.post(url, formData).then((response)=>{
                    if(response.body.status==0){
                    console.log('success')
                    this.createStatus = true;
                    this.$refs.popup.style.visibility = 'visible';
                    this.$refs.popup.style.opacity = 1;
                    this.id=response.body.script_id
                    }else{
                    this.createStatus = false;
                    this.$refs.popup.style.visibility = 'visible';
                    this.$refs.popup.style.opacity = 1;
                    }
                })
                console.log('create project success');
                }else{
                    var temp_j=true
                    for(var i=1; i<this.paramterCount+1;i++){
                    console.log(this.paranames[i]);
                    console.log(this.parausages[i]);
                    para_test.push(this.paraexamples)
                    if(this.paranames[i]==''||this.parausages[i]==''){
                        temp_j=false
                    }
                    }
                        if(temp_j){
                        var url = "http://sornhub.com/model/script.php";
                        var user_ID=document.cookie.match(new RegExp("(^| )"+"user_ID"+"=([^;]*)(;|$)"))
                        let formData = new FormData();
                        var temp_paranames=''
                        console.log(this.paranames)
                        for(var k=1;k<this.paramterCount+1;k++){
                            if(k!=this.parameterCount){
                            temp_paranames+=this.paranames[k]+'))'
                            }else{
                            temp_paranames+=this.paranames[k]
                            }
                        }
                        var temp_parausages=''
                        for(var k=1;k<this.paramterCount+1;k++){
                            if(k!=this.parameterCount){
                            temp_parausages+=this.parausages[k]+'))'
                            }else{
                            temp_parausages+=this.parausages[k]
                            }
                        }
                        var temp_para_test=''
                        for(var k=0;k<para_test.length;k++){
                            if(k!=para_test.length-1){
                            temp_para_test+=para_test[k]+'))'
                            }else{
                            temp_para_test+=para_test[k]
                            }
                        }
                        console.log(para_test.length)
                        console.log(user_ID[2])
                        formData.append('mode', 1);
                        formData.append('user_id',user_ID[2]);
                        formData.append('title',this.projectName)
                        formData.append('intro',this.projectDesc)
                        formData.append('parameter_name',temp_paranames)
                        formData.append('parameter_intro',temp_parausages)
                        formData.append('parameters',temp_para_test)
                        formData.append('upload_file',this.file)
                        formData.append('language',this.langSelected)
                        this.$http.post(url, formData).then((response)=>{
                            if(response.body.status==0){
                                console.log('创建成功')
                                this.id=response.body.script_id
                                this.createStatus = true;
                                this.$refs.popup.style.visibility = 'visible';
                                this.$refs.popup.style.opacity = 1;
                            }else{
                                this.createStatus = false;
                                this.$refs.popup.style.visibility = 'visible';
                                this.$refs.popup.style.opacity = 1;
                            }
                            console.log(response)
                        })

                        //this.$router.push({path:'/person'})
                        console.log('create project success');
                    }else{
                        this.createStatus = false;
                        this.$refs.popup.style.visibility = 'visible';
                            this.$refs.popup.style.opacity = 1;
                        console.log('Please finish the information1')
                    }
                }
                }
                else{
                    this.createStatus = false;
                    this.$refs.popup.style.visibility = 'visible';
                    this.$refs.popup.style.opacity = 1;
                    console.log('Please finish the information2')
                }               
                //至于上传的文件 是直接post给action地址 详见iview组件 upload解析
                if(success){
                }else{
                    this.createStatus = false;
                }

            },
            triggerUpload(){
                //点击区域触发上传文件
                this.$refs.upload.dispatchEvent(new MouseEvent('click'));
            },
            uploadFiles() {
                this.file = this.$refs.upload.files[0];
                console.log(this.file)
                return false;
            },
            upload () {
                this.loadingStatus = true;
                setTimeout(() => {
                    this.file = null;
                    this.loadingStatus = false;
                    this.$Message.success('Success')
                }, 1500);
            },close(){
                this.$refs.popup.style.visibility = 'hidden';
                this.$refs.popup.style.opacity = 0;
                console.log('close')
            },
            selectLanguage(data) {
                //console.log(this.file)
                //todo 根据 langSelected的文字筛选目前list中的语言
                console.log('langSelected！！！！！！！！');
                console.log(data);


                if(this.langSelected=='--')//这句并不会执行 一定会跳到else
                {
                    console.log('我不改cookie了');
                }
                else
                {
                     console.log('我改cookie了');
                   document.cookie="content_language"+"="+this.langSelected//加cookie
                }


                //vHeaderVue.methods.search();
                console.log("调用别人的方法");
                //console.log(vHeaderVue.methods.search());  
            },toPages(status){
                if(status&&this.createStatus){
                    //todo如果创建成功并且想要编辑 该编辑的id创建成功时后端返回
                    this.$router.push({path: `/edit/${this.id}`});
                }else if(status&&!this.createStatus){
                    //如果创建失败并且想要重新上传
                    this.close();
                }else {
                    //如果点击取消 跳回主页
                    this.$router.push('/');
                }
            }
        },beforeMount(){
            var arr1=document.cookie.match(new RegExp("(^| )"+"user_status"+"=([^;]*)(;|$)"))
            if(arr1==null||arr1[2]==0){
                this.$router.push('/login')
            }
        }
    }
</script>

<style>
    .new {
        height: auto;
        width: 100%;
       
        border: none;
    }
    .new .new-inner {
        position: relative;
        top: 20px;
        max-width: 1012px;
        height: 100%;
        margin: 0 auto;
/*        border-radius: 3px;
        box-shadow: 0 2px 3px 0px rgba(0, 0, 0, 0.2), 0 0px 2px 0 rgba(0, 0, 0, 0.24);*/
        background-color: #fff;
        margin-bottom: 12px;
    }
    .new .new-header {
        border-bottom: 2px solid #e8e8e8;
        height: auto;
        margin: 20px 25px 0;
    }
    .new .new-header h1 {
        margin-top: 0px;
        font-size: 32px;
        font-weight: 600;
        color: #262626;
        margin-block-end: 0.1em;
        padding-bottom: 4px;
    }

    .new .new-header p {
        margin-top: 0px;
        padding-top: -2px;
        margin-bottom: 7px;
        color: dimgray;
    }

    .project-info {
        margin: 22px;
    }

    .project-info label {
        display: block;
        margin-bottom: 7px;
        font-weight: 600;
    }
    .project-info .project-name, .names, .usages, .para, .examples {
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

    .project-info .project-name-box {
        float: left;
    }

    .project-info .project-lang-box {
        margin-left: 250px;
        max-width: 230px;
    }

    .project-info .project-desc-box {
         
         padding-top: 100px;
        margin-top: 15px;
        max-width: 250px;
    }

    .project-info .project-upload-box {
        max-width: 480px;
    }

    .project-upload-box input[type="file"] {
        opacity: 0;
    }

/*    .project-info .project-desc-box label {
        margin-left: 0px;
    }*/

    .project-info .project-desc {
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

    .project-info .button {
        margin-top: 12px;
        text-align: center;
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
    }
    .project-info .button:hover, .button:active, .button:focus {
        background: #43A047;
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
/*.overlay:target {
  visibility: visible;
  opacity: 1;
}*/

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
}

.popup .button-container button{
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

.popup #right-button{
    margin-left: 10px;
    background-image: linear-gradient(-180deg, #FF5722 0%, #F4511E 90%);
    background-color: #FF7043;
}
.ivu-upload-drag {
    background: #fff;
    border: 1px dashed #dcdee2;
    border-radius: 4px;
    text-align: center;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: border-color .2s ease;
}

.ivu-upload input[type=file] {
    /*display: none;*/
    align-items: baseline;
    color: inherit;
    text-align: start !important;
    -webkit-appearance: initial;
    background-color: initial;
    cursor: default;
    padding: initial;
    border: initial;
}

.ivu-upload input{
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
    margin: 0;
    padding: 0;
        overflow: visible;
            font-family: sans-serif;
    font-size: 100%;
    line-height: 1.15;
    margin: 0;
        text-rendering: auto;
    color: initial;
    letter-spacing: normal;
    word-spacing: normal;
    text-transform: none;
    text-indent: 0px;
    text-shadow: none;
    display: inline-block;
    text-align: start;
    margin: 0em;
    font: 400 13.3333px Arial;
        -webkit-writing-mode: horizontal-tb !important;
}
</style>