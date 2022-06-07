module.exports = {
  env: {
    browser: false,
    es6: true,
    node: true,
  },
  parser: '@typescript-eslint/parser',
  settings: {
    'import/resolver': {
      typescript: {
        project: ['tsconfig.json'],
      },
    },
  },
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    project: 'tsconfig.json',
    tsconfigRootDir: './',
  },
  plugins: ['@typescript-eslint', 'jest', 'import'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:jest/recommended',
    'prettier',
  ],
  rules: {
    'import/no-unresolved': ['error'],
  },
}
