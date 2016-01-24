'use strict';

const Promise = require('bluebird');
const expect = require('../config/chai-expect');
const resolveUpperCase = require('../src/answers/01-resolve-upper-case');
const asyncClient = require('../src/answers/async-client-context').asyncClient;

if (asyncClient.all(2, 'success') === undefined) {
  describe('04-all', function() {
    it('should run 2 promises in parallel');
  });
} else {
  describe('04-all', function() {

    let _resolveUpperCase;

    before(function() {
      _resolveUpperCase = asyncClient.resolveUpperCase;
    });

    beforeEach(function() {
      asyncClient.resolveUpperCase = resolveUpperCase;
    });

    after(function() {
      asyncClient.resolveUpperCase = _resolveUpperCase;
    });

    it('should run 2 promises in parallel', function() {
      var startTimeMs = new Date().getTime();
      return asyncClient.all(2, 'success').then(function(responses) {
        var endTimeMs = new Date().getTime();
        return [
          expect(responses.length).to.equal(2),
          expect(responses[0]).to.equal('SUCCESS'),
          expect(responses[1]).to.equal('SUCCESS'),
          expect(endTimeMs-startTimeMs).to.be.within(45, 55, 'Operation should take 50ms to complete')
        ];
      });
    });

    it('should run 3 promises in parallel', function() {
      var startTimeMs = new Date().getTime();
      return asyncClient.all(3, 'success').then(function(responses) {
        var endTimeMs = new Date().getTime();
        return [
          expect(responses.length).to.equal(3),
          expect(responses[0]).to.equal('SUCCESS'),
          expect(responses[1]).to.equal('SUCCESS'),
          expect(responses[2]).to.equal('SUCCESS'),
          expect(endTimeMs-startTimeMs).to.be.within(45, 55, 'Operation should take 50ms to complete')
        ];
      });
    });

    it('should reject first promise', function() {
      asyncClient.resolveUpperCase = function(name) {
        return Promise.reject(new Error('oops'));
      };
      return expect(asyncClient.all(2, 'reject')).to.eventually.be.rejectedWith(/oops/);
    });

    it('should reject second promise', function() {
      asyncClient.resolveUpperCase = function(name1) {
        asyncClient.resolveUpperCase = function(name2) {
          return Promise.reject(new Error('oops'));
        };
        return resolveUpperCase(name1);
      };
      return expect(asyncClient.all(3, 'reject')).to.eventually.be.rejectedWith(/oops/);
    });

    it('should reject third promise', function() {
      asyncClient.resolveUpperCase = function(name1) {
        asyncClient.resolveUpperCase = function(name2) {
          asyncClient.resolveUpperCase = function(name3) {
            return Promise.reject(new Error('oops'));
          };
          return resolveUpperCase(name2);
        };
        return resolveUpperCase(name1);
      };
      return expect(asyncClient.all(3, 'reject')).to.eventually.be.rejectedWith(/oops/);
    });

  });
}
