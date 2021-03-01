module.exports = {
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
    },
    extends: ['../../.eslintrc.js', 'plugin:react/recommended'],
    plugins: ['react'],
    settings: {
        react: {
            pragma: 'React', // Pragma to use, default to "React"
            version: 'detect', // React version. "detect" automatically picks the version you have installed.
        },
    },
    rules: {
        '@typescript-eslint/no-var-requires': 'off',
    },
};
