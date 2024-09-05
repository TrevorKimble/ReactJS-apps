const js = require(`@eslint/js`)
const globals = require(`globals`)
const react = require(`eslint-plugin-react`)

module.exports = [
    js.configs.recommended,
    {
        files: [`**/*.{js,jsx,mjs,cjs,ts,tsx}`],
        plugins: {
            react,
        },
        languageOptions: {
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
            },
            globals: {
                ...globals.node,
                ...globals.jest,
            },
        },
        rules: {
            "array-bracket-spacing": `warn`,
            "block-scoped-var": `warn`,
            "block-spacing": `warn`,
            "brace-style": [`warn`, `1tbs`, {
                "allowSingleLine": true
            }],
            "camelcase": [`warn`, {
                "properties": `never`
            }],
            "comma-spacing": [`warn`, {
                "before": false,
                "after": true
            }],
            "comma-style": `warn`,
            "computed-property-spacing": `warn`,
            "curly": `warn`,
            "dot-location": [`warn`, `property`],
            "func-call-spacing": `warn`,
            "global-require": `warn`,
            "id-length": [`warn`, {
                "min": 2,
                "exceptions": [`id`, `i`, `j`, `k`]
            }],
            "indent": [`warn`, 4, {
                "MemberExpression": 1
            }],
            "key-spacing": [`warn`, {
                "beforeColon": false
            }],
            "keyword-spacing": [`warn`, {
                "before": true
            }],
            "linebreak-style": [`warn`, `windows`],
            "new-cap": [`warn`, {
                "properties": false
            }],
            "new-parens": `warn`,
            "no-console": `error`,
            "no-lonely-if": `warn`,
            "no-multi-spaces": `warn`,
            "no-multiple-empty-lines": [`warn`, {
                "max": 1
            }],
            "no-nested-ternary": `warn`,
            "no-unneeded-ternary": `warn`,
            "no-use-before-define": `warn`,
            "no-var": `error`,
            "no-whitespace-before-property": `warn`,
            "object-curly-spacing": [`warn`, `always`],
            "prefer-const": `error`,
            "prefer-template": `error`,
            "quotes": [`error`, `backtick`],
            'react/jsx-uses-react': `error`,
            'react/jsx-uses-vars': `error`,
            "semi": [`error`, `never`],
            "space-before-blocks": `warn`,
            "space-in-parens": `warn`,
            "space-infix-ops": `warn`,
            "spaced-comment": `warn`,
            "switch-colon-spacing": `warn`,
            "template-curly-spacing": `warn`,
            "yoda": `warn`
        },
    }
]

