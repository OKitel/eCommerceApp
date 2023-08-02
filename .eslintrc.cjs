module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "airbnb-typescript",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs", "node_modules", "vite.config.ts"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "ES6",
    sourceType: "module",
    project: ["./tsconfig.json"],
  },
  plugins: [
    "react-refresh",
    "@typescript-eslint",
    "import",
    "react",
    "react-hooks",
  ],
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/explicit-member-accessibility": [
      "error",
      {
        accessibility: "explicit",
        overrides: {
          accessors: "explicit",
          constructors: "off",
          methods: "explicit",
          properties: "explicit",
          parameterProperties: "explicit",
        },
      },
    ],
    "@typescript-eslint/explicit-function-return-type": "error",
    "@typescript-eslint/no-unnecessary-type-assertion": "error",
    "max-lines-per-function": ["error", 40],
    "no-console": 0,
  },
};
