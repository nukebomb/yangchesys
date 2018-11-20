<template>
  <div class="analysis-container">
    <div class="analysis-predict-container">
      <div class="predict-left">
        <span class="predict-title">全市预测趋势</span>
        <div class="inputs-section">
          <el-form :model="analysisPredictForm">
            <el-form-item label="区域" prop="area">
              <el-cascader expand-trigger="hover" :options="analysisOptions" v-model="analysisPredictForm.area"></el-cascader>
            </el-form-item>
            <!-- <el-form-item label="日期" prop="date">
              <el-date-picker v-model="analysisPredictForm.date" type="daterange" range-separator="至" size="mini"></el-date-picker>
            </el-form-item> -->
            <el-form-item><el-button class="predict-btn" type="primary">提交</el-button></el-form-item>
          </el-form>
        </div>
      </div>
      <div class="predict-middle">
        <all-predict></all-predict>
      </div>
      <div class="predict-right">
        <week-predict></week-predict>
      </div>
    </div>
    <div class="analysis-contribute-container"></div>
    <div class="analysis-relation-container"></div>
  </div>
</template>

<script>
import allPredict from '../components/charts/allpredict'
import weekPredict from '../components/charts/weekPredict'
export default {
  components: {
    allPredict,
    weekPredict
  },
  data() {
    return {
      analysisPredictForm: {
        area: null,
        date: null
      },
      analysisOptions: [
        {
          value: 'allcity',
          label: '全市'
        },
        {
          value: 'zones',
          label: '区域',
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
        }
      ]
    }
  }
}
</script>

<style>
.analysis-predict-container {
  width: calc(100% - 40px);
  height: 300px;
  margin: 20px;
  border: 1px solid rgba(192, 191, 191, 0.3);
  background-color: lightblue;
  padding: 20px;
  display: flex;
}
.predict-left {
  width: 300px;
  margin: 0 20px 0 0;
}
.predict-title {
  font-size: 1.2em;
}
.inputs-section {
  margin-top: 40px;
}
.predict-btn {
  margin-left: 40px;
  width: 200px;
}
.predict-middle {
  flex-grow: 2;
  /* background-color: yellow; */
  margin: 0 20px 0 0;
}
.predict-right {
  flex-grow: 2;
  /* background-color: yellow; */
}
.analysis-contribute-container {
  width: calc(100% - 40px);
  height: 300px;
  margin: 20px;
  border: 1px solid rgba(192, 191, 191, 0.3);
  background-color: lightcyan;
}
.analysis-relation-container {
  width: calc(100% - 40px);
  height: 300px;
  margin: 20px;
  border: 1px solid rgba(192, 191, 191, 0.3);
  background-color: lightyellow;
}
</style>
