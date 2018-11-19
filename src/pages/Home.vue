<template>
  <div class="home-container">
    <map-area></map-area>
    <div id="rightside-graph">
      <div class="top-form">
        <div class="title">
          <span class="crossline"></span>
          <span class="subtitle">查询扬尘情况</span>
        </div>
        <div class="inputs-section">
          <el-cascader expand-trigger="hover" :options="researchOptions" v-model="selectedOptions"></el-cascader>
        </div>
      </div>
      <div class="bottom-graph"><line-charts></line-charts></div>
    </div>
  </div>
</template>

<script>
import mapArea from '../components/mapArea'
import lineCharts from '../components/lineCharts'
import rankTable from '../components/rankTable'
export default {
  components: {
    mapArea,
    lineCharts,
    rankTable
  },
  data() {
    return {
      selectedOptions: null,
      researchOptions: [
        {
          value: 'allcity',
          label: '全市'
        },
        {
          value: 'zones',
          label: '区域查询',
          children: [
            {
              label: '成华区', value: 'chenghua'
            }, {
              label: '武侯区', value: 'wuhou'
            }, {
              label: '高新区', value: 'gaoxin'
            }, {
              label: '双流区', value: 'shuangliu'
            }, {
              label: '金牛区', value: 'jingniu'
            }
          ]
        }, {
          value: 'points',
          label: '点位查询',
          children: [
            {
              label: '0x123', value: '0x123'
            }, {
              label: '0x124', value: '0x123'
            }, {
              label: '0x153', value: '0x123'
            }, {
              label: '0x1x3', value: '0x123'
            }, {
              label: '0x1v3', value: '0x123'
            }
          ]
        }
      ]
    }
  }
}
</script>

<style>
.home-container {
  height: 100%;
  width: 100%;
  position: relative;
}
#rightside-graph {
  width: 40%;
  position: absolute;
  right: 0;
  top: 0;
  height: 94%;
  background-color: #545c64;
  margin-top: 1.4%;
  opacity: 0.8;
}
/* 带横线标题 */
.title {
  width: 100%;
  position: relative;
  height: 30px;
  margin-bottom: 10px;
}
.subtitle {
  text-align: middle;
  height: 30px;
  line-height: 30px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  color: white;
  background-color: #545c64;
}
.subtitle::before {
  position: absolute;
  top: 50%;
  content: "";
  right: 100%;
  width: 100px;
  height: 1px;
  background-color: #ddd;
  margin-right: 10px;
}
.subtitle::after {
  position: absolute;
  top: 50%;
  content: "";
  left: 100%;
  width: 100px;
  height: 1px;
  background-color: #ddd;
  margin-left: 10px;
}
</style>
