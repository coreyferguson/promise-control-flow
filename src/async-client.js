'use strict';

let Promise = require('bluebird');

class AsyncClient {

  /**
   * Convert the given name into uppercase letters after 50ms.
   *
   * http://bluebirdjs.com/docs/api/new-promise.html
   *
   * @param {string} name Lowercase name
   * @returns {Promise.<string>} Uppercase name
   */
  resolveUpperCase(name) {
    return new Promise(function(resolve, reject) {
      setTimeout(function() {
        resolve(name.toUpperCase());
      }, 50);
    });
  }

  /**
   * Reject with the error message 'oops, something bad happened' after 50ms.
   *
   * http://bluebirdjs.com/docs/api/new-promise.html
   *
   * @returns {Promise.<Error>} Error with message: 'oops, something bad happened'
   */
  rejectPromise() {
    return new Promise(function(resolve, reject) {
      setTimeout(function() {
        reject(new Error('oops, something bad happened'));
      }, 50);
    });
  }

  /**
   * Using `resolveUpperCase` created above, convert the two give names into uppercase letters.
   * Run all operations in sequence, one after the other.
   *
   * "For coordinating multiple concurrent discrete promises. While .all is good for handling a
   * dynamically sized list of uniform promises, Promise.join is much easier (and more performant)
   * to use when you have a fixed amount of discrete promises that you want to coordinate concurrently"
   *
   * http://bluebirdjs.com/docs/api/promise.join.html
   *
   * @param name1 first Lowercase name
   * @param name2 second Lowercase name
   * @returns {Promise.<string[]>} Uppercase names
   */
  join(name1, name2) {
    return Promise.join(this.resolveUpperCase(name1), this.resolveUpperCase(name2));
  }

  /**
   * Using the `resolveUpperCase` created above, convert the given `name` of into uppercase letters.
   * Repeat this operation for the given `number` of times.
   * Run all operations in parallel.
   *
   * "iterate over all the values in the Iterable into an array and return a promise that is
   * fulfilled when all the items in the array are fulfilled. The promise's fulfillment value
   * is an array with fulfillment values at respective positions to the original array."
   *
   * http://bluebirdjs.com/docs/api/promise.all.html
   *
   * @param {number} number Number of times to convert `name` to uppercase
   * @param {string} name Lowercase name
   * @returns {Promise.<string[]>} Uppercase names
   */
  all(number, name) {
    var promises = [];
    for (var i=0; i<number; i++) {
      promises.push(this.resolveUpperCase(name));
    }
    return Promise.all(promises);
  }

  /**
   * Using the `resolveUpperCase` created above, convert the given array of `names` into uppercase letters.
   * Run all operations in parallel.
   *
   * "A common use of Promise.map is to replace the .push+Promise.all boilerplate"
   *
   * http://bluebirdjs.com/docs/api/promise.map.html
   *
   * @param {string[]} names Lowercase names
   * @returns {Promise.<string[]>} Uppercase names
   */
  map(names) {
    return Promise.map(names, function(name) {
      return this.resolveUpperCase(name);
    }.bind(this));
  }

  /**
   * Using the `resolveUpperCase` created above, convert the given array of `names` into uppercase letters.
   * Run all operations in sequence, one after the other.
   *
   * http://bluebirdjs.com/docs/api/promise.mapseries.html
   *
   * @param {string[]} names Lowercase names
   * @returns {Promise.<string[]>} Uppercase names
   */
  mapSeries(names) {
    return Promise.mapSeries(names, function(name) {
      return this.resolveUpperCase(name);
    }.bind(this));
  }

}

module.exports = new AsyncClient();
