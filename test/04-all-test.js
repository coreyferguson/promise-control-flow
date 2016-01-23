'use strict';

const Promise = require('bluebird');
const test = require('../config/test-globals');
const asyncClient = require('../src/async-client');
const resolveUpperCase = require('../src/answers/01-resolve-upper-case');
const rejectPromise = require('../src/answers/02-reject-promise');

describe('04-all', function() {

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

  it('should run 2 promises in parallel', function() {
    var startTimeMs = new Date().getTime();
    return asyncClient.all(2, 'success').then(function(responses) {
      var endTimeMs = new Date().getTime();
      return [
        test.expect(responses.length).to.equal(2),
        test.expect(responses[0]).to.equal('SUCCESS'),
        test.expect(responses[1]).to.equal('SUCCESS'),
        test.expect(endTimeMs-startTimeMs).to.be.within(45, 55)
      ];
    });
  });

  it('should run 3 promises in parallel', function() {
    var startTimeMs = new Date().getTime();
    return asyncClient.all(3, 'success').then(function(responses) {
      var endTimeMs = new Date().getTime();
      return [
        test.expect(responses.length).to.equal(3),
        test.expect(responses[0]).to.equal('SUCCESS'),
        test.expect(responses[1]).to.equal('SUCCESS'),
        test.expect(responses[2]).to.equal('SUCCESS'),
        test.expect(endTimeMs-startTimeMs).to.be.within(45, 55)
      ];
    });
  });

  it('should reject first promise', function() {
    asyncClient.resolveUpperCase = function(name) {
      return Promise.reject(new Error('oops'));
    };
    return test.expect(asyncClient.all(2, 'reject')).to.eventually.be.rejectedWith(/oops/);
  });

  it('should reject second promise', function() {
    asyncClient.resolveUpperCase = function(name1) {
      asyncClient.resolveUpperCase = function(name2) {
        return Promise.reject(new Error('oops'));
      };
      return resolveUpperCase(name1);
    };
    return test.expect(asyncClient.all(3, 'reject')).to.eventually.be.rejectedWith(/oops/);
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
    return test.expect(asyncClient.all(3, 'reject')).to.eventually.be.rejectedWith(/oops/);
  });

});
