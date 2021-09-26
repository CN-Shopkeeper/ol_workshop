const path = require("path");
module.exports = {
  // 配置方式一：使用VUE Cli提供的属性
  outputDir: "./build",
  publicPath: "/learning/ol-workshop",
  configureWebpack: {
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
        components: "@/components"
      }
    }
  }
};
