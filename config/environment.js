
'use strict';

class Environment {

  constructor() {
    this._testTarget = 'problems';
  }

  get testTarget() {
    return this._testTarget;
  }

  set testTarget(testTarget) {
    this._testTarget = testTarget;
  }

}

module.exports = new Environment();
