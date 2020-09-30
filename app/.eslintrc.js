module.exports = {
  extends: [
    'airbnb-typescript',
    'plugin:relay/recommended',
    'prettier',
    'prettier/@typescript-eslint',
    'prettier/react'
  ],
  env: {es6: true, browser: true, node: true},
  plugins: ['jest', 'relay'],
  parserOptions: {
    project: './tsconfig.json'
  },
  rules: {
    'react/prop-types': 0, // don't need react/prop-types when components are typed with typescript
    'react/state-in-constructor': [1, 'never'],
    '@typescript-eslint/no-unused-expressions': [1, {allowTernary: true}],
    'import/prefer-default-export': 0,
    'no-plusplus': 0, // not sure why this would be needed when we require semicolons
    'jsx-a11y/anchor-is-valid': 0, // Next.js's Link component inject the href in our <a> elements
    'no-restricted-syntax': 0,
    'import/no-extraneous-dependencies': [
      'error',
      {devDependencies: ['tests/**/*', 'cypress/**/*']}
    ],
    'import/extensions': [
      'error',
      'never',
      {
        graphql: 'always',
        json: 'always'
      }
    ],
    'global-require': 0,
    'no-underscore-dangle': 0,
    'no-undef': 0, // This is covered by Typescript, no need for eslint to check that

    // Temporarily disabled rules. They should be re-enabled eventually
    'consistent-return': 0,
    'no-param-reassign': 0,
    'react/destructuring-assignment': 0,
    'react/jsx-props-no-spreading': 0,
    'no-nested-ternary': 0,
    '@typescript-eslint/no-shadow': 0,
    'prefer-template': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    'jsx-a11y/control-has-associated-label': 0,
    'jsx-a11y/label-has-associated-control': 0,
    'jsx-a11y/no-noninteractive-tabindex': 0,

    // Rules below are code style. Prettier should deal with that instead of eslint
    'spaced-comment': 0,
    'import/newline-after-import': 0,
    'import/order': 0,
    '@typescript-eslint/lines-between-class-members': 0
  },
  overrides: [
    {files: ['tests/**/*'], extends: 'plugin:jest/recommended'},
    {
      files: ['cypress/**/*.js'],
      extends: ['plugin:cypress/recommended'],
      parserOptions: {
        project: 'cypress/tsconfig.json'
      },
      rules: {
        'jest/valid-expect-in-promise': 0,
        'promise/prefer-await-to-then': 0,
        'no-unused-expressions': 0,
        'cypress/no-unnecessary-waiting': 0
      }
    }
  ]
};
