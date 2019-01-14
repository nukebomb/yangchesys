<template>
  <div>
    <el-table
      :data="contextForTable"
      :row-class-name="tableRowClassName"
      size="mini"
      border
      @expand-change="drawInnerGraph"
    >
      <el-table-column label="点位名称" prop="name"></el-table-column>
      <el-table-column label="工程位置" prop="location"></el-table-column>
      <el-table-column label="污染等级" prop="level"></el-table-column>
      <el-table-column label="变化趋势" prop="trend"></el-table-column>
      <el-table-column type="expand">
        <template>
          <div class="expand-graph-contaienr">
            <expanded-line-chart :chart-data="expandedChartData"></expanded-line-chart>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import expandedLineChart from './charts/expandedLineChart'
import qs from 'qs'
export default {
  name: 'rankTable',
  props: ['dataForTable', 'contextForTable'],
  components: {
    expandedLineChart
  },
  data() {
    return {
      expandedChartData: null // 展开表格的数据
    }
  },
  methods: {
    tableChangeData() {
      // 发送请求，确定对应时间段对应区域的点位表格信息。
      /* 数据格式：{
      }
      **
      */
      this.$axios.post('http://localhost:3000/home/postable', qs.stringify(this.dataForTable)).then(res => {
        console.log(res)
      })
    },
    tableRowClassName({ row, rowIndex }) {
      let level = this.polutionRank[rowIndex].level
      let result
      switch (level) {
        case '3级': result = 'level3-row'
          break
        case '2级': result = 'level2-row'
          break
        case '1级': result = 'level1-row'
          break
      }
      // console.log(result)
      return result
    },
    drawInnerGraph(row) {
      // row.name 是请求innergraph的id值，
      // console.log(row.name)
      // setTimeout(() => {
      //   this.$refs.expandLineChart.drawLineChart({
      //     data: [1, 2, 3],
      //     category: [1, 2, 3]
      //   })
      // }, 1000)
      this.expandedChartData = {
        data: [1, 2, 3],
        category: [1, 2, 3]
      }
      // this.$axios.get('http://localhost:3000/home/search/' + row.name + '时间段').then(res => {
      // })
    }
  }
}
</script>

<style>
.el-table .level3-row {
  background-color: red;
}
.el-table .level2-row {
  background-color: orange;
}
.el-table .level1-row {
  background-color: yellow;
}
.expand-graph-contaienr {
  width: 75%;
  height: 300px;
}
</style>
