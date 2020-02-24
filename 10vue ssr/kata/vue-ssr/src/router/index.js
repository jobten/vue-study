import Vue from 'vue'
import Router from 'vue-router'

import Index from '@/components/Index'
import Detail from '@/components/Detail'

Vue.use(Router)

// 导出的是Router的实例工厂函数，这也是会加大后台的负载能力
export function createRouter() {
    return new Router({
        mode: 'history',
        routes: [
            {
                path: '',
                component: Index
            },
            {
                path: '/detail',
                component: Detail
            }
        ]
    })
}