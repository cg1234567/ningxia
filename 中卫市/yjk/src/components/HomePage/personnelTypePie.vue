<template>
  <div id="pt_chart" style="height: 90%;margin: 0 auto;width: 100%"></div>
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
      this.Chart1 = this.$echarts.init(document.getElementById('pt_chart')) // 重点
      var m2R2Data = [
        { value: 335, legendname: '工人', name: '工人  335', itemStyle: { color: '#5B8FF9' } },
        { value: 310, legendname: '老师', name: '老师  310', itemStyle: { color: '#5AD8A6' } },
        { value: 234, legendname: '职员', name: '职员  234', itemStyle: { color: '#5D7092' } },
        { value: 154, legendname: '学生', name: '学生  154', itemStyle: { color: '#F6BD16' } },
        { value: 335, legendname: '司机', name: '司机  335', itemStyle: { color: '#E8684A' } },
        { value: 335, legendname: '公务员', name: '公务员  335', itemStyle: { color: '#6DC8EC' } }
      ]

      const option = {
        tooltip: {
          trigger: 'item',
          formatter: function (parms) {
            var str = parms.seriesName + '</br>' +
            parms.marker + '' + parms.data.legendname + '</br>' +
            '数量：' + parms.data.value + '</br>' +
            '占比：' + parms.percent + '%'
            return str
          }
        },
        legend: {
          type: 'scroll',
          orient: 'vertical',
          left: '70%',
          align: 'left',
          top: '10%',
          textStyle: {
            color: '#8C8C8C'
          },
          height: 250
        },
        series: [
          {
            name: '标题',
            type: 'pie',
            center: ['35%', '40%'],
            radius: ['40%', '65%'],
            clockwise: false, // 饼图的扇区是否是顺时针排布
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: true,
                position: 'inside',
                formatter: function (parms) {
                  return parms.data.value
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: m2R2Data
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
        if (currentIndex > 4) {
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
