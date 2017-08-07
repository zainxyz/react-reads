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
    "react/forbid-prop-types": "off",
    'valid-jsdoc': [
      'warn', {
        requireReturn: false,
        prefer: {
          returns: 'return',
          yield: 'yields',
        },
        preferType: {
          object: 'Object',
          function: 'Function',
          array: 'Array',
        },
        requireParamDescription: false,
        requireReturnDescription: false,
      }
    ]
  }
};
