<template>
    <!-- separator 数字分隔符 -->
  <VueCountUp class="number-grow"  :start-value="start" :endVal="parseInt(value)"  @ready="onReady" :options="{separator:'',duration:3}"></VueCountUp>
</template>

<script>
import VueCountUp from 'vue-countup-v2'
export default {
  props: ['value', 'datas'],
  components: {
    VueCountUp
  },
  data () {
    return {
      start: 0,
      instance: '',
      time: ''
    }
  },
  watch: {
  },
  mounted () {

  },
  methods: {
    onReady: function (instance, CountUp) {
      this.instance = instance
      // 修改固定模块时间
      // let _this=this
      // if(_this.datas.type==1){_this.time=20000}
      // else if(_this.datas.type==2){_this.time=34000}
      //  else if(_this.datas.type==3){_this.time=47000}
      //    else if(_this.datas.type==4){_this.time=40000}
      //    else if(_this.datas.type==5){_this.time=55000}
      //    else if(_this.datas.type==6){_this.time=45000}
      //    else if(_this.datas.type==7){_this.time=35000}
      //    else if(_this.datas.type==8){_this.time=65000}
      //    else if(_this.datas.type==9){_this.time=25000}
      //    else if(_this.datas.type==10){_this.time=35000}
      setInterval(this.resume, 10000)
    },
    resume () {
      this.instance.reset()
      this.instance.start()
    }
  }
}
</script>
<style scoped>
.number-grow-warp {
    transform: translateZ(0);
}
.number-grow {
    display: inline-block;
}
</style>
