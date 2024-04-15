// const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
//   transpileDependencies: true,
//   configureWebpack: {
//     externals: {
//       'BaiduMap': 'BMap'
//     }
//   }
// })
module.exports = {
  // context: path.resolve(__dirname, '../'),
  // entry: { app: './src/main.js' },
  transpileDependencies: true,
  lintOnSave: false,
  //百度地图配置20180518
  configureWebpack: {
    externals: {
      'BMap': 'BMap'
    }
  }
}