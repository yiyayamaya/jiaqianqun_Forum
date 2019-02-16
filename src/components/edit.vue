<template>
  <div class="edit">
    <div class="edit-inner">
      <div class="left-nav">
          <div class="header">
            <div id="container">
              <div id="project-icon">{{project.name.charAt(0)}}</div>
            </div>
            <div class="project-name">{{project.name}}</div>
          </div>
          <div class="icons">
            <div class="new-file">
              <div class="icon">
                <i class="icon-add"></i>
              </div>
              <span @click="newFile">New File</span>
            </div>
<!--             <div class="new-folder">
              <div class="icon">
                <i class="icon-add-folder"></i>
              </div>
              <span @click="newFolder">New Folder</span>
            </div> -->
            <div class="import">
              <div class="icon">
                <i class="icon-upload"></i>
              </div>

              <span @click="uploadFiles">
                <label class="upload" for="file">Import Files</label>
              </span>
            </div>
            <div class="submit">
              <div class="icon">
                <i class="icon-submit"></i>
              </div>
              <span style="cursor: pointer;" @click="pop">Publish</span>
            </div>

            <form><input type="file" id="file" name="upload_file" ref="file" style="position:absolute;clip:rect(0 0 0 0);" v-on:change="uploadFiles()" /></form>

            <div class="all-files">
              <div class="icon">
                <i class="icon-folder"></i>
              </div>
              <span>Files</span>
            </div>
          </div>

          <div class="tree-menu">
            <ul v-for="menuItem in project.structure">
              <myTree @bus='curEditFile' :model="menuItem"></myTree>
            </ul>
          </div>
      </div>
      <div class="edit-area">
      <div id="editor" class="editor">

        <div class="content">
            <div class="header">
              <!-- <i @click="editFileName" class="icon-edit"></i> -->
                <svg @click="editFileName" aria-hidden="true" class="octicon octicon-book" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M3 5h4v1H3V5zm0 3h4V7H3v1zm0 2h4V9H3v1zm11-5h-4v1h4V5zm0 2h-4v1h4V7zm0 2h-4v1h4V9zm2-6v9c0 .55-.45 1-1 1H9.5l-1 1-1-1H2c-.55 0-1-.45-1-1V3c0-.55.45-1 1-1h5.5l1 1 1-1H15c.55 0 1 .45 1 1zm-8 .5L7.5 3H2v9h6V3.5zm7-.5H9.5l-.5.5V12h6V3z"></path>
                </svg>
                <p style="padding-left: 8px">{{curFile.name}}</p>
                <div class="icon-box">
                  <i @click="deleteFile" class="icon-delete"></i>
                    <i @click="saveFile" class="icon-save"></i>
                </div>
            </div>
            <div class="content-inner">
              <!-- <textarea></textarea> -->
                <div id="pen" data-toggle="pen">
                    <pre ref="content"></pre>
                </div>
            </div>
        </div>
    </div>
      </div>

      <div ref="popup" class="overlay" style="">
        <!-- <div class="popup-outer"> -->
        <div class="popup">
          <h2><{{project.name}}></h2>
          <a class="close" href="javascript:" @click="close">&times;</a>
          <div class="content">
              <div class="version">
                <label>version</label>
                <input type="text" class="para-num" v-model="project.version"></input>
              </div>
              <div class="description">
                <label>description</label>
                <textarea class="project-desc" rows="5" v-model="project.description"></textarea>
              </div>
              <div class="parameter">
                <label>parameter count</label>
                <input type="text" class="para-num" v-model.number="paramterCount"></input>
                <span class="alert" v-if="paramterCount>6">no more than 6</span>
                <div class="parameter-list" v-if="paramterCount<=6">
                  <div v-for="n in paramterCount">
                    <label>parameter{{n}}</label>
                    <input class="names" type="text" placeholder="name of parameter" v-model="paranames[n]"></input>
                    <input class="usages" type="text" placeholder="usage of parameter" v-model="parausages[n]"></input>
                    <input class="examples" type="text" placeholder="examples of parameter" v-model="paraexamples[n]"></input>

                  </div>
                </div>
              </div>
              <input @click="publishProject" type="button" class="button" value="publish"/>
              <span class="publishalert">{{alert}}</span>
          </div>
        <!-- </div> -->
        </div>
      </div>

    </div>
  </div>
</template>
 
