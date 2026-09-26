export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - Test-Project',
    title: 'Test-Project',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/gh/rastikerdar/vazirmatn@v33.003/Vazirmatn-font-face.css' },
      { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/gh/rastikerdar/shabnam-font@v5.0.0/dist/font-face.css' },
      { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/gh/rastikerdar/sahel-font@v3.4.0/dist/font-face.css' },
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/css/responsive.css',
    '~/assets/css/app.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/validators.js',
    {src: '~/plugins/toast.js', mode: 'client'},
    '~/plugins/helper.js',
    '~/plugins/navigation.js',
    '~/plugins/auth.js'
    ],

  // Auto import components: https://go.nuxtjs.dev/config-components  
  components: [
    {
      path: '~/components',
    },
  ],
  
  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/stylelint
    // '@nuxtjs/stylelint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    // https://go.nuxtjs.dev/content
    '@nuxt/content',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en'
    }
  },

  // Content module configuration: https://go.nuxtjs.dev/config-content
  content: {},

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    rtl: true,
    customVariables: ['~/assets/variables.scss'],
    defaultAssets: {
      font: false
    },
    theme: {
      dark: false,
      themes: {
        light: {
          primary: '#0f172a',
          background: '#1E293B',
          accent: '#2563eb',
          info: '#0284c7',
          hero: '#60a5fa',
          secondary: '#475569',
          span: '#64748b',
          warning: '#d97706',
          error: '#dc2626',
          success: '#16a34a',
          avatar: '#eff6ff',
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extend(config) {
            config.resolve.alias.vue$ = 'vue/dist/vue.runtime.esm.js'
        }
  },

  script: [
      // افزودن اسکریپت Tailwind CSS بدون نیاز به npm install
      { src: 'https://cdn.tailwindcss.com' }
  ]
}
