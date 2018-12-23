/*
 * @Author: mikey.zhaopeng 
 * @Date: 2018-12-23 14:18:18 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-12-23 15:15:59
 * description: 此组件是用于综合查询页面的折线图组件
 * 初始页面时，默认加载的是全市按年度的历史数据（2015-2018）
 * 向父组件传drawGraph方法，通过此方法实现切换区域，对应的折线图相应变化。
 */

<template>
  <div class="historyDate">
    <div id="historyGraphcon"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      zoneRadio: 'allchengdu',
      pickedDate: null,
      historyGraph: null,
      showedArea: null,
      graphOption: null
    }
  },
  computed: {
    endDate() {
      var currentDate = new Date()
      return this.dealDate(currentDate)
    }
  },
  mounted() {
    this.historyGraph = this.echarts.init(document.getElementById('historyGraphcon'))
    // 页面初始化时，向后端请求： 2015-2018全市年度数据
    this.$axios.get('http://localhost:3000/history/init').then((data) => {
      // console.log(data)
      const historyOption = {
        title: {
          text: '各区域扬尘历史数据',
          padding: [5, 20]
        },
        toolbox: {
          feature: {
            dataZoom: {
              yAxisIndex: false
            }
          }
        },
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          type: 'category',
          data: data.data.category
        },
        yAxis: {
          type: 'value',
          name: 'μg/m³'
        },
        series: [{
          data: data.data.data,
          // data: data.data.spring,
          type: 'line'
        }]
      }
      this.graphOption = historyOption
      this.historyGraph.setOption(historyOption)
    })
  },
  methods: {
    // submitHistory() {
    //   switch (this.zoneRadio) {
    //     case 'allchengdu':
    //       // console.log(this.pickedDate[0])
    //       this.drawGraph(`http://localhost:3000/history/all/${this.pickedDate[0]}/${this.pickedDate[1]}`)
    //       console.log(`http://localhost:3000/history/all/${this.pickedDate[0]}/${this.pickedDate[1]}`)
    //       break
    //     case 'particalArea':
    //       this.drawGraph('http://localhost:3000/history/zones/' + this.pickedDate[0] + '/' + this.pickedDate[1])
    //       break
    //     case 'particalSpot':
    //       this.drawGraph('http://localhost:3000/history/spots/' + this.pickedDate[0] + '/' + this.pickedDate[1])
    //       break
    //   }
    // },
    
    /*
    * drawGraph(area|string, date|string, method)
    * area: 所选区域，
    * date: 时间范围，
    * method： 显示方式（按年度，季度，月度）
    * return null
    */
    drawGraph(area, date, method) {
      this.$axios.get('http://localhost:3000/history/' + area + '/' + date + '/' + method).then(data => {
        /* 
        * 向后端请求，返回的数据格式：
        * {
        * ...
        * data: {
        * category: ['2015','2016'],// 选取的时间段。会在
        * data: [pm10值, ...]
        * }
        * ...
        * }
        */
        var realseries = null
        var realLegend = null
        if (data.data.name === 'allcityByTime') {
          realseries = [{
            data: data.data.data,
            type: 'bar'
          }]
        } else if (data.data.name === 'eachZones') {
          realLegend = {
            data: ['成华区', '高新区', '双流区', '金牛区', '武侯区', '青羊区'],
            left: '30%'
          }
          realseries = [{
            name: '成华区',
            data: data.data.data.chenghua,
            type: 'bar'
          },
          {
            name: '高新区',
            data: data.data.data.gaoxing,
            type: 'bar'
          },
          {
            name: '双流区',
            data: data.data.data.shuangliu,
            type: 'bar'
          },
          {
            name: '金牛区',
            data: data.data.data.jinniu,
            type: 'bar'
          },
          {
            name: '武侯区',
            data: data.data.data.wuhou,
            type: 'bar'
          },
          {
            name: '青羊区',
            data: data.data.data.qingyang,
            type: 'bar'
          }]
        } else if (data.data.name === 'eachSpots') {
          realseries = [{
            // 逻辑还没确定
          }]
        }
        const historyOption = {
          xAxis: {
            type: 'category',
            data: data.data.category
          },
          legend: realLegend,
          dataZoom: [
            {
              type: 'slider',
              show: true,
              start: 0,
              end: 100
            },
            {
              type: 'inside',
              start: 0,
              end: 100
            }
          ],
          yAxis: {
            type: 'value'
          },
          series: realseries
        }
        this.historyGraph.setOption(historyOption)
      })
    },
    xAxisNamesCompute(datestr) {
      let inputDate = new Date(datestr)
      let week = [this.dealDate(inputDate)]

      for (let i = 0; i < 6; i++) {
        inputDate.setDate(inputDate.getDate() - 1)
        week.push(this.dealDate(inputDate))
      }
      return week.reverse()
    },
    dealDate(date) {
      return date.getFullYear() + '-' + this.addZero(date.getMonth() + 1) + '-' + this.addZero(date.getDate())
    },
    addZero(num) {
      return num < 10 ? '0' + num : num
    }
  }
}
</script>

<style>
.historyDate {
  width: 100%;
  height: 100%;
}
#historyGraphcon {
  width: 100%;
  height: 100%;
}
</style>
