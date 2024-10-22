import eslintConfig from '@antfu/eslint-config'

export default eslintConfig({
  vue: {
    overrides: {
      'vue/max-attributes-per-line': [
        'error',
        {
          singleline: {
            max: 1,
          },
          multiline: {
            max: 1,
          },
        },
      ],
      'vue/component-name-in-template-casing': ['error', 'PascalCase', {
        registeredComponentsOnly: false,
        ignores: [],
      }],
      'vue/block-tag-newline': ['error', {
        maxEmptyLines: 1,
      }],
      'vue/custom-event-name-casing': 'off',
      'object-property-newline': ['error', { allowAllPropertiesOnSameLine: false }],
      'object-curly-newline': ['error', {
        ObjectExpression: { multiline: true, minProperties: 2 },
        ObjectPattern: { multiline: true, minProperties: 2 },
        ImportDeclaration: { multiline: true, minProperties: 2 },
        ExportDeclaration: { multiline: true, minProperties: 2 },
      }],
    },
  },
  javascript: {
    overrides: {
      'no-console': 'off',
    },
  },
  formatters: {
    css: true,
  },
  ignores: ['*.d.ts', '*.json'],
})
