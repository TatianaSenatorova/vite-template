module.exports = {
  extends: ['stylelint-config-standard-scss', 'stylelint-config-htmlacademy'],
  plugins: ['stylelint-selector-bem-pattern'],
  rules: {
    '@stylistic/string-quotes': 'single',
    '@stylistic/declaration-colon-newline-after': null,
    '@stylistic/value-list-comma-newline-after': null,
    '@stylistic/selector-combinator-space-after': null,
    '@stylistic/selector-combinator-space-before': null,
    'no-unknown-custom-properties': null,
    'declaration-block-no-duplicate-properties': [true, { ignore: ['consecutive-duplicates-with-different-values'] }],

    'plugin/selector-bem-pattern': {
      preset: 'bem',
      implicitComponents: 'src/styles/blocks',
    },
  },
};
