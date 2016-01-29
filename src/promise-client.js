'use strict';

const Promise = require('bluebird');
const nodeJsClient = require('./node-js-client');

class PromiseClient {

  /**
   * Convert the given name into uppercase letters and resolve after 50ms.
   * If the name is undefined, null, or empty, reject the promise with an appropriate Error.
   *
   * http://bluebirdjs.com/docs/api/new-promise.html
   *
   * @param {string} name Lowercase name
   * @returns {Promise.<string>} Uppercase name
   */
  resolveUpperCase(name) {
  }

  /**
   * Using `resolveUpperCase` created above, convert the two give names into uppercase letters.
   * Run both operations in parallel.
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
  }

  /**
   * Using the `resolveUpperCase` created above, convert a `number` of values to lowercase.
   * Values are the string value of the index `i` below.
   * Run all operations in parallel.
   *
   * "iterate over all the values in the Iterable into an array and return a promise that is
   * fulfilled when all the items in the array are fulfilled. The promise's fulfillment value
   * is an array with fulfillment values at respective positions to the original array."
   *
   * http://bluebirdjs.com/docs/api/promise.all.html
   *
   * @param {number} number Number of promises to resolve
   * @returns {Promise.<string[]>} Index of created promise
   */
  all(number) {
    let promises = [];
    for (let i=0; i<number; i++) {
      promises.push(this.resolveUpperCase(''+i));
    }
    // Resolve all promises here
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

  /**
   * `nodeJsClient.resolveUpperCase` is a function that does the same thing as the `resolverUpperCase` defined
   * in this class. However, it follows the NodeJs callback pattern.
   * Use the `Promise.promisify` function to convert a NodeJs callback pattern into a Promise.
   *
   * http://bluebirdjs.com/docs/api/promise.promisify.html
   *
   * @param {string} name Lowercase name
   * @returns {Promise.<string>} Uppercase name
   */
  promisify(names) {
  }

  /**
   * TODO
   */
  coroutine(parallelInputs, seriesValues) {
    return Promise.coroutine(function* () {
      console.log('this:', this);
      console.log('parallelInputs:', parallelInputs);
      console.log('seriesValues:', seriesValues);
      var blah = this.map(parallelInputs);
      console.log('blah:', blah);
      var mapValues = yield this.map(parallelInputs);
      var mapSeriesValues = yield this.mapSeries(seriesValues);
      console.log('mapValues:', mapValues);
      console.log('mapSeriesValues:', mapSeriesValues);
      return mapValues.concat(mapSeriesValues);
    }.bind(this))();
  }

}

module.exports = new PromiseClient();
