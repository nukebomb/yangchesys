<template>
  <div class="home-page">
    <div class="left-container">
      <div class="search-bar" :class="{actived: showSearch}">
        <location-search></location-search>
        <div class="arrow" :class="{actived: showSearch}" @click="toggleSearchBar">
          <i class="iconfront-yc icon-yc-jiantou4"></i>
        </div>
      </div>
      <div class="middle-container">
        <div class="map-container"></div>
        <div class="graph-container"></div>
      </div>
    </div>
    <div class="right-container"></div>
  </div>
</template>

<script>
import locationSearch from '../components/locationSearch'
export default {
  name: 'Home',
  data() {
    return {
      showSearch: false
    }
  },
  components: {
    locationSearch
  },
  methods: {
    toggleSearchBar() {
      this.showSearch = !this.showSearch
    }
  }
}
</script>

<style>
.home-page {
  width: 100%;
  height: calc(100% - 50px);
  display: flex;
  flex-wrap: nowrap;
}
.left-container {
  height: 100%;
  width: 100%;
  flex-grow: 2;
  overflow: hidden;
  display: flex;
  flex-wrap: nowrap;
  position: relative;
}
.right-container {
  width: 300px;
  height: 100%;
  background-color: teal;
}
/*
* 动画有问题
*/
.search-bar {
  width: 300px;
  height: 100%;
  position: relative;
  transition: left 0.6s ease-in;
}
.search-bar.actived {
  position: absolute;
  left: -300px;
}
.middle-container {
  background-color: violet;
  flex-grow: 2;
  height: 100%;
  z-index: 100;
  display: flex;
  flex-direction: column;
}
.map-container {
  flex-grow: 2;
  background-color: thistle;
}
.graph-container {
  background-color: silver;
  height: 200px;
}
.arrow {
  position: absolute;
  right: 10px;
  top: 50%;
  cursor: pointer;
  transform: translateY(-50%);
}
.arrow i {
    font-size: 30px;
}
.arrow.actived {
  transform: rotate(180deg);
  right: -40px;
  transition: all 0.4s ease-in;
  z-index: 1000;
}
</style>
