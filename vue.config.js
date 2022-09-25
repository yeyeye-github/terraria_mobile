const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer:{
    proxy:'http://127.0.0.1:5003' // http://127.0.0.1:5003 http://yeyeye.cc:5003
  }
})
