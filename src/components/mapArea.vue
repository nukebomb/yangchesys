<template>
  <div id="allmap"></div>
</template>

<script>
export default {
  name: 'mapArea',
  mounted() {
    var map = new window.BMap.Map('allmap')
    map.centerAndZoom('成都', 15)
  }
}
</script>

<style>
#allmap {
  width: 100%;
  height: 100%;
}
</style>
