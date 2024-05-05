module.exports = {
    root: true,
    parserOptions: {
        ecmaVersion: 2020, // Use the latest ecmascript standard
        sourceType: "module", // Allows using import/export statements
        ecmaFeatures: {
            jsx: true, // Enable JSX since we're using React
        },
    },
    settings: {
        react: {
            version: "detect",
        },
    },
    env: {
        browser: true,
        amd: true,
        es6: true,
        node: true,
    },
    extends: [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:react-hooks/recommended",
        "plugin:prettier/recommended",
    ],
    globals: {
        route: true,
    },
    plugins: [
        "react",
        "react-hooks",
        "unused-imports",
        "sort-imports-es6-autofix",
        "prettier",
    ],
    rules: {
        "react/jsx-first-prop-new-line": [2, "multiline"],
        "react/jsx-max-props-per-line": [2, { maximum: 1, when: "multiline" }],
        "react/jsx-indent-props": [2, 2],
        "react/jsx-closing-bracket-location": [2, "tag-aligned"],
        "prettier/prettier": [
            "error",
            {},
            {
                usePrettierrc: true,
            },
        ],
        "react/react-in-jsx-scope": "off",
        "react/prop-types": "off",
        "no-console": 1,
        "no-undef": ["error", { typeof: true }],
        "no-unused-vars": "warn",
    },
};
