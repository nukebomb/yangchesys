<template>
  <div class="nav-container clearfix">
    <div class="nav-left float-l">
      <span class="nav-title">成都市扬尘污染大数据分析系统</span>
      <span class="nav-logo">logo is here</span>
    </div>
    <div class="nav-middle">
      <ul class="nav-list" @click="jump">
        <li class="active" key="home">综合查询</li>
        <li key="calculate">统计分析</li>
        <li key="control">智能管控</li>
        <li key="correct">修正数据</li>
        <li key="help">帮助文档</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'navgationTop',
  data() {
    return {
      activeIndex: '1'
    }
  },
  methods: {
    jump(e) {
    }
  }
}
</script>

<style>
.nav-container {
  width: 100%;
  background-color: #545c64;
  color: #fff;
  height: 50px;
  font-size: 1.2em;
  line-height: 50px;
}
.nav-title {
  display: inline-block;
  margin: 0 30px 0 20px;
}
.nav-logo {
  display: inline-block;
  margin-right: 100px;
}
.nav-list li {
  display: inline-block;
  position: relative;
  width: 70px;
  height: 100%;
  margin: 0 15px;
  text-align: center;
}
.nav-list li:hover {
  cursor: pointer;
  color: #ffd04b;
}
.nav-list li.active {
  color: #ffd04b;
}
.nav-list li.active::before {
  content: "";
  position: absolute;
  width: 70px;
  height: 2px;
  background-color: #ffd04b;
  top: 48px;
  left: 0;
}
</style>
