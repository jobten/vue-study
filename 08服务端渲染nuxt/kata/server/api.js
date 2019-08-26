const Koa = require('koa')
const bodyparse = require('koa-bodyparser')
const router = require('koa-router')({ prefix: '/api' })

const app = new Koa()

// 设置cookie加密秘钥
app.keys = ['some secret', 'another secret']

const goods = [
    { 
        id: 1,
        text: "Web全栈架构师",
        price: 1000
    },
    { 
        id: 2,
        text: "Python架构师",
        price: 1000
    }
]

router.get('/goods', ctx => {
    ctx.body = {
        ok: 1,
        goods
    }
})

router.get('/detail', ctx => {
    ctx.body = {
        ok: 1,
        data: goods.find(good => good.id == ctx.query.id)
    }
})

router.post('/login', ctx => {
    const user = ctx.request.body
    if(user.username === 'Will' && user.password === '123') {
        // token存入在cookie中
        const token = 'a mock token'
        ctx.cookies.set('token', token)
        ctx.body = {
            ok: 1,
            token
        }
    } else {
        ctx.body = {
            ok: 0
        }
    }
})

app.use(bodyparse())
app.use(router.routes())

app.listen(8080, () => console.log('api服务器启动了'))

