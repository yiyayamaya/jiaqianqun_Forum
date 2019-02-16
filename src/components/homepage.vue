 <template>
     <div class="overview">
        <div class="overview-inner">
            <!--
            <div class="select-box">
                <v-select class="select-date" v-model="dateSelected" v-on:input="selectDate(dateSelected)" :options="options1"></v-select>
                <v-select class="select-language" multiple v-model="langSelected" v-on:input="selectLanguage(langSelected)" :options="options2" v-bind:style="{width: computedWidth}" @click="selectLanguage()"></v-select> 
                 todo 修改Select.vue文件使得语言选择横向扩展！ 
            </div>
            -->
            <div class="script-box">
                <li class="script-list" v-for="(item, index) in scriptList">

                   <div >
                   
                   
                    <div   class="title" @click="toReadArticle(item.id)">{{item.title}}  </div>
                    <div  class="title2" >吧</div>

                     </div>
                     

                    <div class="description">{{item.description}}</div>
                    <div class="footer">
                        <div class="look"><i class="icon-eye"></i><label>120</label></div>
                        <div class="comment"><i class="icon-comment"></i><label>0</label></div>
                        <div class="love"><i class="icon-love"></i><label>12</label></div>
                    </div>
                </li>
            </div>
        </div>
    </div>    
 </template>

<script>
    // $('input').css('width',((input.getAttribute('placeholder').length + 1) * 8) + 'px');
    import vSelect from './Select'
    // Vue.component('v-select', )
    export default {
        name: 'homepage',

        components: {
            vSelect:vSelect,
        },

        data() {
            return{
                dateSelected: 'all',
                langSelected: [],
                options1: ['all', 'last week','last month','last year'],
                options2: ['Ruby','Python','JavaScript','PHP','Perl'],
                scriptList: []
            }
        },
        computed:{
            computedWidth(){
                var length = 0;
                for (var i = 0; i < this.langSelected.length; i++) { 
                    length += this.langSelected[i].length;
                }
                length = length * 15;
                console.log(length);
                return length+'px';
            }
        },beforeRouteUpdate(to,from,next){
        },
        beforeDestory(){
            this.$root.Bus.$off('eventTime')
        },
        methods: {
            goBack(){
            
            var arr = document.cookie.match(new RegExp("(^| )"+"from_path"+"=([^;]*)(;|$)"));
            if(arr!=null){
            this.$router.push({path: arr[2]});
            }else{
            this.$router.push({path:'/'});
            }
            },

            selectDate(data) {
                if(this.dateSelected=='all')
                {
                    document.cookie="content_date"+"="+""//加cookie         
                }
                else
                {                    
                    document.cookie="content_date"+"="+this.dateSelected//加cookie
                }           
            },
            selectLanguage(data) {
                //todo 根据 langSelected的文字筛选目前list中的语言
                console.log('langSelected！！！！！！！！');
                if(this.langSelected=='--')//这句并不会执行 一定会跳到else
                {
                    console.log('我不改cookie了');
                }
                else
                {
                     console.log('我改cookie了');
                   document.cookie="content_language"+"="+this.langSelected//加cookie
                }                
            },
            toReadArticle(id) {
                console.log(id)
                this.$router.push({path: `/script/${id}`}) 
            },
            async getList() {
            },
        },
         beforeMount: function(){
             var arr = document.cookie.match(new RegExp("(^| )"+"content_language"+"=([^;]*)(;|$)"));
            console.log(arr);
            this.$root.Bus.$on('eventTime',value=>{
                this.scriptList=value
            })
            if(arr!=null){                
                var arrsplit = [];
                if(arr[2].length!=0)
                {arrsplit=arr[2].split(",");}
                console.log(arrsplit.length)
                for(var i =0;i<arrsplit.length;i++)
                {
                    this.langSelected.push(arrsplit[i]);
                }                    
            }else{
                this.langSelected=[]
            }
            var arr1 = document.cookie.match(new RegExp("(^| )"+"content_date"+"=([^;]*)(;|$)"));
            if(arr1!=null){
                this.dateSelected=arr1[2];
            }else{
                this.dateSelected=""
            }
            var content_search=document.cookie.match(new RegExp("(^| )"+"content_search"+"=([^;]*)(;|$)"))
            var content_date=document.cookie.match(new RegExp("(^| )"+"content_date"+"=([^;]*)(;|$)"))
            var content_language=document.cookie.match(new RegExp("(^| )"+"content_language"+"=([^;]*)(;|$)"))
            var temp_list=[]
            var url = "http://211.159.186.183/model/search.php"; 
            let formData = new FormData();
            var data_temp={}
            //if(content_search!=null&&content_search[2]!=""){
             formData.append('mode', 2);//mode1 全部搜索    
            //formData.append("search_key",content_search[2])
            formData.append("search_key",'')
            if(content_date!=null&&content_date[2]!="all"){
            if(content_date[2]=="last week"){
                formData.append('time','W')
            }else if(content_date[2]=="last month"){
                formData.append('time','M')
            }else if(content_date[2]=="last year"){
                formData.append('time','Y')
            }
            }
            if(content_language!=null&&content_language[2]!=""){
                var forpost=""
                forpost=forpost.concat(content_language[2])
                formData.append('language',forpost)
            }
            this.$http.post(url, formData).then((response)=>{
                console.log(response)
                for(var i=0;i<response.body.length;i++){
                temp_list.push({title: response.body[i].scriptTitle, description: response.body[i].scriptIntro,id: response.body[i].scriptID})
                }
                this.scriptList=temp_list
            })
            //}
    }

    
    }
</script>

<style>
    .overview {
        
        width: 100%;
        position: absolute;
        z-index: 100;
    }
    .overview-inner {
        max-width: 1012px;
        margin: 0 auto;
    }

    .select-box {
        max-height: 64px;
    }
    .select-date {
        padding-top: 30px;
        width: 160px;
        float: left;
    }
    .select-language {
        padding-top: 30px;
        margin-left: 210px;
        min-width: 180px;
        /*width: auto;*/
        /*width: 180px;*/
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

       
        float:left;
       
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


    .script-box .script-list .title2 {

       
        display:inline;
        height: 21px;
        font-weight: 600;
        color: #000000;
        cursor: default;
        font-size: 14px;
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
        width: 100px;
        height: 15px;
        margin-top: 8px;
        font-size: 10px;
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
</style>
