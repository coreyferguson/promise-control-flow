'use strict';

const Promise = require('bluebird');
const expect = require('../config/chai-expect');
const asyncClient = require('../src/answers/async-client-context').asyncClient;

if (asyncClient.resolveUpperCase('') === undefined) {
  describe('01-resolve', function() {
    it('should resolve a promise');
  });
} else {
  describe('01-resolve', function() {

    it('should resolve a promise', function() {
      var startTimeMs = new Date().getTime();
      return asyncClient.resolveUpperCase('success').then(function(response) {
        var endTimeMs = new Date().getTime();
        return [
          expect(endTimeMs-startTimeMs).to.be.within(45, 55, 'Operation should take 50ms to complete'),
          expect(response).to.equal('SUCCESS')
        ];
      });
    });

  });
}
