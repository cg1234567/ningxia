import Vue from 'vue'
import App from './App.vue'
import echarts from 'echarts';

import 'element-ui/lib/theme-chalk/index.css';
import Element from 'element-ui';


Vue.config.productionTip = false;
Vue.prototype.$echarts = echarts;
Window.echarts = echarts;
Vue.use(Element);
new Vue({
  render: h => h(App),
}).$mount('#app');
