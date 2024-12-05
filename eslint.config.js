// eslint.config.js
export default {
    env: {
        node: true,
        es2021: true,
    },
    extends: [
        "eslint:recommended",
        "plugin:prettier/recommended",
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaVersion: 12,
        sourceType: "module",
    },
    plugins: ["@typescript-eslint"],
    rules: {
        "prettier/prettier": "error",
        "no-console": "warn",
    },
    ignorePatterns: [
        "**/temp.js",
        "config/*",
        "node_modules/",
        "dist/",
        "build/",
        "coverage/",
    ],
};