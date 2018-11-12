<template>
  <div class="allInOne-con">
    <div id="allInOne"></div>
    <div class="backoff-btn" v-show="needbackoff" @click="backTop"><el-button size="mini">上一层</el-button></div>
  </div>
</template>

<script>
import Axios from 'axios'
export default {
  data() {
    return {
      needbackoff: false,
      initdata: null
    }
  },
  mounted() {
    // var allLieChart = this.echarts.init(document.getElementById('allInOne'))
    Axios.get('http://localhost:8080/static/json/year.json').then((data) => {
      this.grapmaker(data.data)
      this.initdata = data.data
    })
  },
  methods: {
    backTop() {
      this.grapmaker(this.initdata)
      this.needbackoff = false
    },
    grapmaker(data) {
      var allLieChart = this.echarts.init(document.getElementById('allInOne'))
      if (data.name === 'byyear') {
        allLieChart.on('click', (para) => {
          console.log(para.name)
          Axios.get('http://localhost:8080/static/json/month.json').then(data => {
            this.grapmaker(data.data)
            this.needbackoff = true
          })
        })
      }
      const option = {
        title: {
          text: '区域扬尘变化趋势',
          padding: [10, 20]
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['成华区', '高新区', '双流区', '金牛区', '武侯区', '天府新区', '青羊区', '全市'],
          type: 'scroll'
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          // feature: {
          //   saveAsImage: {}
          // }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: data.name === 'byyear' ? ['2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017'] : ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '成华区',
            type: 'line',
            data: data.chenghuaqu
          },
          {
            name: '高新区',
            type: 'line',
            data: data.gaoxinqu
          },
          {
            name: '双流区',
            type: 'line',
            data: data.shuangliuqu
          },
          {
            name: '金牛区',
            type: 'line',
            data: data.jingniuqu
          },
          {
            name: '武侯区',
            type: 'line',
            data: data.wuhouqu
          },
          {
            name: '青羊区',
            type: 'line',
            data: data.qingyangqu
          }, {
            name: '全市',
            type: 'line',
            data: data.quanshi
          }
        ]
      }
      allLieChart.setOption(option)
    }
  }
}
</script>

<style>
#allInOne {
  width: 1000px;
  height: 400px;
  padding: 50px;
}
.allInOne-con {
  position: relative;
}
.backoff-btn {
  position: absolute;
  left: 900px;
  top: 50px;
}
</style>
