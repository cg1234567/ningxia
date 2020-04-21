<template>
  <div id="fg_chart" style="height: 90%;margin: 0 auto;width: 100%"></div>
</template>

<script>
// @ is an alias to /src
export default {
  data () {
    return {
      Chart1: ''
    }
  },
  computed: {
  },
  mounted () {
    this.setChartOption()
  },
  methods: {
    setChartOption () {
      // 基于准备好的dom，初始化echarts实例
      this.Chart1 = this.$echarts.init(document.getElementById('fg_chart')) // 重点
      var plantCap = [{
        name: '好评!',
        value: '100'
      }, {
        name: '好评!',
        value: '10'
      }, {
        name: '好评!',
        value: '10'
      }, {
        name: '好评!',
        value: '10'
      }, {
        name: '好评!',
        value: '10'
      }, {
        name: '好评!',
        value: '10'
      }, {
        name: '好评!',
        value: '10'
      }, {
        name: '好评!',
        value: '10'
      }, {
        name: '好评!',
        value: '10'
      }, {
        name: '好评!',
        value: '10'
      }]

      var datalist = [{
        offset: [56, 48],
        symbolSize: 0.1,
        opacity: 0.95,
        color: '#ff67ce'
      }, {
        offset: [46, 58],
        symbolSize: 0.1,
        opacity: 0.95,
        color: '#f467ce'
      }, {
        offset: [35, 80],
        symbolSize: 0.1,
        opacity: 0.88,
        color: '#7aabe2'
      }, {
        offset: [20, 43],
        symbolSize: 0.1,
        opacity: 0.84,
        color: '#ff7123'
      }, {
        offset: [83, 30],
        symbolSize: 0.1,
        opacity: 0.8,
        color: '#f467ce'
      }, {
        offset: [36, 20],
        symbolSize: 0.1,
        opacity: 0.75,
        color: '#ff7123'
      }, {
        offset: [64, 40],
        symbolSize: 0.1,
        opacity: 0.7,
        color: '#f467ce'
      }, {
        offset: [75, 75],
        symbolSize: 0.1,
        opacity: 0.68,
        color: '#f467ce'
      }, {
        offset: [80, 62],
        symbolSize: 0.1,
        opacity: 0.6,
        color: '#ff7123'
      }, {
        offset: [30, 62],
        symbolSize: 0.1,
        opacity: 0.6,
        color: '#ff7123'
      }]
      var datas = []
      for (var i = 0; i < plantCap.length; i++) {
        var item = plantCap[i]
        var itemToStyle = datalist[i]
        datas.push({
          name: item.name,
          value: itemToStyle.offset,
          symbolSize: itemToStyle.symbolSize,
          label: {
            normal: {
              color: itemToStyle.color,
              textStyle: {
                fontSize: 22
              }
            }
          },
          itemStyle: {
            normal: {
              color: itemToStyle.color,
              opacity: itemToStyle.opacity
            }
          }
        })
      }
      var option = {
        grid: {
          show: false,
          top: 10,
          bottom: 10
        },
        xAxis: [{
          gridIndex: 0,
          type: 'value',
          show: false,
          min: 0,
          max: 100,
          nameLocation: 'middle',
          nameGap: 5
        }],
        yAxis: [{
          gridIndex: 0,
          min: 0,
          show: false,
          max: 100,
          nameLocation: 'middle',
          nameGap: 30
        }],
        series: [{
          type: 'scatter',
          symbol: 'circle',
          symbolSize: 120,
          label: {
            normal: {
              show: true,
              formatter: '{b}',
              color: '#fff',
              textStyle: {
                fontSize: '20'
              }
            }
          },
          itemStyle: {
            normal: {
              color: '#00acea'
            }
          },
          data: datas
        }]
      }
      this.Chart1.setOption(option, true)
      var _this = this
      window.addEventListener('resize', function () {
        _this.Chart1.resize()
      })
      // window.addEventListener('resize', function () {
      //   this.Chart1.resize()
      // })
      // setOption：设置图表实例的配置项以及数据，万能接口，所有参数和数据的修改都可以通过它完成，ECharts会合并新的参数和数据，然后刷新图表。
    }
  }
}
</script>

<style lang="stylus">
</style>
