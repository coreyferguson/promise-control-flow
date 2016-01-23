
module.exports = {
  test: {
    options: {
      reporter: 'spec',
      clearRequireCache: true,
      timeout: 5000
    },
    src: [
      'config/mocha-init.js',
      'test/**/*.js'
    ]
  }
}
