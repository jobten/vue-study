// 支持data
// 支持created声明周期
// 支持methods
class Vue {
    constructor(options) {
        this.$option = options
        this.$data = (typeof(options.data) === 'function') ? options.data() : options.data //data为函数时为执行后结果
        new Compile(this.$option.el, this)
    }
}