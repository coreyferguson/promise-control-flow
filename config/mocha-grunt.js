
module.exports = {
  options: {
    reporter: 'spec',
    clearRequireCache: true,
    timeout: 5000
  },
  problems: {
    src: [
      'test/**/*.js'
    ]
  },
  answers: {
    src: [
      'src/answers/set-mode-answers.js',
      'test/**/*.js'
    ]
  }
}
