'use strict';

const Promise = require('bluebird');
const test = require('../config/test-globals');
const asyncClient = require('../src/async-client');
const resolveUpperCase = require('../src/answers/01-resolve-upper-case');
const rejectPromise = require('../src/answers/02-reject-promise');

describe('06-mapSeries', function() {

  let _resolveUpperCase;
  let _rejectPromise;

  before(function() {
    _resolveUpperCase = asyncClient.resolveUpperCase;
    _rejectPromise = asyncClient.rejectPromise;
  });

  beforeEach(function() {
    asyncClient.resolveUpperCase = resolveUpperCase;
    asyncClient.rejectPromise = rejectPromise;
  });

  after(function() {
    asyncClient.resolveUpperCase = _resolveUpperCase;
    asyncClient.rejectPromise = _rejectPromise;
  });

  it('should run 2 promises in sequence', function() {
    let startTimeMs = new Date().getTime();
    return asyncClient.mapSeries(['one', 'two']).then(function(responses) {
      let endTimeMs = new Date().getTime();
      return [
        test.expect(responses.length).to.equal(2),
        test.expect(responses[0]).to.equal('ONE'),
        test.expect(responses[1]).to.equal('TWO'),
        test.expect(endTimeMs-startTimeMs).to.be.within(95, 105)
      ];
    });
  });

  it('should run 3 promises in sequence', function() {
    let startTimeMs = new Date().getTime();
    return asyncClient.mapSeries(['one', 'two', 'three']).then(function(responses) {
      let endTimeMs = new Date().getTime();
      return [
        test.expect(responses.length).to.equal(3),
        test.expect(responses[0]).to.equal('ONE'),
        test.expect(responses[1]).to.equal('TWO'),
        test.expect(responses[2]).to.equal('THREE'),
        test.expect(endTimeMs-startTimeMs).to.be.within(145, 155)
      ];
    });
  });

  it('should reject first promise', function() {
    asyncClient.resolveUpperCase = function(name) {
      return Promise.reject(new Error('oops'));
    };
    return test.expect(asyncClient.mapSeries(['one', 'two', 'three'])).to.eventually.be.rejectedWith(/oops/);
  });

  it('should reject second promise', function() {
    asyncClient.resolveUpperCase = function(name1) {
      asyncClient.resolveUpperCase = function(name2) {
        return Promise.reject(new Error('oops'));
      };
      return resolveUpperCase(name1);
    };
    return test.expect(asyncClient.mapSeries(['one', 'two', 'three'])).to.eventually.be.rejectedWith(/oops/);
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
    return test.expect(asyncClient.mapSeries(['one', 'two', 'three'])).to.eventually.be.rejectedWith(/oops/);
  });

});
