const serverSrc='www.baidu.com ';
const token='12345678';
const hasEnter=false;
const userSite="中国钓鱼岛";
const scriptlist=[{title: '我是默认的', description: '我是默认的'}];
  export default
  {
    userSite,//用户地址
    token,//用户token身份
    serverSrc,//服务器地址
    hasEnter,//用户登录状态
    scriptlist,
 settoken (newToken) {
    this.token = newToken
    console.log('token已经改变')
  },

  setscripslist(newscriptlist){
    this.scriptlist=newscriptlist
    console.log('全局的scriptList已经改变')
  } 
  }
