// 通用 entry
import Vue from 'vue'
import App from './App.vue'
import { createRouter } from './router'

// 导出一个工厂函数，用于创建新的
// 应用程序、router 和 store 实例
export function createApp(context) {
    const router = createRouter()
    const app = new Vue({
        router,
        context,
        // 根实例简单的渲染应用程序组件。
        render: h => h(App)
    })

    return { app, router }
}