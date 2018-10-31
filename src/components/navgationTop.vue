<template>
  <div class="nav-container clearfix">
    <div class="nav-left float-l">
      <span class="nav-title">成都市扬尘污染大数据分析系统</span>
      <span class="nav-logo">logo is here</span>
    </div>
    <div class="nav-middle">
      <ul class="nav-list" @click="jump" >
        <li v-for="(item,index) in classfication" :data-index="index" :key="index" :class="{ active: item.actived}">{{ item.name }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'navgationTop',
  data() {
    return {
      activeIndex: '1',
      classfication: [
        {
          actived: true,
          name: '综合查询',
          routeName: 'home'
        },
        {
          actived: false,
          name: '统计分析',
          routeName: 'analysis'
        }, {
          actived: false,
          name: '智能管控',
          routeName: 'control'
        }, {
          actived: false,
          name: '修正数据',
          routeName: 'correction'
        }, {
          actived: false,
          name: '帮助文档',
          routeName: 'helpdoc'
        }
      ]
    }
  },
  methods: {
    jump(e) {
      // console.log(e.target.dataset.index)
      this.classfication.forEach((item, index) => {
        item.actived = false
        if (Number(index) === Number(e.target.dataset.index)) {
          item.actived = true
          this.$router.push(item.routeName)
        }
      })
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
