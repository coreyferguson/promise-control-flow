'use strict';

const Promise = require('bluebird');
const expect = require('../config/chai-expect');
const resolveUpperCase = require('../src/answers/01-resolve-upper-case');
const asyncClient = require('../src/answers/async-client-context').asyncClient;

if (asyncClient.map(['one', 'two']) === undefined) {
  describe('05-map', function() {
    it('should run 2 promises in parallel');
  });
} else {
  describe('05-map', function() {

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
      let startTimeMs = new Date().getTime();
      return asyncClient.map(['one', 'two']).then(function(responses) {
        let endTimeMs = new Date().getTime();
        return [
          expect(responses.length).to.equal(2),
          expect(responses[0]).to.equal('ONE'),
          expect(responses[1]).to.equal('TWO'),
          expect(endTimeMs-startTimeMs).to.be.within(45, 55, 'Operation should take 50ms to complete')
        ];
      });
    });

    it('should run 3 promises in parallel', function() {
      let startTimeMs = new Date().getTime();
      return asyncClient.map(['one', 'two', 'three']).then(function(responses) {
        let endTimeMs = new Date().getTime();
        return [
          expect(responses.length).to.equal(3),
          expect(responses[0]).to.equal('ONE'),
          expect(responses[1]).to.equal('TWO'),
          expect(responses[2]).to.equal('THREE'),
          expect(endTimeMs-startTimeMs).to.be.within(45, 55, 'Operation should take 50ms to complete')
        ];
      });
    });

    it('should reject first promise', function() {
      asyncClient.resolveUpperCase = function(name) {
        return Promise.reject(new Error('oops'));
      };
      return expect(asyncClient.map(['one', 'two', 'three'])).to.eventually.be.rejectedWith(/oops/);
    });

    it('should reject second promise', function() {
      asyncClient.resolveUpperCase = function(name1) {
        asyncClient.resolveUpperCase = function(name2) {
          return Promise.reject(new Error('oops'));
        };
        return resolveUpperCase(name1);
      };
      return expect(asyncClient.map(['one', 'two', 'three'])).to.eventually.be.rejectedWith(/oops/);
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
      return expect(asyncClient.map(['one', 'two', 'three'])).to.eventually.be.rejectedWith(/oops/);
    });

  });

}
