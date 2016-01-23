'use strict';

const Promise = require('bluebird');
const test = require('../config/test-globals');
const asyncClient = require('../src/async-client');

describe('01-resolve', function() {

  it('should resolve a promise', function() {
    var startTimeMs = new Date().getTime();
    return asyncClient.resolveUpperCase('success').then(function(response) {
      var endTimeMs = new Date().getTime();
      return [
        test.expect(endTimeMs-startTimeMs).to.be.within(45, 55),
        test.expect(response).to.equal('SUCCESS')
      ];
    });
  });

});
