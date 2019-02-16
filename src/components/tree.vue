<template>
  <li class="tree-structure ">
    <div class="folder" v-if="isFolder">
      <div class="icon">
        <i  v-show="!open"class="icon-folder11"></i>
        <i  v-show="open" class="icon-folder-open2"></i>
      </div>
      <span @click="toggle" class="file-name">{{model.name}}</span>
      <!-- <span @click="toggle">[{{ open ? '-' : '+' }}]</span> -->
      <ul v-for="item in model.children">
        <treeMenu @bus='curEditFile' v-show="open" :model="item">{{item.name}}</treeMenu>
        <!-- 还是搞不清楚这个组件的名字到底是啥 奇奇怪怪的。。。 -->
      </ul>
    </div>
    <div class="file" v-if="!isFolder">
      <div class="icon">
        <i class="icon-file"></i>
      </div>
      <span @click="bus" class="file-name">{{model.name}}</span>
    </div>

  </li>
</template>

<script>
export default {
  name: 'treeMenu',
  props: ['model'],
  data: function () {
    return {
      open: false
    }
  },
  computed: {
    isFolder: function () {
      return this.model.folder
    }
  },
  methods: {
    toggle: function () {
      if (this.isFolder) {
        this.open = !this.open
      }
    },
    bus: function () {
      this.$emit('bus', this.model);
    	console.log(this.model.path); 
    	//todo 根据给定路径打开文件
    },
    curEditFile: function (data) {
      this.$emit('bus', data);
      console.log(data.path); 
    }
  }
}
</script>
<style>
	.tree-menu .icon{
		float: left;
	}
	.tree-menu .file-name {
		padding-left: 5px;
	}
	.tree-menu span {
		cursor: pointer;
	}

</style>