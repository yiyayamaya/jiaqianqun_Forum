
import Vue from 'vue'
import Router from 'vue-router'
// import Home from '../components/search.vue'
import Search from '../components/search.vue'
import Login from '../components/login.vue'
import List from '../components/list.vue'
import Add from '../components/add.vue'
import Script from '../components/script.vue'
import Edit from '../components/edit.vue'
import VueResource from 'vue-resource'
import VHeader from '../components/vHeader.vue'
import Person from '../components/person.vue'
import Message from '../components/message.vue'
import View from '../components/view.vue'
import Result from '../components/result.vue'
import Thread from '../components/thread.vue'
import Homepage from '../components/homepage.vue'
import Forjump from '../components/forjump.vue'
Vue.use(Router)
Vue.use(VueResource)

const router=new Router({
    //mode:'history',
    routes: [
        {
            path: '/add',
            name: 'add',
            component: Add
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/list',
            name: 'list',
            component: List
        },
        {
            path: '/',
            name: 'homepage',
            component: Homepage
        },
        {
            path: '/script/:_id',
            name: 'script',
            component: Script
        },
        {
            path: '/thread/:_id',
            name: 'thread',
            component: Thread
        },
        {
            path: '/edit/:_id',
            name: 'edit',
            component: Edit
        },{
            path: '/person',
            name: 'person',
            component: Person
        },{
            path: '/message/:_id',
            name: 'message',
            component: Message
        },{
            path: '/view/:_id',
            name: 'view',
            component: View
        },
        {
            path: '/result/:_id',
            name: 'result',
            component: Result
        },
        {
            path: '/forjump',
            name: 'forjump',
            component: Forjump
        }



    ]
})


router.beforeEach((to, from, next) => {
    var vue=require('vue');
    Vue.use(require('vue-resource'));
  var arr = document.cookie.match(new RegExp("(^| )"+"token"+"=([^;]*)(;|$)"));
  if(arr != null) {
    console.log("chenggong")
    //Vue.use(VueResource)
    console.log(from)
    $.ajax({
    data: "cookie="+arr[2],
    url: 'http://211.159.186.183/model/login.php',
    dataType: 'JSON',
    method: 'POST', // or GET
    success: function(msg) {
        //console.log('ss')
        console.log(arr[2])
        console.log(msg)
        console.log(msg.login_status[0])
        if (msg.login_status[0]==1){
            document.cookie="user_status"+"="+"1"
            document.cookie="user_ID"+"="+msg.user.userID
            document.cookie="user_type"+"="+msg.user.usertype
        }else{
            console.log('这句话是真的sb')
            document.cookie="user_status"+"="+"0"
        }

        next()
            }
    });

  }
    else{
        next()
  }

})

export default router
