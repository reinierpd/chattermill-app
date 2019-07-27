const path = require('path');

module.exports = {
  parser: 'babel-eslint',
  env: {
    es6: true,
    node: true,
    browser: true,
  },
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['react', 'prettier', 'jsdoc', 'react-hooks'],
  rules: {
    'prettier/prettier': 'error',
    'max-len': [2, { code: 80, ignorePattern: '^import\\W.*' }],
    'import/no-extraneous-dependencies': ['error', { packageDir: './' }],
    'jsdoc/check-alignment': 2,
    'jsdoc/check-indentation': 2,
    'jsdoc/check-param-names': 2,
    'jsdoc/check-syntax': 2,
    'jsdoc/check-tag-names': 2,
    'jsdoc/check-types': 2,
    'jsdoc/newline-after-description': 2,
    'jsdoc/no-undefined-types': 2,
    'jsdoc/require-description': 2,
    'jsdoc/require-description-complete-sentence': 2,
    'jsdoc/require-hyphen-before-param-description': 2,
    'jsdoc/require-param': 2,
    'jsdoc/require-param-description': 2,
    'jsdoc/require-param-name': 2,
    'jsdoc/require-param-type': 2,
    'jsdoc/require-returns': 2,
    'jsdoc/require-returns-check': 2,
    'jsdoc/require-returns-description': 2,
    'jsdoc/require-returns-type': 2,
    'jsdoc/valid-types': 2,
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        components: ['Link'],
        aspects: [],
      },
    ],
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'airbnb',
    'prettier',
    'prettier/react',
  ],
  settings: {
    'import/resolver': {
      node: {
        paths: [path.resolve(__dirname, 'src')],
      },
    },
  },
};
