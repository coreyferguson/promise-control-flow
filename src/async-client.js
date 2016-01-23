'use strict';

class AsyncClient {

  /**
   * Roll a die to receive a random value from 1 to 6.
   */
  rollDie() {
    return new Promise(function(resolve, reject) {
      setTimeout(function() {
        resolve(parseInt(Math.random()*6, 10)+1);
      }, 50);
    });
  }

  /**
   * Reject with the error message 'oops, something bad happened' after 1 second.
   */
  error() {
    return new Promise(function(resolve, reject) {
      setTimeout(function() {
        reject(new Error('oops, something bad happened'));
      }, 50);
    });
  }

  /**
   * Roll multiple dice at the same time.
   */
  rollDiceInParallel(num) {
    var diePromises = [];
    for (var i=0; i<num; i++) {
      diePromises.push(this.rollDie());
    }
    return Promise.all(diePromises);
  }

  /**
   * Roll two dice one after the other (sequentially). Immediately win the game by rolling a 1.
   */
  rollDiceSequentially() {
    return new Promise(function(resolve, reject) {
      this.rollDie().then(function(value) {
        if (value === 1) resolve(true);
        else return this.rollDie();
      }.bind(this)).then(function(value) {
        if (value === 1) resolve(true);
        else resolve(false);
      })
    }.bind(this));
  }

}

module.exports = new AsyncClient();
