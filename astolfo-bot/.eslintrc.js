module.exports = {

    parserOptions: {
        project: 'tsconfig.json',
        sourceType: 'module',
    },
    plugins: ['prettier'], parser: '@typescript-eslint/parser',
    extends: [
        'airbnb-base',
        'airbnb-typescript/base',
        'prettier',
    ],
    root: true,
    env: {
        node: true,
        jest: true,
    },
    ignorePatterns: ['.eslintrc.js'],
    rules: {
        '@typescript-eslint/interface-name-prefix': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        "prettier/prettier": ["error"]
    },
};