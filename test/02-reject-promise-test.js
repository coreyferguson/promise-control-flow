'use strict';

const test = require('../config/test-globals');
const asyncClient = require('../src/async-client');

describe('02-reject-promise', function() {

  it('should reject with error "oops, something bad happened"', function() {
    var startTimeMs = new Date().getTime();
    return asyncClient.error().catch(function(error) {
      var endTimeMs = new Date().getTime();
      return Promise.all([
        test.expect(error).to.eql(new Error('oops, something bad happened')),
        test.expect(endTimeMs-startTimeMs).to.be.within(45, 55)
      ]);
    });
  });

});
