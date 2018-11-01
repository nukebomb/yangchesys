<template>
  <div id="app">
    <navgation-top></navgation-top>
    <router-view/>
  </div>
</template>

<script>
import navgationTop from './components/navgationTop'
export default {
  name: 'App',
  components: {
    navgationTop
  }
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
}
</style>
