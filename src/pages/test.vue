<template>
  <div class="container">
    <relation-tree></relation-tree>
    <all-line-chart></all-line-chart>
    <history-date></history-date>
    <all-predict></all-predict>
    <week-predict></week-predict>
    <contribution-session></contribution-session>
    <div id="temppostion"></div>
  </div>
</template>

<script>
import relationTree from '../components/charts/relationtree'
import allLineChart from '../components/charts/allLineChart'
import historyDate from '../components/charts/historyDate'
import allPredict from '../components/charts/allpredict'
import weekPredict from '../components/charts/weekPredict'
import contributionSession from '../components/charts/contributionSession'

export default {
  name: 'test',
  data() {
    return {}
  },
  components: {
    relationTree,
    allLineChart,
    historyDate,
    allPredict,
    weekPredict,
    contributionSession
  }
}
</script>

<style>
.container {
  width: 100%;
}
#temppostion {
  width: 100px;
  height: 600px;
}
</style>
