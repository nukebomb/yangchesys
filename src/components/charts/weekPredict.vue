<template>
  <div id="weekPredict">
    <div>
      <el-form>
        <el-form-item>
          <el-select v-model="rangeSeleted">
            <el-option v-for="(item, index) in seletorRange" :key="index" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="mini" @click="submitPredictRange">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div id="weekPredictCon">
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      weekPredictGraph: null,
      rangeSeleted: null,
      seletorRange: [{ value: 'oneweek', label: '未来一周' }, { value: 'twoweek', label: '未来两周' }]
    }
  },
  mounted() {
    this.weekPredictGraph = this.echarts.init(document.getElementById('weekPredictCon'))
  },
  methods: {
    submitPredictRange() {
      let range = this.rangeSeleted
      let dateNow = new Date()
      let rangeNum = range === 'oneweek' ? 7 : 14
      let rangeResult = []
      for (let i = 1; i <= rangeNum; i++) {
        var currentdate = new Date(dateNow.setDate(dateNow.getDate() + i))
        rangeResult.push(this.dateFomatter(currentdate))
      }
      this.weekPredictGraph.setOption({
        'title': {
          text: '随时间变化的预测趋势'
        },
        xAxis: {
          type: 'category',
          data: rangeResult
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: rangeNum === 7 ? [820, 932, 901, 934, 1290, 1330, 1320] : [934, 1290, 20, 932, 901, 934, 1290, 934, 1290, 20, 932, 901, 934, 1290],
          type: 'line'
        }]
      })
    },
    dateFomatter(dateObj) {
      return dateObj.getFullYear() + '-' + this.addZero(dateObj.getMonth() + 1) + '-' + this.addZero(dateObj.getDate())
    },
    addZero(num) {
      return num < 10 ? '0' + num : num
    }
  }
}
</script>

<style>
#weekPredictCon {
  width: 1000px;
  height: 600px;
}
</style>