<script>
import myTree from './tree.vue'
// import hljs from '../common'
// import hljs from '../../src/common/js/highlight.js'
import axios from 'axios'
export default {
  name: 'edit',
  components: {
    myTree
  },
  mounted() {
      require('../common/js/pen.js')
      require('../common/js/markdown.js')
      this.$refs.content.innerHTML = 'write here...'
      this.init()
      this.pen.rebuild()
      this.pen.focus()
  },
  data () {
    return {
      file:'',
      curFile: '',
      alert: '',
      paramterCount: 0,
      paranames: [],
      parausages: [],
      paraexamples: [],
      language_re: '',
      // project: {name:"Default Project",structure: [{folder: false, name: "file1", path: "/Default Project"}]}, //如果是第一次添加就是默认
      //好难哇 这个structure得一直监听？？不然路径怎么定？？
      project: {name: "Music Search", description: "", version: '1.0',
      structure: [{
        folder: true,
        name: "animals",
        path: "/animals",
        children: [
          {
            folder: true,
            name: "cat",
            path: "/animals/cat",
            children: [
              {
                folder: true,
                name: "images",
                path: "/animals/cat/images",
                children: [
                  {
                    folder: false,
                    name: "cat001.jpg",
                    path: "/animals/cat/images/cat001.jpg"
                  }, {
                    folder: false,
                    name: "cat002.jpg",
                    path: "/animals/cat/images/cat002.jpg"
                  }
                ]
              }
            ]
          }
        ]
          },{
        folder: false,
        name: "file1.java",
        path: "/file1",
          },{
        folder: false,
        name: "file2.py",
        path: "/file2",
          }

        ]
      }
    }
  },

  methods: {
    editFileName() {
      console.log('修改文件名');
    },
    deleteFile() {
      var url = "http://120.76.197.133/model/edit.php";
      this.$http.options.emulateJSON = true;
      let formData = new FormData();
      var theID=window.location.href.split('/');
      formData.append('path',this.curFile.path)
      formData.append('script_id',theID[theID.length-1])
      formData.append('mode',4)
      this.$http.post(url, formData).then((response)=>{
        console.log(response)
        this.$router.go(0)
      })
      console.log('删除文件');
    },
    saveFile() {
      //todo 保存当前编辑的文件到服务器
      var url = "http://120.76.197.133/model/edit.php";
      this.$http.options.emulateJSON = true;
      let formData = new FormData();
      console.log(this.curFile.path)
      var theID=window.location.href.split('/');
      formData.append('language',this.language_re)
      formData.append('path',this.curFile.path)
      formData.append('content',this.$refs.content.innerText)
      formData.append('script_id',theID[theID.length-1])
      formData.append('mode',3)
      //parameter 需要修改
      formData.append('parameters','hello))hello')

      this.$http.post(url, formData).then((response)=>{
        if(response.body==0){
          //成功的通过测试
        }else{
          //没有通过测试
        }
        console.log(response)
      })
      console.log('保存文件');
    },
    curEditFile(data) {
      var url = "http://120.76.197.133/model/edit.php";
      this.$http.options.emulateJSON = true;
      let formData = new FormData();
      formData.append('mode',1)
      formData.append('path',data.path)
      this.$http.post(url, formData).then((response)=>{
      this.$refs.content.innerText = response.body
      })
      this.curFile = data;
    },
    // 初始化编辑器
    init() {
          const options = {
              // toolbar: document.getElementById('custom-toolbar'),
              editor: this.$refs.content,
              debug: true,
              list: [
                'insertimage', 'blockquote', 'h2', 'h3', 'p', 'code', 'insertorderedlist', 'insertunorderedlist', 'inserthorizontalrule','indent', 'outdent', 'bold', 'italic', 'underline', 'createlink'
              ]
          };
          // create editor
          this.pen = new Pen(options);
          // this.pen.destroy();
          console.log(this.pen.markdown)
      },

    newFile(){
      //todo 由于不知道在哪个路径，用户需要填写在哪个路径下新建文件
      //其实最好的方式是直接在总目录新建，但用户可以拖动文件到它想要的路径
    },

    newFolder(){
      //todo 内容同上
    },

    uploadFiles(){
    this.file = this.$refs.file.files[0];
    let formData = new FormData();
      formData.append('upload_file', this.file);
      var theID=window.location.href.split('/');
      formData.append('id',theID[theID.length-1]);
      formData.append('language','Python')
      this.$http.post ( 'http://120.76.197.133/model/upload.php', formData).then((response)=> {
        console.log(response)
        if(response.body==0){
          console.log('文件上传成功')
        }else if(response.body==1){
          console.log("extension not allowed")
        }else if(response.body==2){
          console.log("empty file")
        }else if(response.body==3){
          console.log("the size of the file is too large")
        }else if(response.body==4){
          console.log("file name contains illegal characters")
        }else if(response.body==5){
          console.log("file name contains more than 250 characters")
        }else{
          console.log("unknown error")
        }
        //console.log(response.body);
      });
    console.log('sucess');
      //todo 用户直接选择直接上传文件 而非手动编辑
      //其实这里还有交互逻辑的问题 陈是想实现传zip文件 但个人感觉还是传文件夹比较好
    },
    close(){
      this.$refs.popup.style.visibility = 'hidden';
      this.$refs.popup.style.opacity = 0;
      console.log('close')
    },

    publishProject(){
      //todo 当用户觉得当前project已完成可以公开给所有用户时 提交项目
      //之后现有一个可行性测试 然后社区全体成员监督 由管理员处理举报等事宜
      //需要parameters 
      var url = "http://120.76.197.133/model/edit.php";
      this.$http.options.emulateJSON = true;
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
      var theID=window.location.href.split('/');
      formData.append('mode',2)
      formData.append('title',this.project.name)
      formData.append('description',this.project.description)
      formData.append('language',this.language_re)
      formData.append('parameter_name',temp_paranames)
      formData.append('parameter_intro',temp_parausages)
      formData.append('parameters','hello))hello')
      formData.append('script_id',theID[theID.length-1])
      formData.append('version',this.project.version)
      this.$http.post(url, formData).then((response)=>{
        console.log(response)
      })
      console.log(this.project.description);
      console.log(this.project.version);
      for(var i=1; i<this.paramterCount+1;i++){
          console.log(this.paranames[i]);
          console.log(this.parausages[i]);
      }

      var sucess = false;
      if(sucess==true){
        this.alert='sucess';
      }else{
        this.alert='fail to publish, please try again';
      }
    },
    toReadArticle(){

    },
    pop(){
      this.alert='';
      this.$refs.popup.style.visibility = 'visible';
      this.$refs.popup.style.opacity = 1;  
    },
  },
  beforeMount: function(){
    console.log('before')
    var url = "http://120.76.197.133/model/edit.php";
    this.$http.options.emulateJSON = true;
    let formData = new FormData();
    var theID=window.location.href.split('/');
    formData.append('script_id',theID[theID.length-1])
    formData.append('mode',0)
    this.$http.post (url, formData).then((response)=> {
        console.log(response)
        var treeData=response.body.directories
        this.project.name=response.body.script_name
        this.project.description=response.body.description
        this.language_re=response.body.language
        this.project.version=response.body.version
        var p_temp=response.body.parameters

        this.paramterCount=p_temp.length
        this.paranames.push('')
        this.parausages.push('')
        for(var i=0;i<p_temp.length;i++){
          this.paranames.push(p_temp[i].name)
          this.parausages.push(p_temp[i].description)
        }

        console.log(p_temp)
        console.log(response)
        var getChildren=function(data,root){
          var result=[],temp;
           var jsonLength=0;
          for (var i in data) {
              jsonLength++;
          }
          for(var i=1;i<jsonLength;i++){
            if(data[i].parent==root){
              var obj={}
              if(data[i].is_dir==1){
              obj={folder: true,name:data[i].name,path:data[i].path}
            }else{
              obj={folder: false,name:data[i].name,path:data[i].path}
            }
            temp=getChildren(data,i)
            if(temp.length>0){
              obj.children=temp
            }
            result.push(obj);
            }

          }
          return result
        }
        var temp_a=getChildren(treeData,0)
        console.log(temp_a)
        this.project.structure=temp_a
    })
  }

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
    color: #000000; 
    background-color: #ffffff; 
    border: solid 2px white; 
    width: 91%; 
    height: 50%; 
    overflow: scroll; 
    scrollbar-face-color: #889B9F;
    scrollbar-shadow-color: #3D5054;
    scrollbar-highlight-color: #C3D6DA;
    scrollbar-3dlight-color: #3D5054;
    scrollbar-darkshadow-color: #85989C;
    scrollbar-track-color: #95A6AA;
    scrollbar-arrow-color: #FFD6DA;

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