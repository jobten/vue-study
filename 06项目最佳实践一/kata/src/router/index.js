import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/layout' //布局页面

Vue.use(Router)

export const constRoutes = [
    {
        path: '/login',
        component: () => import('@/views/Login'),
        hidden: true //导航菜单忽略该项
    },
    {
        path: '',
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
                meta: {
                    title: 'Home',
                    icon: 'qq'
                }                
            },
            {
                path: 'home2',
                component: () => import('@/views/home'),
                meta: {
                    title: 'Home2',
                    icon: 'wx'
                }
            }
        ]
    }

]

export const asyncRoutes = [
    {
        path: '/about',
        component: Layout,
        redirect: '/about/index',
        children: [
            {
                path: 'index',
                component: () => import('@/views/about'),
                meta: {
                    title: 'About',
                    icon: 'qq',
                    roles: ['editor']
                }
            },
            {
                path: 'bla',
                component: () => import('@/views/about'),
                meta: {
                    title: 'About2',
                    icon: 'qq',
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