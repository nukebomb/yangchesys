<template>
  <div class="search">
    <header>
      <!-- <router-link to="/compresearch/zonemanage">区域管理</router-link>
      <router-link to="/compresearch/history">历史数据</router-link> -->
      <el-button @click="jump">区域管理</el-button>
    </header>
    <section>
      <router-view></router-view>
    </section>
  </div>
</template>

<script>
export default {
  methods: {
    jump() {
      this.$router.push('/compresearch/zonemanage')
    }
  }
}
</script>

<style>
.search {
  height: 500px;
}
</style>
