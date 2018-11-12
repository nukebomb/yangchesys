<template>
  <div>
    <div class="bar-date-con">
      <el-form>
        <el-form-item class="zone-selector">
          <el-radio v-model="zoneRadio" label="allchengdu">全成都</el-radio>
          <el-radio v-model="zoneRadio" label="particalArea">区域数据</el-radio>
          <el-radio v-model="zoneRadio" label="particalSpot">点位数据</el-radio>
        </el-form-item>
        <el-form-item required class="date-picker">
          <el-date-picker v-model="pickedDate" type="daterange" range-separator="至"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitHistory">查询</el-button>
        </el-form-item>
      </el-form>
      <div id="historyGraphcon"></div>
    </div>
  </div>
</template>

<script>
import Axios from 'axios'
export default {
  data() {
    return {
      zoneRadio: 'allchengdu',
      pickedDate: null,
      historyGraph: null
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
    Axios.get('http://localhost:8080/static/json/cdHistory.json').then((data) => {
      // console.log(data.data.data)
      var initData = data.data.data
      var dataCategory = []
      var dataValue = []
      initData.forEach(element => {
        dataCategory.push(element.date)
        dataValue.push(element.value)
      })
      const historyOption = {
        xAxis: {
          type: 'category',
          // data: this.xAxisNamesCompute(this.endDate)
          data: dataCategory
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: dataValue,
          type: 'bar'
        }]
      }
      this.historyGraph.setOption(historyOption)
    })
  },
  methods: {
    submitHistory() {
      // console.log(this.pickedDate)
      Axios.get('http://localhost:8080/static/json/cdHistorymin.json').then((data) => {
        var particalData = data.data.data
        var pardataCategory = []
        var pardataValue = []
        particalData.forEach(element => {
          pardataCategory.push(element.date)
          pardataValue.push(element.value)
        })
        const historyOption = {
          xAxis: {
            type: 'category',
            // data: this.xAxisNamesCompute(this.endDate)
            data: pardataCategory
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            data: pardataValue,
            type: 'bar'
          }]
        }
        this.historyGraph.setOption(historyOption)
      }
      )
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
.bar-date-con {
  padding: 50px;
}
#historyGraphcon {
  width: 800px;
  height: 600px;
}
</style>
