import Vue from 'vue'

export default ({ store }, inject) => {
    inject('auth', {
        get isAuthenticated() {
            return store.getters['auth/isAuthenticated']
        },
        get user() {
            return store.getters['auth/currentUser']
        }
    })

    Vue.mixin({
        computed: {
            isAuthenticated() {
                return store.getters['auth/isAuthenticated'] || false
            },
            currentUser() {
                return store.getters['auth/currentUser'] || null
            }
        }
    })
}