<template>
    <div>
      <h2>商品列表</h2>
      <ul>
        <li v-for="good in goods" :key="good.id">
          <nuxt-link :to="{name: 'index-id', params: { id: good.id }}">
            <span>{{ good.text }}</span>
            <span>￥{{ good.price }}</span>
            <button @click.prevent="addCart(good)">加购物车</button>
          </nuxt-link>
        </li>
      </ul>
      <!--添加路由视图-->
      <nuxt-child></nuxt-child>
    </div>
</template>

<script>
export default {
  head() {
    return {
      title: '课程列表',
      meta: [
        {
          name: 'description',
          hit: 'description',
          content: 'set page meta'
        }
      ],
      link: [{
        rel: 'favicon',
        href: 'favicon.ico'
      }]
    }
  },
  async asyncData({ $axios, error }) {
    // 1.运行时间是在组件创建前，this不能用
    // 2.nuxt传递上下文进来
    const { ok, goods } = await $axios.$get('/api/goods')
    if(ok) {
      return {
        goods
      }
    }
    error({
      statusCode: 400,
      message: '数据库查询失败'
    })
  },
  methods: {
    addCart() {
      console.log('add cart success');
      
    }
  }
}
</script>