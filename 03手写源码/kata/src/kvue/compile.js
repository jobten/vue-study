class Compile {
    constructor(el, vm) {
        this.$vm = vm
        this.$el = document.querySelector(el)

        if (this.$el) {
            //1.将node转换成fragment
            this.$fragment = this.node2fragment(this.$el)
                //2.编译fragment
            this.compile(this.$fragment)
                //3. 将编译结果追加至宿主中(dom)
            this.$el.appendChild(this.$fragment)
        }
    }

    node2fragment(el) {
        const fragment = document.createDocumentFragment()
        let child
            // appendChild为移动操作, 所以每次将firstChild赋值给child,直到firstChild为空时循环停止
        while ((child = el.firstChild)) {
            fragment.appendChild(child)
        }
        return fragment
    }

    compile(el) {
        const childNodes = el.childNodes
        Array.from(childNodes).forEach(node => {
            if (this.isElement(node)) {
                this.compileElement(node)
            } else if (this.isInterpolation(node)) {
                this.compileText(node)
            }

            //   递归子元素
            if (node.childNodes && node.childNodes.length > 0) {
                this.compile(node);
            }
        })
    }

    isElement(node) {
        return node.nodeType === 1
    }

    isInterpolation(node) {
        return node.nodeType === 3 && /\{\{(.*)\}\}/.test(node.textContent)
    }

    compileText(node) {
        const exp = RegExp.$1
        this.update(node, this.$vm, exp, 'text')
    }

    compileElement(node) {
        // 查看是否有k-， @开头的属性
        const nodeAttrs = node.attributes
        Array.from(nodeAttrs).forEach(attr => {
            const attrName = attr.name
            const exp = attr.value

            // 目前只考虑k-text, k-html, k-model
            if (attrName.startsWith('k-')) {
                const dir = attrName.substring(2)
                    // const fn = this[dir]
                this[dir] && this[dir](node, this.$vm, exp)
            } else if (attrName.startsWith('@')) {
                const eventName = attrName.substring(1)

                this.eventHandler(node, this.$vm, exp, eventName)
            }
        })
    }

    text(node, vm, exp) {
        this.update(node, vm, exp, 'text')
    }

    html(node, vm, exp) {
        this.update(node, vm, exp, 'html')
    }

    model(node, vm, exp) {
        this.update(node, vm, exp, 'model')

        //输入时改变数据,更新界面
        node.addEventListener('input', el => {
            vm[exp] = el.target.value
        })
    }

    eventHandler(node, vm, exp, eventName) {
        const fn = vm.$options.methods && vm.$options.methods[exp]

        if (fn && eventName) {
            node.addEventListener(eventName, fn.bind(vm))
        }
    }

    // 编写update函数，它可复用
    // exp是表达式， dir是具体操作：text,html,model
    update(node, vm, exp, dir) {
        const fn = this[dir + 'Updator']
        fn && fn(node, vm[exp])

        new Watcher(vm, exp, function() {
            fn && fn(node, vm[exp])
        })
    }

    textUpdator(node, val) {
        node.textContent = val
    }

    htmlUpdator(node, val) {
        node.innerHTML = val
    }

    modelUpdator(node, val) {
        node.value = val
    }

}