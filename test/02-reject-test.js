'use strict';

const Promise = require('bluebird');
const expect = require('../config/chai-expect');
const asyncClient = require('../src/answers/async-client-context').asyncClient;

let promise = asyncClient.rejectPromise();

if (promise === undefined) {
  describe('02-reject', function() {
    it('should reject with error "oops, something bad happened');
  });
} else {
  // swallow uncaught exception from test of asyncClient.rejectPromise() above
  promise.catch(function() { });
  describe('02-reject', function() {

    it('should reject with error "oops, something bad happened"', function() {
      var startTimeMs = new Date().getTime();
      return asyncClient.rejectPromise().catch(function(error) {
        var endTimeMs = new Date().getTime();
        return [
          expect(error).to.eql(new Error('oops, something bad happened')),
          expect(endTimeMs-startTimeMs).to.be.within(45, 55, 'Operation should take 50ms to complete')
        ];
      });
    });

  });
}
