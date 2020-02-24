const express = require('express')
// const Vue = require('vue')
const fs = require('fs')
// express实例
const app = express()

// 创建vue实例
// const vm = new Vue({
//     data: {
//         count: 1
//     },
//     template: `
//         <div>{{ count }}</div>
//     `
// })

// const renderer = require('vue-server-renderer').createRenderer()
const { createBundleRenderer } = require('vue-server-renderer')

// 服务器bundle文件
const bundle = require('../dist/server/vue-ssr-server-bundle.json')
// 客户端清单文件
const clientManifest = require('../dist/client/vue-ssr-client-manifest.json')

const renderer = createBundleRenderer(bundle, {
    runInNewContext: false,
    template: fs.readFileSync('../src/index.temp.html', 'utf-8'),
    clientManifest
})

function renderToString(context) {
    return new Promise((resolve, reject) => {
        renderer.renderToString(context, (error, html) => {
            if (error) {
                return reject(error)
            }
            resolve(html)
        })
    })
}
app.use(express.static('../dist/client'))
app.get('*', async function (req, res) {
    try {
        // const html = await renderer.renderToString(vm)
        const context = {
            title: 'ssr test',
            url: req.url
        }
        const html = await renderToString(context)
        console.log(html)
        res.send(html)
    } catch (error) {
        res.status(500).send("interal server error")
    }
})

app.listen(3000, () => {
    console.log('服务器启动成功')
})