<template>
  <div id="isp_chart" style="height: 90%;margin: 0 auto;width: 100%"></div>
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
      this.Chart1 = this.$echarts.init(document.getElementById('isp_chart')) // 重点
      const option = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          x: '70%',
          y: 'center',
          icon: 'circle',
          textStyle: {
            fontSize: 12,
            color: 'rgb(255,255,255,1)'
          },
          data: ['某某病1', '某某病2', '某某病3']
        },
        series: [
          {
            name: '病因',
            type: 'pie',
            radius: '60%',
            center: ['40%', '40%'],
            color: ['#38baf4', '#41e9ac', '#d9bb60', '#259C25'],
            data: [
              { value: 335, name: '某某病1', selected: true },
              { value: 310, name: '某某病2' },
              { value: 234, name: '某某病3' }
            ],
            label: {
              normal: {
                textStyle: {
                  fontSize: 14
                },
                formatter: '{c}'
              }
            },
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(56, 186, 255, 1)'
              }
            }
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
        if (currentIndex > 6) {
          currentIndex = 0
        }
      }, 1000)
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
