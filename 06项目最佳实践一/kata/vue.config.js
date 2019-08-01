const path = require('path')

function resolve(dir) {
    return path.join(__dirname, dir)
}
module.exports = {
    publicPath: '/best-practice',
    devServer: {
        port: 8888
    },
    configureWebpack: {
        name: 'vue项目最佳实践'
    },
    chainWebpack(config) {
        config.module.rule('svg')
            .exclude.add(resolve('src/icons'))
            .end()

        config.module
            .rule('icons')
            .test(/\.svg$/)
            .include.add(resolve('src/icons'))
            .end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({ symbolId: 'icon-[name]'})//使用图标名称
            .end()
    }
}