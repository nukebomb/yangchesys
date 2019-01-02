<template>
  <!-- <div id="correcDateGraph"> -->
  <!-- <div id="datePicker">
      <el-date-picker type="daterange" v-model="pickedDate" range-separator="至" @change="drawWithDate"></el-date-picker>
  </div>-->
  <div id="grapContainer"></div>
  <!-- </div> -->
</template>

<script>
import qs from 'qs'
export default {
  data() {
    return {
      // pickedDate: null,
      correctPie: null
    }
  },
  mounted() {
    this.correctPie = this.echarts.init(document.getElementById('grapContainer'))
  },
  methods: {
    drawWithDate(spotMessage) {
      console.log(spotMessage)

      this.$axios.post('http://localhost:3000/correction', qs.stringify(spotMessage)).then(data => {
        console.log(data)
      })
      this.correctPie.setOption({
        xAxis: {
          type: 'category',
          // data: category
          data: ['xx', 'yy', 'zz']

        },
        yAxis: {
          type: 'value'
        },
        series: [{
          // data: mockData.predictData,
          data: [11, 22, 33],
          type: 'line'
        },
        {
          // data: mockData.realData,
          data: [12, 26, 53],
          type: 'line'
        }]
      })
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
/* #correcDateGraph {
  padding: 20px;
  width: 100%;
  height: 100%;
} */
#grapContainer {
  width: 100%;
  height: calc(100% - 20px);
}
</style>
