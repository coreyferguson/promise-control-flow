'use strict';

const Promise = require('bluebird');
const mg = require('../config/mocha-globals');
const promiseClient = require('../src/answers/util/promise-client-context').promiseClient;

// if (promiseClient.coroutine(['one'], ['two']) === undefined) {
//   describe('07-coroutine', function() {
//     it('should resolve the promise');
//   });
// } else {
  describe('07-coroutine', function() {

    it.only('should resolve the promise', function() {
      promiseClient.coroutine(['one', 'two'], ['three', 'four']);
        // .to.eventually.equal(['ONE', 'TWO', 'THREE', 'FOUR']);
    });

  });
// }
