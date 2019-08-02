import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/layout' //布局页面

Vue.use(Router)

// 通用页面：这里的配置时不需要权限的
export const constRoutes = [
    {
        path: '/login',
        component: () => import('@/views/Login'),
        hidden: true //导航菜单忽略该项
    },
    {
        path: '/',
        component: Layout,
        redirect: '/home',
        meta: {
            title: '首页',
            icon: 'qq'
        },
        children: [
            {
                path: 'home',
                component: () => import('@/views/home'),
                name: 'home',
                meta: {
                    title: 'Home',
                    icon: 'wx'
                }                
            },
            {
                path: 'mua',
                component: () => import('@/views/home'),
                name: 'mua',
                meta: {
                    title: 'Home2',
                    icon: 'wx'
                }
            }
        ]
    }

]
// 权限页面
export const asyncRoutes = [
    {
        path: '/about',
        component: Layout,
        redirect: '/about/index',
        meta: {title: '关于', icon:'qq'},
        children: [
            {
                path: 'index',
                component: () => import('@/views/about.vue'),
                name: "about",
                meta: {
                    title: 'About',
                    icon: 'wx',
                    roles: ['editor']
                }
            },
            {
                path: 'bla',
                component: () => import('@/views/about.vue'),
                name: "bla",
                meta: {
                    title: 'About2',
                    icon: 'wx',
                    roles: ['admin']
                }
            }
        ]
    }
]

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: constRoutes
})