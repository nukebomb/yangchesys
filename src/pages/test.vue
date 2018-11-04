<template>
  <div class="container">
    <rank-table></rank-table>
  </div>
</template>

<script>
import rankTable from '../components/rankTable'
export default {
  name: 'test',
  data() {
    return {}
  },
  components: {
    rankTable
  }
}
</script>

<style>
.container{
  width: 100%;
  height: calc(100% - 50px);
}
</style>
