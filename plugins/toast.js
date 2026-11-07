import Vue from 'vue'
import Toast, { POSITION } from 'vue-toastification'
import 'vue-toastification/dist/index.css'

Vue.use(Toast, {
    position: POSITION.TOP_RIGHT,
    timeout: 3000,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    maxToasts: 5,
    newestOnTop: true
})

export default (context, inject) => {
    inject('toast', Vue.prototype.$toast)
}