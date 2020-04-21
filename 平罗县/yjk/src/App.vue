<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="stylus">
::-webkit-scrollbar{
            width:5px;
            background-color: #0e487c;
          }
          ::-webkit-scrollbar-thumb{
            background-color: #4facfa;
          }
body
  margin 0
#app
  font-family 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  color #2c3e50
body .el-table::before {
  z-index: inherit;
}
.el-popover
    background: rgba(69,175,220,0.35)!important;
    border:1px solid rgba(165,245,255,1)!important;
</style>
