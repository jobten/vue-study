import Home from './views/home'
import About from './views/about'
import Vue from 'vue'
import Router from 'vue-router'

const routes =  [
    {
        path: '/',
        name: 'home',
        component: Home,
    },
    {
        path: '/about',
        name: 'about',
        component: About,
        meta: {
            auth: true
        },
        beforeEnter(to, from, next) {
            if (!window.isAboutAuth) {
                if (window.confirm('about页面路由认证')) {
                    window.isAboutAuth = true
                } else {
                    next('/')
                }
            } else {
                next()
            }
        }
    }
]

Vue.use(Router)

const router = new Router()
router.addRoutes(routes)
router.beforeEach((to, from, next) => {
    if (to.meta.auth && !window.isLogin) {
        if (window.confirm('请登录')) {
            window.isLogin = true
            next()
        } else {
            next('/')
        }
    } else {
        next()
    }
})

export default router
