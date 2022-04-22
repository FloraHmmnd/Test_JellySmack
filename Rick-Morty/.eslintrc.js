module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    "vue/setup-compiler-macros": true,
  },
  settings: {
    "import/resolver": {
      alias: {
        map: [
          ["@", "./src"],
          ["@svg", "./src/assets/svg"],
        ],
        extensions: [".js", ".jsx", ".json", ".vue"],
      },
    },
  },
  extends: ["plugin:vue/vue3-recommended", "airbnb-base", "prettier"],
  parser: "vue-eslint-parser",
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: "module",
  },
  plugins: ["vue", "prettier"],
  rules: {
    "vue/script-setup-uses-vars": "error",
    "prettier/prettier": "error",
  },
};
