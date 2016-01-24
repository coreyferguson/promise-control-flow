
'use strict';

const promiseClientProblems = require('../../promise-client');
const promiseClientAnswers = require('../promise-client');

class PromiseClientContext {

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

  get promiseClient() {
    if (this._mode === 'problems') {
      return promiseClientProblems;
    } else if (this._mode === 'answers') {
      return promiseClientAnswers;
    }
  }

}

module.exports = new PromiseClientContext();
