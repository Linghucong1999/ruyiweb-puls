module.exports = {
    root: true,
    env: {
        node: true,
    },
    'extends': [
        'plugin:vue/essential',
        'eslint:recommended'
    ],
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-unused-vars': 'error',
        'vue/multi-word-component-names': 0,
        'semi': ['error', 'always'],
        'no-trailing-spaces': 'error',  //行末不允许出现多余空格
        'no-multiple-empty-lines': ['error', { 'max': 1 }],
        'vue/max-attributes-per-line': ['error', {
            'singleline': {
                'max': 3
            },
            'multiline': {
                'max': 3
            }
        }],
        'vue/no-dupe-keys': ['error', {
            'groups': []
        }],
        'vue/array-bracket-spacing': ['error', 'never'],
    },
    parserOptions: {
        parser: 'babel-eslint'
    }
};