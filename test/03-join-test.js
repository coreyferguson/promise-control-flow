'use strict';

const Promise = require('bluebird');
const expect = require('../config/chai-expect');
const resolveUpperCase = require('../src/answers/01-resolve-upper-case');
const asyncClient = require('../src/answers/async-client-context').asyncClient;

if (asyncClient.join('one', 'two') === undefined) {
  describe('03-join', function() {
    it('should run 2 promises in sequence');
  });
} else {
  describe('03-join', function() {

    let _resolveUpperCase;
    let _rejectPromise;

    before(function() {
      _resolveUpperCase = asyncClient.resolveUpperCase;
    });

    beforeEach(function() {
      asyncClient.resolveUpperCase = resolveUpperCase;
    });

    after(function() {
      asyncClient.resolveUpperCase = _resolveUpperCase;
    });

    it('should run 2 promises in sequence', function() {
      let startTimeMs = new Date().getTime();
      return asyncClient.join('one', 'two').then(function(responses) {
        let endTimeMs = new Date().getTime();
        return [
          expect(responses.length).to.equal(2),
          expect(responses[0]).to.equal('ONE'),
          expect(responses[1]).to.equal('TWO'),
          expect(endTimeMs-startTimeMs).to.be.within(45, 55, 'Operation should take 50ms to complete')
        ];
      });
    });

    it('should reject first promise', function() {
      asyncClient.resolveUpperCase = function(name) {
        return Promise.reject(new Error('oops'));
      };
      return expect(asyncClient.join('one', 'two')).to.eventually.be.rejectedWith(/oops/);
    });

    it('should reject second promise', function() {
      asyncClient.resolveUpperCase = function(name1) {
        asyncClient.resolveUpperCase = function(name2) {
          return Promise.reject(new Error('oops'));
        };
        return resolveUpperCase(name1);
      };
      return expect(asyncClient.join('one', 'two')).to.eventually.be.rejectedWith(/oops/);
    });

  });
}
