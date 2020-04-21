module.exports = {
  publicPath: './',
  outputDir: 'dist',
  productionSourceMap: false,
  devServer: {
    open: true,
    host: 'localhost',
    port: 9029,
    https: false,
    hotOnly: false,
    proxy: null
  },
  configureWebpack: {
    externals: {
      AMap: 'AMap' // 高德地图配置
    }
  }
}
