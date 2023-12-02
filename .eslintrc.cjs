module.exports = {
    root: true,
    env: { browser: true, es2020: true },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        "plugin:react/recommended",
        "plugin:react/jsx-runtime",
        'plugin:react-hooks/recommended',
    ],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: [ './tsconfig.json', './tsconfig.node.json' ],
        tsconfigRootDir: __dirname,
    },
    ignorePatterns: [ 'dist', '.eslintrc.cjs' ],
    parser: '@typescript-eslint/parser',
    plugins: [
        'react-refresh',
        'sort-imports-es6-autofix'
    ],
    rules: {
        'react-refresh/only-export-components': [
            'warn',
            { allowConstantExport: true },
        ],
        'linebreak-style': [ 2, 'unix' ],
        'quotes': [ 2, 'single' ],
        'semi': [ 2, 'always' ],
        'react/jsx-indent': [ 2, 4 ],
        'react/jsx-indent-props': [ 2, 4 ],
        'indent': [ 2, 4 ],
        'react/display-name': 'off',
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'error',
        'react/jsx-max-props-per-line': [ 1, { "maximum": 1 } ],
        '@typescript-eslint/no-explicit-any': 'warn',
        '@typescript-eslint/no-unused-vars': [ 1, { vars: 'all', 'argsIgnorePattern': '^_' } ],
        'sort-imports-es6-autofix/sort-imports-es6': [ 'warn', {
            'ignoreCase': true,
            'ignoreMemberSort': false,
            'memberSyntaxSortOrder': [ 'none', 'all', 'single', 'multiple' ],
        } ],
    },
    settings: {
        react: {
            version: "detect",
        },
    },
}
