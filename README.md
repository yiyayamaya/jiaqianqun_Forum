# autoscript
demo at https://nicolemayer.github.io/autoscript/

maybe 代表可选项

？？？希望全体成员回答一下

所有的编号1.2.3等等都是一一对应的，详情请看前端描述

## 需求分析
### 前端
- [ ] 1.主页界面 - 一个搜索框
  - [ ] 🔍图标再调整
  - [ ] 设置搜索按下enter也可以搜索
  - [ ] 希望没有该界面是没有header的， 但我不知道如何实现？？？同时我希望header在滚动的同时是固定的，`position: absolute` 无法搞定？？？
- [ ] 2.搜索结果界面 - 一堆框框
  - [ ] maybe 考虑搜到太多，可能要分页？？
  - [ ] 该界面有筛选框 第一个根据时间 第二个根据语言（语言是多选框）
  - [ ] 如果无返回结果 显示 “no results for searching "XXX"”
- [ ] 3.点击script标题进入script介绍的界面 不同script路径设计
  - [ ] ...
- [ ] 4.实现add界面设计图效果
- [ ] 5.可能要多加一个图标 用于开发者管理已有项目
- [ ] 6.注册、登录界面

### 前后端连接
- [ ] 1.把前端1提供的字符串传给后端，然后 根据返回的编号 跳转到 `/script` 界面。
  - [ ] 这个过程我不太理解：`/script`界面先跳转再在该界面查询数据库 还是先查询数据库传递给界面？？？在2中我写了一个空函数`async getList()`
- [ ] 2.把前端提供的筛选框提供的数据传+当前list显示的script编号 递给后端
  - [ ] 这里又有问题 多次筛选范围是不对的，要么保存第一次无筛选的结果内容；要么保存最开始搜索的字符串+筛选内容全部传入数据库？？？
- [ ] 6.添加数据库用户名+密码 / 查询数据库用户名+密码
  - [ ] 非常非常重要的用户状态的存储？？？
  

### 后端
- [ ] 1.搜索数据库的 **标题** 和 **描述** ，返回script的 编号？
- [ ] 2.在已有的script编号中查询符合筛选框要求的script编号返回？
- [ ] 6.数据库添加用户名+密码，服务器创建一个session；数据库查询用户名密码是否匹配...

