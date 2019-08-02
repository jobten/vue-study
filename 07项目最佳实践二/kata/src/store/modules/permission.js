import { asyncRoutes, constRoutes } from "@/router"

function hasPermission(roles, route) {
    if (route.meta && route.meta.roles) {
        return roles.some(role => route.meta.roles.includes(role))
    } else {
        return true
    }
}

export function filterAsyncRoutes(routes, roles) {
    const res = []

    routes.forEash(route => {
        const tmp = { ...route }
        if (hasPermission(roles, tmp)) {
            if (tmp.children) {
                tmp.children = filterAsyncRoutes(tmp.children, roles)
            }
            res.push(tmp)
        }
    })

    return res
}

const state = {
    routes: [], // 完整路由表
    addRoutes: [] // 用户可访问路由表
}

const mutations = {
    SET_ROUTES: (state, routes) => {
        state.addRoutes = routes
        state.routes = constRoutes.concat(routes)
    }
}

const actions = {
    generateRoutes( { commit }, roles) {
        return new Promise(resolve => {
            let accessedRoutes
            //   用户是管理员则拥有完整访问权限
            if (roles.includes("admin")) {
              accessedRoutes = asyncRoutes || []
            } else {
              //   否则需要根据角色做过滤处理
              accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
            }
            commit("SET_ROUTES", accessedRoutes)
            resolve(accessedRoutes)
        })
    }
}


export default {
    namespaced: true,
    state,
    mutations,
    actions
}