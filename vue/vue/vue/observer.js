function observe(value) {
    return new Observer(value)
}

// 对data数据进行数据劫持
class Observer {
    constructor(value) {
        this.value = value
        this.dep = new Dep()

        if (value) {
            if (typeof(value) === "array") {
                this.observeArray(value)
            } else {
                this.walk(value)
            }
        }
    }

    // 通过defineProperty做数据劫持，重写set和get方法
    // get方法添加依赖(depend)， set方法通知Dep更新(notify)
    defineReactive(obj, key) {
        // 创建Dep实例， 与data中key一一对应
        const dep = new Dep()
        let val = obj[key]

        Object.defineProperty(obj, key, {
            enumerable: true, // 是否可配置，是否可删除，默认为false
            configurable: true, // 是否是可遍历属性，如是否可用forin, foreach进行遍历，默认为false
            get() {
                Dep.target && dep.depend(Dep.target)
                return val
            },
            set(newVal) {
                console.log('setter was called!!! ', 'oldVal[', val, '], newVal[', newVal, ']')
                if (newVal !== val) {
                    val = newVal
                    dep.notify()
                }
            }
        })
    }

    // 数组则需要通过递归做深度遍历
    observeArray(array) {
        for (let i = 0; i < array.length; i++) {
            observe(array[i])
        }
    }

    // 遍历对象，调用defineReactive方法
    walk(obj) {
        const keys = Object.keys(obj)
        for (let i = 0; i < keys.length; i++) {
            this.defineReactive(obj, keys[i])
        }
    }
}