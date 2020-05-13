module.exports = {
  root: true,
  env: {
    node: true
  },
  globals: {
    globalLog: true,
    globalWarn: true,
    globalError: true
  },
  extends: [
    'plugin:vue/recommended',
    'plugin:vue/essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: 'babel-eslint',
    ecmaFeatures: { // 支持装饰器
      legacyDecorators: true
    }
  },
  rules: {
    'no-var': 'error',
    eqeqeq: 'error',
    'vue/eqeqeq': 'error',
    'vue/multiline-html-element-content-newline': ['error', {
      ignoreWhenEmpty: false,
      ignores: ['pre', 'textarea'],
      allowEmptyLines: false
    }],
    'vue/max-attributes-per-line': ['error', {
      singleline: 3,
      multiline: {
        max: 1,
        allowFirstLine: false
      }
    }],
    'vue/singleline-html-element-content-newline': ['off', {
      ignoreWhenNoAttributes: true,
      ignoreWhenEmpty: true,
      ignores: ['pre', 'textarea', 'p']
    }]
  }
}
