module.exports = {
    parser: '@typescript-eslint/parser',
    env: {
        browser: true,
        commonjs: true,
        es2021: true,
    },
    plugins: ['@typescript-eslint'],
    extends: ['plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'],
    overrides: [],
    parserOptions: {
        ecmaVersion: 2019,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
        },
    },
    rules: {},
}
