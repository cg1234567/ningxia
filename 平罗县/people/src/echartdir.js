import Vue from 'vue'
import echarts from 'echarts'

Vue.directive('echartinit', {
  inserted: function(el, binding) {
    let myChart = echarts.init(el)
    let option = binding.value

    myChart.showLoading()
    myChart.setOption(option)
    myChart.hideLoading()
    let oldResize = window.onresize
    window.onresize = () => {
      oldResize()
      myChart.resize()
    }
    window.tools.loopShowTooltip(myChart, option, { loopSeries: true, interval: 6000 });
  },
  update: function(el, binding) {
    let myChart = echarts.getInstanceByDom(el)
    let option = binding.value

    myChart.setOption(option)
  }
})