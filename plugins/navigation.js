export default function ({ app }, inject) {
    inject('goTo', (path) => {
        if (!path) {
            return
        }

        return app.router.push(path)
    })
}