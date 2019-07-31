import Vue from 'vue'
import Home from './views/home'
import About from './views/about'

class VueRouter {
    constructor(option) {
        this.$option = option
        this.routeMap = {}

        //路由响应式
        this.app = new Vue({
            data: {
                current: '/'
            }
        })
    }

    init() {
        this.bindEvents()// url的变化监听
        this.createRouteMap(this.$option.routes)//解析路由配置
        this.initComponent()//实现两个全局组件
    }

    bindEvents() {
        // onHashChange中需要使用VueRouter中的this
        window.addEventListener('load', this.onHashChange.bind(this))
        window.addEventListener('hashchange', this.onHashChange.bind(this))
    }

    onHashChange() {
        this.app.current = window.location.hash.slice(1) || '/'
    }

    createRouteMap(routes) {
        routes.forEach(item => {
            this.routeMap[item.path] = item.component
        })
    }

    initComponent() {
        Vue.component('router-link', {
            props: {
                to: String
            },
            render(h) {
                // h(tag, data, children)
                return h('a', {
                    attrs: {
                        href: '#' + this.to
                    }
                }, [this.$slots.default])
            }
        })
        //此时应该为箭头函数，因为需要使用VueRouter中的this
        Vue.component('router-view', {
            render: h => {
                return h(this.routeMap[this.app.current])
            }
        })
    }
}

// Vue以参数的形式传入比较好
VueRouter.install = function(Vue) {
    Vue.mixin({
        beforeCreate() {
            // 只在根节点执行
            if (this.$options.router) {
                Vue.prototype.$router = this.$options.router
                this.$options.router.init()
            }
        }
    })   
}

Vue.use(VueRouter);

export default new VueRouter({
  routes: [{ path: "/", component: Home }, { path: "/about", component: About }]
});