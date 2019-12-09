class Watcher {
    constructor(vm, key, cb) {
        this.$vm = vm
        this.$key = key
        this.$cb = cb

        //将当前实例指向Dep.target
        Dep.target = this
        this.$vm[this.$key] //读一次key触发getter,以便dep => depend => push(watcher)
        Dep.target = null
    }

    update() {
        this.$cb && this.$cb.call(this.$vm, this.$vm[this.$key])
    }
}