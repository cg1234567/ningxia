<template>
  <div id="index">
    <div id="title">
      <div>云健康</div>
    </div>
    <div id="content">
      <HomePage></HomePage>
    </div>
    <div id="sqMap">
      <sqMap :data=this.mapData></sqMap>
    </div>
  </div>
</template>
<script>
import HomePage from '@/components/HomePage.vue'
import sqMap from '@/components/HomePage/suqianMap.vue'
import { mapState, mapActions } from 'vuex'
export default {
  components: {
    HomePage,
    sqMap
  },
  computed: {
    ...mapState('HomePage', [
      'mapData',
      'name'
    ])
  },
  methods: {
    ...mapActions('HomePage', [
      'invokeGetMapData',
      'invokeGetAllData'
    ])
  },
  created () {
    this.invokeGetMapData()
  }
}
</script>
<style scoped lang="stylus">
#title
  width: 100%
  height 10%
  position: absolute;
  text-align: center;
  background url('../assets/img/title.png') no-repeat
  background-size: 100% 100%
#title div
  margin-top 1vh
  font-size:30px;
  font-family:PingFangSC-Semibold,PingFang SC;
  font-weight:300;
  color:rgba(255,255,255,1);
  line-height:42px;
  letter-spacing:3px;
#content
  width: 100%;
  padding-top 9vh
  position: fixed
#sqMap
  position absolute
  width 100%
  height 100%
  z-index -2
  background: radial-gradient(rgba(4,24,37,0), rgba(4,24,37,1));
</style>
