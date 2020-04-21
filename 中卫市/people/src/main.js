import Vue from 'vue'
import App from './App.vue'
import echarts from 'echarts';

import 'element-ui/lib/theme-chalk/index.css';
import Element from 'element-ui';
import echartdir from './echartdir.js'


Vue.config.productionTip = false;
Vue.prototype.$echarts = echarts;
Window.echarts = echarts;
Vue.use(Element);

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
new Vue({
  render: h => h(App),
}).$mount('#app');