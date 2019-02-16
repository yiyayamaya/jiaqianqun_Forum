import Vue from 'vue'
import App from './App'
import router from './router'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

new Vue({
  el: '#app',
  router,
  // created() {
  //   this.checkLogin();
  // },
  // methods:{
  //   checkLogin(){
  //     var session = false;
  //     //检查是否存在session
  //     if(!session){
  //       this.$router.push({path:'/login'});
  //     }else{
  //       this.$router.push({path:'/home'});
  //     }
  //   }
  //  }
  render: h => h(App),
  data: {
    Bus:new Vue()
  }
  // template: '<App/>',
  // components: { App }
}) //.$mount('#app')
Vue.use(VueRouter)
Vue.use(VueResource)
