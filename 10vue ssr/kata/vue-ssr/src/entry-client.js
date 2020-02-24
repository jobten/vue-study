import { createApp } from './app'

const { app, router } = createApp()

// 这里假定 App.vue 模板中根元素具有id="app"
router.onReady(() => {
    // 挂载
    app.$mount('#app')
})
