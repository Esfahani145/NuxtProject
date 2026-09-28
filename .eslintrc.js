module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended',
    'prettier'
  ],
  plugins: [
  ],
  // add your custom rules here
  rules: {
    "camelcase": "off",
    'require-await': 'warn',
    'vue/no-use-v-if-with-v-for': 'warn',
    'vue/no-v-for-template-key': 'off',
    'vue/v-slot-style': 'off',
    'vue/require-v-for-key': 'warn'
  }
}
