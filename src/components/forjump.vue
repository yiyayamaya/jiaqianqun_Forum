 <template>
     

     <div>跳转中</div>
 </template>

<script>
    
   
    export default {
       

        data() {

            var threadid = document.cookie.match(new RegExp("(^| )"+"justthread"+"=([^;]*)(;|$)"));
            this.$router.replace({
                path:`/thread/${threadid[2]}`,
                name: 'thread'
            })
            return{
               
            }

        },
       
        methods: {
          
        },

       
         
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
