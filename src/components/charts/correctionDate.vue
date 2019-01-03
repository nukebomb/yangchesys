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
          data: ['2018-12-01',
            '2018-12-02',
            '2018-12-03',
            '2018-12-04',
            '2018-12-05',
            '2018-12-06',
            '2018-12-07',
            '2018-12-08',
            '2018-12-09',
            '2018-12-10',
            '2018-12-11',
            '2018-12-12',
            '2018-12-13',
            '2018-12-14',
            '2018-12-15',
            '2018-12-16',
            '2018-12-17',
            '2018-12-18',
            '2018-12-19',
            '2018-12-20',
            '2018-12-21',
            '2018-12-22',
            '2018-12-23',
            '2018-12-24',
            '2018-12-25',
            '2018-12-26',
            '2018-12-27',
            '2018-12-28',
            '2018-12-29',
            '2018-12-30',
            '2018-12-31'
          ]
        },
        yAxis: {
          type: 'value',
          name: 'μg/m³'
        },
        legend: {
          data: ['原始数据', '国控点数据', '修正后数据']
        },
        series: [{
          // data: mockData.predictData,
          name: '原始数据',
          data: [
            100,
            107,
            113,
            152,
            165,
            136,
            152.55,
            173.22,
            137.46,
            151.91,
            120.31,
            128.554,
            119.38,
            117.2708333,
            149.0041667,
            125.1708333,
            196.0916667,
            174.0583333, ,
            188.475,
            204.1625,
            153.0208333,
            57.17916667,
            47.98333333,
            54.99166667,
            50.81666667,
            74.36666667,
            54.87916667,
            63.2625,
            69.19166667,
            83.25,
            88.8
          ],
          type: 'line'
        },
        {
          // data: mockData.realData,
          name: '国控点数据',
          data: [
            85,
            87,
            91,
            76,
            80,
            106,
            107,
            142,
            144,
            104,
            110,
            91,
            93,
            99,
            87,
            90,
            103,
            161,
            201,
            206,
            142,
            55,
            45,
            41,
            70,
            55,
            31,
            82,
            80,
            85,
            62
          ],
          type: 'line'
        }, {
          name: '修正后数据',
          data: [
            74.20358628,
            73.27141089,
            80.07142413,
            62.21762484,
            69.64631812,
            92.74991883,
            92.98297625,
            128.2554193,
            132.0802234,
            91.36644424,
            96.75829754,
            80.15414314,
            80.92632046,
            86.74861804,
            76.58596832,
            76.42919509,
            91.78600115,
            149.7686455,
            187.9022292,
            193.8391082,
            127.3792714,
            40.26975059,
            32.65398777,
            29.89583615,
            59.67005342,
            40.64953104,
            18.8441183,
            69.34695321,
            65.05951035,
            71.68561322,
            47.81091154
          ],
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
