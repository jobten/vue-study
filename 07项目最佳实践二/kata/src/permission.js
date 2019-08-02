import router from './router'
import store from './store'
import { Message } from 'element-ui'
import { getToken } from '@/utils/auth' // 从cookie获取令牌


const whiteList = ['/login']


router.beforeEach(async (to, from, next) => {
    const hasToken = getToken()

    if(hasToken) {
        if (to.path === '/login') {
            next( {path: '/'})
        } else {
            const hasRoles = store.getters.roles && store.getters.roles.length > 0

            if (hasRoles) {
                next()
            } else {
                try {
                    const { roles } = await store.dispatch('user/getInfo')

                    const accessRoutes = await store.dispatch('permission/generateRoutes', roles)

                    router.addRoutes(accessRoutes)

                    next({ ...to, replace: true }) 
                } catch(error) {
                    // 出错需重置令牌并重新登录（令牌过期、网络错误等原因）
                    await store.dispatch('user/resetToken')
                    Message.error(error || 'Has Error')
                    next(`/login?redirect=${to.path}`)
                }
                
            }
        }
    } else {
        if (whiteList.indexOf(to.path) !== -1) {
            // 白名单路由放过
            next()
        } else {
            next(`/login?redirect=${to.path}`)
        }
    }
})