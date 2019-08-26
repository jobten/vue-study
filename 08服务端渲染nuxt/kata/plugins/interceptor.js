export default function({ $axios, store }) {
    $axios.onRequest(config => {
        if (store.state.user.token) {
            config.headers.Autorization = 'Bearer' + store.state.user.token
        }
        return config
    })
}