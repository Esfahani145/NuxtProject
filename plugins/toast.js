import Vue from 'vue'
import Toast, { POSITION } from 'vue-toastification'
import 'vue-toastification/dist/index.css'

const custom_transition = {
    functional: true,
    render(h, context) {
        return h(
            'transition-group',
            {
                props: {
                    tag: 'div',
                    moveClass: 'Vue-Toastification__bounce-move',
                    enterActiveClass: 'Vue-Toastification__bounce-enter-active', 
                    leaveActiveClass: 'Vue-Toastification__bounce-leave-active'
                }
            },
            context.children
        )
    }
}

Vue.use(Toast, {
    position: POSITION.TOP_RIGHT,
    timeout: 3000,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    transition: custom_transition,
    maxToasts: 5,
    newestOnTop: true
})