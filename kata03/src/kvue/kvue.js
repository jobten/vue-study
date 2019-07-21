class KVue {
    constructor(options) {
        this.$options = options
        this.$data = options.data

        //数据响应
        this.observe(this.$data)

            // 创建编译器
        new Compile(options.el, this)

        if (options.created) {
            options.created.call(this);
        }
    }

    observe(obj) {
        if (!obj || typeof obj !== "object") {
            return
        }
        Object.keys(obj).forEach(key => {
            this.defineReactive(obj, key, obj[key])
            this.proxyData(key)
        })
    }

    defineReactive(obj, key, val) {

        //递归
        this.observe(val)

        //创建Dep实例，与data中key一一对应
        const dep = new Dep()

        Object.defineProperty(obj, key, {
            get() {
                Dep.target && dep.addDep(Dep.target)
                return val
            },
            set(newVal) {
                if(newVal !== val) {
                    val = newVal
                    dep.notify()
                }
            }
        })
    }

    proxyData(key) {
        Object.defineProperty(this, key, {
            get() {
                return this.$data[key]
            },
            set(newVal) {
                this.$data[key] = newVal
            }
        })
    }
}

class Dep {
    constructor() {
        this.deps = []
    }
    addDep(watcher) {
        this.deps.append(watcher)
    }
    notify() {
        this.deps.forEach(watcher => watcher.update())
    }
}

class Watcher {
    constructor(vm, key, cb) {
        this.vm = vm
        this.key = key
        this.cb = cb

        //将当前实例指向Dep.target
        Dep.target = this
        this.vm[this.key] //读一次key触发getter
        Dep.target = null
    }
    update() {
        // this.vm[this.key]相当于this.vm.data[this.key]
        this.cb.call(this.vm, this.vm[this.key])
    }
}