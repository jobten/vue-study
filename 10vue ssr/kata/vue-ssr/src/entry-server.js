import { createApp } from './app'

export default context => {
    // 返回Promise， 确保路由或组件准备就绪
    return new Promise((resolve, reject) => {
        const { app, router } = createApp(context)
        // 跳转首屏地址
        router.push(context.url)
        // 路由就绪完成Promise
        router.onReady(() => resolve(app), reject)
    })
}
