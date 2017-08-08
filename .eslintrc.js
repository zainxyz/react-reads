module.exports = {
  "extends": "eslint-config-react-xyz",
  "globals": {
    "document": true,
    "window": true
  },
  "parser": "babel-eslint",
  "plugins": [
    "react",
    "jsx-a11y",
    "import"
  ],
  "rules": {
    "import/no-extraneous-dependencies": [
      "error",
      {
        "dependencies": [
          "api/**",
          "common/**",
          "modules/**",
          "utils/**"
        ],
      }
    ],
    "no-template-curly-in-string": "off",
    "react/forbid-prop-types": "off",
    "valid-jsdoc": [
      "warn", {
        "requireReturn": false,
        "prefer": {
          "returns": "return",
          "yield": "yields",
        },
        "preferType": {
          "array": "Array",
          "Boolean": "boolean",
          "function": "Function",
          "Number": "number",
          "object": "Object",
          "String": "string",
        },
        "requireParamDescription": false,
        "requireReturnDescription": false,
      }
    ]
  }
};
