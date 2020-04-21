import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import echarts from 'echarts'
import axios from 'axios'
// import VueAMap from 'vue-amap'

// Vue.use(VueAMap)
// VueAMap.initAMapApiLoader({
//   key: 'd9619166d3d6c0e13aeaf186c5185f8e',
//   plugin: ['AMap.DistrictSearch', 'AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
//   // 默认高德 sdk 版本为 1.4.4
//   v: '1.4.15'
// })

Vue.prototype.axios = axios
Vue.prototype.$echarts = echarts
Vue.use(ElementUI)
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
