
'use strict';

const asyncClientProblems = require('../async-client');
const asyncClientAnswers = require('./async-client');

class AsyncClientContext {

  constructor() {
    this._mode = 'problems';
  }

  get mode() {
    return this._mode;
  }

  set mode(mode) {
    this._mode = mode;
    return this;
  }

  get asyncClient() {
    if (this._mode === 'problems') {
      return asyncClientProblems;
    } else if (this._mode === 'answers') {
      return asyncClientAnswers;
    }
  }

}

module.exports = new AsyncClientContext();
