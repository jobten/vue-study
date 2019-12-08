// 支持插值{{}}
// 支持v-text, v-html, v-model

class Compile {
    // el为挂载的根节点
    // vm为vue实例
    constructor(el, vm) {
            this.$el = document.querySelector(el)
            this.$vm = vm
            console.log("original el - ", this.$el)
            if (this.$el) {
                // 1. 将node转换成fragment
                this.$fragment = this.node2Fragment(this.$el)
                    // 2. 编译fragment, 将特殊片段转换成目标片段, 最终生成新的fragment
                this.compile(this.$fragment)
                    // 3. 将编译结果追加至DOM中
                this.$el.appendChild(this.$fragment)
                console.log('el after compiled - ', this.$el)
            }
        }
        //读取node，转换成代码片段Fragment(createDocumentFragment)
    node2Fragment(el) {
        // createdocumentfragment()方法创建了一虚拟的节点对象，节点对象包含所有属性和方法
        const fragment = document.createDocumentFragment()
        let child
            // appendChild为移动操作, 所以每次将firstChild赋值给child,直到firstChild为空时循环停止
            // 如果文档树中已经存在了newchild，它将从文档树中删除，然后重新插入它的新位置。
            // 如果newchild是DocumentFragment节点，则不会直接插入它，而是把它的子节点按序插入当前节点的childNodes[] 数组的末尾。
        while ((child = el.firstChild)) {
            fragment.appendChild(child)
        }
        return fragment
    }

    compile(el) {
        // 1. 遍历所有节点
        const childNodes = el.childNodes
        childNodes.forEach(node => {
            // 2. 通过nodeType判断node的类型，并根据不用类型做不同处理
            // nodeType 属性返回以数字值返回指定节点的节点类型。
            // 元素节点nodeType = 1， 代表元素
            // 元素节点nodeType = 2， 代表属性
            // 元素节点nodeType = 3， 代表文本内容

            // 是否是元素
            if (this.isElement(node)) {
                this.compileElement(node)
            } else if (this.isInterpolation(node)) { // 如果是插值
                this.compileText(node)
            }

            // 3. 递归子元素
            if (node.childNodes && node.childNodes.length > 0) {
                this.compile(node)
            }
        })
    }

    isElement(node) {
        return node.nodeType === 1
    }

    isInterpolation(node) {
        // 通过正则表达式判断文本是否为{{}}, (.*)是为了通过RegExp.$1拿出{{}}中内容
        return node.nodeType === 3 && /\{\{(.*)\}\}/.test(node.textContent)
    }

    compileElement(node) {
        console.log('compileElement node - ', node)
        const nodeAttrs = node.nodeAttrs
        nodeAttrs.forEach(attr => {
            const name = attr.name
            const value = attr.value

            if (name.startsWith('v-')) {
                const dir = name.substring(2)

            }
        })
    }

    compileText(node) {
        console.log('compileText node - ', node)
        const exp = RegExp.$1.trim() // 去除两端空格
        this.update(node, this.$vm, exp, 'text')
    }

    // 编写可复用的update函数，根据不同的节点类型做不同的操作
    // node是需要更新的节点
    // vm是vue实例
    // exp是表达式，即当前节点内容
    // dir表示节点类型: text, html, model
    update(node, vm, exp, dir) {
        console.log('update -', node, vm, exp, dir)
        const fn = this[dir + 'Updator']
        fn && fn(node, vm.$data[exp])
            // vm中将vm.$data直接映射到vm中, 所有vm[exp]实践为vm.$data[exp]的值
            // fn && fn(node, vm[exp])
    }

    textUpdator(node, val) {
        node.textContent = val
    }

    htmlUpdator(node, val) {
        node.innerHTML = val
    }

    modelUpdator(node, val) {

    }
}