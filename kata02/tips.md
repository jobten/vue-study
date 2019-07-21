## tips：
1. render
2. 混入
3. 路由传参
4. 命名路由


## vue router的实现原理
### 整体思路:
1. 插件实现，Vue.use
2. 监听url的变化
3. 解析路由配置
4. 实现全局组件, router-view和router-link

#### 插件实现
需要有install方法，在install方法中
    - 混入beforeCreate钩子
    - beforCreate中赋值vue.prototype.$router为this.$option.router，并且调用init方法

#### 监听url的变化
通过监听load和hashchange事件, 解析url存储当前的路径的path

### 解析路由配置
路径和component存储在routeMap中

### 实现全局组件
通过render函数渲染标签
1. router-link
    映射为a标签, to值作为href

2. router-view
    遍历routeMap,将当前路由对应组件渲染出来

## vuex的实现原理
### 整体思路：
