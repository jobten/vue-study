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
        const fragment = document.createDocumentFragment(el)
        let child
        while ((child=el.firstChild)) {
            fragment.appendChild(child)
        }
        return fragment
    }

    compile(el) {
        const childNodes = el.childNodes
        Array.from(childNodes).forEach(node => {
            if (this.isElement(node)) {
                console.log("编译元素：" + node.nodeName)
            } else if (this.isInterpolation(node)) {
                console.log("编译文本：" + node.textContent)
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

}