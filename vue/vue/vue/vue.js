// 支持data
// 支持created声明周期
// 支持methods
class Vue {
    constructor(options) {
        this.$option = options
        this.$data = (typeof(options.data) === 'function') ? options.data() : options.data //data为函数时为执行后结果

        // 将this.$data直接映射到this中, 方便使用
        for (const key in this.$data) {
            this.proxyData(key)
        }

        observe(this.$data)
        new Compile(this.$option.el, this)

        if (options.created) {
            options.created.call(this);
        }
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