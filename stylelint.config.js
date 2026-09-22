module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-prettier'
  ],

  overrides: [
    {
      files: ['**/*.vue'],
      customSyntax: 'postcss-html'
    }
  ],

  rules: {
    'no-descending-specificity': null,

    'selector-pseudo-element-no-unknown': [
      true,
      {
        ignorePseudoElements: ['v-deep']
      }
    ]
  }
}