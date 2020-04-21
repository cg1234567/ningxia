<template>
  <div id="bg">
    <!-- <div class="select">
      <router-link to="/index">
        <div class="link_select">
          <span style="color: aliceblue;">云健康</span>
        </div>
      </router-link>
    </div> -->
  </div>
</template>

<script>

export default {
  name: 'home',
  components: {
  },
  created () {
    this.$router.push('/index')
  }
}
</script>
<style lang="stylus">
body {
    display: block;
    margin: 0;
}
#bg
  height 100%
  width 100%
  background url('../assets/img/bg.png') no-repeat fixed center
  background-size: 100% 100%;
  position fixed
#nav
  height 100%
  width 100%
.select
  margin-top: 35vh;
  text-align center
  font-size 36px;
  font-family:PingFang-SC-Bold,PingFang-SC;
  font-weight:bold;
  color:rgba(255,255,255,1);
  display: flex;
  justify-content: center;
#icon_bg
  height 100%
  width 100%
  position absolute
  z-index -1
.icon_bg_icon
 font-size 18rem
 color rgba(2, 250, 253, .5)
.link_select
  display: flex;
  flex-direction: column;
  margin: 35px;
.link_select span
  font-size 50px;
  display: flex;
  flex-direction: column;
  margin: 35px;
</style>
