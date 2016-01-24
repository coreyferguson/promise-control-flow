'use strict';

const Promise = require('bluebird');
const nodeJsClient = require('../node-js-client');

class PromiseClient {

  constructor() {
  }

  resolveUpperCase(name) {
    if (name === null || name === undefined || name === '') {
      return Promise.reject(new Error('Illegal argument: `name` required'));
    } else {
      return new Promise(function(resolve, reject) {
        setTimeout(function() {
          resolve(name.toUpperCase());
        }, 50);
      });
    }
  }

  join(name1, name2) {
    return Promise.join(this.resolveUpperCase(name1), this.resolveUpperCase(name2));
  }

  all(number) {
    let promises = [];
    for (let i=0; i<number; i++) {
      promises.push(this.resolveUpperCase(''+i));
    }
    return Promise.all(promises);
  }

  map(names) {
    return Promise.map(names, function(name) {
      return this.resolveUpperCase(name);
    }.bind(this));
  }

  mapSeries(names) {
    return Promise.mapSeries(names, function(name) {
      return this.resolveUpperCase(name);
    }.bind(this));
  }

  promisify(name) {
    let promisePattern = Promise.promisify(nodeJsClient.resolveUpperCase);
    return promisePattern(name);
  }

}

module.exports = new PromiseClient();
