<template>
  <div id="c_chart" style="height: 90%;margin: 0 auto;width: 100%"></div>
</template>

<script>
import echarts from 'echarts'
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
      this.Chart1 = this.$echarts.init(document.getElementById('c_chart')) // 重点
      const option = {
        tooltip: {
          trigger: 'axis'
        },
        grid: {
          left: '5%',
          right: '7%',
          bottom: '10%',
          containLabel: true
        },
        legend: {
          icon: 'rect',
          itemWidth: 14,
          itemHeight: 5,
          itemGap: 13,
          data: ['2018', '2019'],
          right: '4%',
          textStyle: {
            fontSize: 12,
            color: 'rgb(255,255,255,1)'
          }
        },
        xAxis: [{
          type: 'category',
          name: '月',
          data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
          axisLine: {
            lineStyle: {
              color: '#999'
            }
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: '#fff'
            }
          }
        }],
        yAxis: [{
          type: 'value',
          name: '数量',
          splitNumber: 4,
          splitLine: {
            lineStyle: {
              type: 'dashed',
              color: '#DDD'
            }
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: '#333'
            }
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: '#fff'
            }
          },
          nameTextStyle: {
            color: '#fff'
          },
          splitArea: {
            show: false
          }
        }],
        series: [{
          name: '2018',
          type: 'line',
          symbol: 'none',
          data: [23, 60, 20, 36, 23, 85, 23, 60, 20, 36, 23, 85],
          lineStyle: {
            normal: {
              width: 4,
              color: {
                type: 'linear',
                colorStops: [{
                  offset: 0,
                  color: '#28C0C7' // 0% 处的颜色
                }, {
                  offset: 1,
                  color: '#28C0C7' // 100% 处的颜色
                }],
                globalCoord: false // 缺省为 false
              },
              shadowColor: 'rgba(72,216,191, 0.3)',
              shadowBlur: 10,
              shadowOffsetY: 20
            }
          },
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                offset: 0,
                color: '#28C0C7'
              }, {
                offset: 1,
                color: '#28C0C7'
              }])
            }
          }
        }, {
          name: '2019',
          type: 'line',
          symbol: 'none',
          data: [13, 20, 30, 16, 33, 55, 13, 20, 30, 16, 33, 55],
          lineStyle: {
            normal: {
              width: 4,
              color: {
                type: 'linear',
                colorStops: [{
                  offset: 0,
                  color: '#F5A623' // 0% 处的颜色
                }, {
                  offset: 1,
                  color: '#F5A623' // 100% 处的颜色
                }],
                globalCoord: false // 缺省为 false
              },
              shadowColor: 'rgba(72,216,191, 0.3)',
              shadowBlur: 10,
              shadowOffsetY: 20
            }
          },
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                offset: 0,
                color: '#F5A623'
              }, {
                offset: 1,
                color: '#F5A623'
              }])
            }
          }
        }]
      }
      this.Chart1.setOption(option, true)
      let lastIndex = 0
      let currentIndex = 0
      setInterval(() => {
        this.Chart1.dispatchAction({
          type: 'downplay',
          seriesIndex: 0,
          dataIndex: lastIndex
        })
        this.Chart1.dispatchAction({
          type: 'highlight',
          seriesIndex: 0,
          dataIndex: currentIndex
        })
        this.Chart1.dispatchAction({
          type: 'showTip',
          seriesIndex: 0,
          dataIndex: currentIndex
        })
        lastIndex = currentIndex
        ++currentIndex
        if (currentIndex > 12) {
          currentIndex = 0
        }
      }, 2000)
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
