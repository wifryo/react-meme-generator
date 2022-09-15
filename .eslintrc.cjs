module.exports = {
  extends: ['@upleveled/upleveled'],
  // below rule added because ESLint was not recognising the input field (from https://www.npmjs.com/package/react-select-search)
  // rule found at https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/label-has-associated-control.md#case-my-label-and-input-components-are-custom-components
  rules: {
    'jsx-a11y/label-has-associated-control': [
      2,
      {
        controlComponents: ['SelectSearch'],
      },
    ],
  },
};
