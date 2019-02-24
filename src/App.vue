<template>
    <div id="app">
        <router-view name='search'></router-view>
        <div>
            <v-header>
            </v-header>
            <router-view ></router-view>
            <v-footer></v-footer>
        <!-- <router-link to="/list"></router-link> -->
        </div>
    </div>

</template>

<script>
import Vue from 'vue'
import vHeader from './components/vHeader'
import vFooter from './components/vFooter'
    export default {
        components: {vHeader,vFooter},
    }
</script>

<style>
#app {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    height: 100%;
}
.v-header{
    position: fixed; /*todo 钟说头部固定比较好 这个无法实现效果*/
}
</style>
