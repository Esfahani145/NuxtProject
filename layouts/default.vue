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

  created() {
    if (process.client) {
      this.$store.dispatch('auth/initAuth')
    }
  },

  watch: {
    isAuthenticated(value) {
      if (value) {
        this.$store.dispatch('loadUserCart')
        this.$store.dispatch('loadUserFavorites')
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