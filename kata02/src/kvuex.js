let Vue

class Store {
    constructor(options) {
        this.state = new Vue({
            data: options.state
        })
        this.mutations = options.mutations
        this.actions = options.actions
        options.getters && this.gettersHandle(options.getters)
    }

    //因为dispatch中会调用commit，有可能使commit中的this指向发生变化
    //所以使用箭头函数，这样commit中的this指向就不会发生变化
    commit = (type, arg) => {
        this.mutations[type](this.state, arg)
    }

    dispatch(type, arg) {
        this.actions[type]({
            commit: this.commit,
            state: this.state
        }, arg)
    }

    gettersHandle(getters) {
        this.getters = {}
        Object.keys(getters).forEach(key => {
            Object.defineProperty(this.getters, key, {
                get: () => {
                    return getters[key](this.state)
                }
            })
        })
    }
}

function install(_Vue) {
    Vue = _Vue

    Vue.mixin({
        beforeCreate() {
            if (this.$options.store) {
                Vue.prototype.$store = this.$options.store
            }
        }
    })
}

export default { Store, install }