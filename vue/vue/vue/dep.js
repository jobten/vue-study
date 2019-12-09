class Dep {
    constructor() {
        this.dependList = []
    }

    depend(watcher) {
        this.dependList.push(watcher)
    }

    notify() {
        this.dependList.forEach(watcher => watcher.update())
    }
}