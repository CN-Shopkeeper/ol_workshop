const path = require("path");
module.exports = {
  // 配置方式一：使用VUE Cli提供的属性
  outputDir: "./build",
  // devServer: {
  //   proxy: {
  //     "^/api": {
  //       target: "http://152.136.185.210:5000",
  //       pathRewrite: {
  //         "^/api": ""
  //       },
  //       changeOrigin: true
  //     }
  //   }
  // },
  // 配置方式二：和webpack属性完全一致，最后会进行合并
  configureWebpack: {
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
        components: "@/components"
      }
    }
  }
};