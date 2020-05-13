module.exports = {
  presets: [
    [
      '@vue/app',
      {
        targets: {
          esmodules: true
        },
        polyfills: false,
        useBuiltIns: 'entry'
      }
    ]
  ]
}
