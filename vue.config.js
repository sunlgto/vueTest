module.exports = {
    publicPath: "./",
    productionSourceMap: false,
    // 部署应用时的基本 URL
    // 所有 webpack-dev-server 的选项都支持
    devServer: {
        //项目端口号
        port: 8888,
        proxy: {
            '/api': {
                target: 'http://localhost:9000/',
                changeOrigin: true,
                ws: true,
                //secure: false, //如果是http接口，需要配置该参数
                pathRewrite: {
                    '^/api': ''
                }
            }
        },


    }
}