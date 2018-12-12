/*
 * @Author: mikey.zhaopeng
 * @Date: 2018-12-12 11:05:56
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-12-12 12:40:20
 * desciption:
 *  1.实现父组件点击相应区域，能够切换到只显示对应区域的点位信息，目前是通过添加和移除标注点实现，后期考虑用自定义图层实现。
 */

<template>
  <div id="allmap"></div>
</template>

<script>
export default {
  data() {
    return {
      initMap: null,
      allPoints: null,
      currentMaker: null
    }
  },
  name: 'mapArea',
  mounted() {
    // 初始请求全市的所有点位，时间段为最大的时间段，精度为月
    /* 请求回来的数据格式为：
    ** res.data = [{
    **    color: "blue"
    **    id: "xy-m89x9810sc"
    **    location: "xx-路-号"
    **    pm10: 67,
    **    area: '成华区',
    **    positionX: 104.03260665
    **    positionY: 30.64152998
    **},...]
    */
    this.initMap = this.drawMap()
    this.$axios.get('http://localhost:3000/map').then(res => {
      // console.log(res.data)
      // 点位属于哪个区现在是前端的模拟，随机生成的，设计以后端返回的数据中就带上点位属于哪个区，前端不做判断
      let areas = ['青羊区', '武侯区', '金牛区', '武侯区']
      // 初始化点位,构建全市所需要的点位，并赋值到全局。
      this.allPoints = []
      res.data.forEach(element => {
        let point = new window.BMap.Point(element.positionX, element.positionY)
        let options = {
          id: element.id,
          color: element.color,
          location: element.location,
          pm10: element.pm10,
          // 目前后端没提供点位所属区域，由前端模拟。
          area: element.area === 'chenghua' ? '成华区' : areas[Math.floor(Math.random() * 4)]
        }
        this.allPoints.push({
          point,
          options
        })
        this.addMarker(point, options)
      })
    })
  },
  methods: {
    drawMap() {
      var map = new window.BMap.Map('allmap')
      // var point = new window.BMap.Point(104.02795346, 30.62994585)
      map.centerAndZoom('成都', 13)
      map.setMapStyle({ style: 'googlelite' })
      map.enableScrollWheelZoom(true)

      return map
    },
    areaTransform(str) {
      let Zh = null
      switch (str) {
        case 'wuhou':
          Zh = '武侯区'
          break
        case 'chenghua':
          Zh = '成华区'
          break
        case 'gaoxin':
          Zh = '高新区'
          break
        case 'shuangliu':
          Zh = '双流区'
          break
        case 'jingniu':
          Zh = '金牛区'
          break
      }
      return Zh
    },
    showPoints(area) {
      // 根据区域切换对应的点位
      let areaZH = this.areaTransform(area)
      let pointsSpecialArea = []
      this.allPoints.forEach(ele => {
        if (ele.options.area === areaZH) {
          pointsSpecialArea.push(ele)
          this.addMarker(ele.point, ele.options)
        }
      })
      console.log(pointsSpecialArea)
    },
    addMarker(point, options) {
      this.initMap.removeOverlay(this.currentMaker)
      var cleanIcon = new window.BMap.Icon(`../../static/imgs/${options.color}.png`, new window.BMap.Size(20, 20), {
      })
      cleanIcon.imageSize = new window.BMap.Size(20, 20)
      this.currentMaker = new window.BMap.Marker(point, { icon: cleanIcon })
      this.currentMaker.id = options.id

      this.currentMaker.addEventListener('click', (e) => {
        // console.log(e.currentTarget.id)
        let opts = {
          width: 250,
          height: 100,
          title: '点位信息',
          offset: new window.BMap.Size(0, 20)
        }
        var infoWindow = new window.BMap.InfoWindow(`<span>id: ${options.id}<span></br><span>pm10:${options.pm10}μg/m³</span></br><span>地理位置：${options.location}</span></br><span>区域：${options.area}</span>`, opts)
        this.initMap.openInfoWindow(infoWindow, point)
      })

      this.initMap.addOverlay(this.currentMaker)
      // map.removeOverlay(cleanMarker)
    }
  }
}
</script>

<style>
#allmap {
  width: 100%;
  height: calc(100% - 40px);
}
</style>
