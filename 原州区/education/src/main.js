import Vue from 'vue'
import App from './App.vue'
import china from 'echarts/map/json/china.json'
import echarts from 'echarts';

import 'element-ui/lib/theme-chalk/index.css';
import Element from 'element-ui';
import highcharts from 'highcharts'
import VueHighCharts from 'vue-highcharts'
import highcharts3d from 'highcharts/highcharts-3d'

highcharts3d(highcharts)

Vue.config.productionTip = false;
echarts.registerMap('china', china);
Vue.prototype.$echarts = echarts;
Window.echarts = echarts;
Vue.use(Element);
new Vue({
  render: h => h(App),
}).$mount('#app');
