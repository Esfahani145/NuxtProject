<template>
    <AppBackground>
        <v-app class="transparent-app">
            <div class="animated-bg d-flex flex-column min-vh-100">
                <AppNavbar />
                <v-main class="flex-grow-1 main-content p">
                    <v-container fluid class="px-4 px-md-8 py-6">
                        <Nuxt />
                    </v-container>
                </v-main>
                <AppFooter />
            </div>
        </v-app>
    </AppBackground>
</template>

<script>
import AppBackground from '~/components/Layout/AppBackground.vue'
import AppNavbar from '~/components/Layout/AppNavbar.vue'
import AppFooter from '~/components/Layout/AppFooter.vue'

export default {
    name: 'DefaultLayout',

    components: {
        AppBackground,
        AppNavbar,
        AppFooter
    },

    computed: {
        isAuthenticated() {
            return this.$store.getters['auth/isAuthenticated']
        }
    },

    watch: {
        '$route'(){
            this.checkAuth()
        }
    },

    async created() {
        if (process.client) {
          await this.$store.dispatch('auth/initAuth')

            if (this.isAuthenticated) {
                await this.$store.dispatch('loadUserCart')
                await this.$store.dispatch('loadUserFavorites')
            }
        }
    },

    mounted() {
        console.log('DefaultLayout monted')
        this.checkAuth()
    },

    methods: {
        checkAuth() {
            if (!process.client) return

            const token = localStorage.getItem('user_token')
            const user_info = localStorage.getItem('user_info')

            if (!token || !user_info) {
                this.$store.commit('auth/LOGOUT')
                localStorage.removeItem('user_info')
                localStorage.removeItem('user_token')
            }
        }
    }
}
</script>

<style scoped>
.transparent-app {
    background: transparent !important;
}

.animated-bg {
    position: relative;
    width: 100%;
}

.min-vh-100 {
    min-height: 100vh;
}

.main-content {
    padding-top: 24px !important;
}
</style>