<template>
  <div id="app">
    <navgation-top></navgation-top>
    <keep-alive>
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
import navgationTop from './components/navgationTop'
export default {
  name: 'App',
  components: {
    navgationTop
  },
  mounted() {
    // console.log(this.$router.currentRoute)
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
