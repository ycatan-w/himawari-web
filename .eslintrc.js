module.exports = {
  root: true,
  env: { browser: true, node: true, es2021: true },
  parser: 'vue-eslint-parser',
  parserOptions: { parser: '@typescript-eslint/parser', ecmaVersion: 2021, sourceType: 'module' },
  extends: ['plugin:vue/vue3-recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],
  rules: {
    'no-multiple-empty-lines': ['error', { max: 1 }],
    'eol-last': ['error', 'always'],
  },
};
