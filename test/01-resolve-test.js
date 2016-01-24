'use strict';

const Promise = require('bluebird');
const mg = require('../config/mocha-globals');
const promiseClient = require('../src/answers/util/promise-client-context').promiseClient;

if (promiseClient.resolveUpperCase('name') === undefined) {
  describe('01-resolve', function() {
    it('should resolve a promise');
  });
} else {
  describe('01-resolve', function() {

    it('should resolve the promise', function() {
      let startTimeMs = new Date().getTime();
      return promiseClient.resolveUpperCase('success').then(function(response) {
        let endTimeMs = new Date().getTime();
        return [
          mg.expect(endTimeMs-startTimeMs).to.be.within(45, 55, 'Operation should take 50ms to complete'),
          mg.expect(response).to.equal('SUCCESS')
        ];
      });
    });

    it('should reject the promise', function() {
      return mg.expect(promiseClient.resolveUpperCase()).to.eventually.be.rejected;
    });

  });
}
