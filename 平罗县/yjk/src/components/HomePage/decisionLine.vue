<template>
  <div id="d_chart" style="height: 90%;margin: 0 auto;width: 100%"></div>
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
      this.Chart1 = this.$echarts.init(document.getElementById('d_chart')) // 重点
      var xData = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']
      var yData1 = [12, 5, 12, 46, 22, 24, 15, 5, 54, 18, 24, 18]
      var option = {
        tooltip: {
          trigger: 'axis'
        },
        grid: {
          right: '10%',
          bottom: '1%',
          left: '10%',
          top: '20%',
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          data: xData,
          name: '时间',
          nameTextStyle: {
            color: '#fff'
          },
          axisLine: {
            lineStyle: {
              color: '#fff'
            }
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: '#FFF',
              fontSize: 12
            }
            // interval:0,
            // rotate:30
          }
        }],
        yAxis: [{
          type: 'value',
          nameTextStyle: {
            color: '#fff'
          },
          position: 'left',
          axisLine: {
            show: false,
            lineStyle: {
              color: '#fff'
            }
          },
          splitLine: {
            lineStyle: {
              color: '#fff'
            }

          },
          axisLabel: {
            color: '#fff',
            fontSize: 12
          }
        }],
        series: [{
          name: '数量',
          type: 'line',
          yAxisIndex: 0,
          symbolSize: 12,
          lineStyle: {
            normal: {
              width: 5
            }
          },
          itemStyle: {
            normal: {
              color: '#FFBE07',
              label: {
                show: true,
                textStyle: {
                  color: '#fff'
                },
                position: 'top',
                formatter: function (p) {
                  return p.value > 0 ? (p.value) : ''
                }
              }
            }
          },
          data: yData1
        }
        ]
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
