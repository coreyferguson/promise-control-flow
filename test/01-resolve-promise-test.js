'use strict';

const test = require('../config/test-globals');
const asyncClient = require('../src/async-client');

describe('01-resolve-promise', function() {

  it('should roll die value between 1-6 in ~50ms', function() {
    var startTimeMs = new Date().getTime();
    return asyncClient.rollDie().then(function(values) {
      var endTimeMs = new Date().getTime();
      return Promise.all([
        test.expect(endTimeMs-startTimeMs).to.be.within(45, 55),
        test.expect(values).to.be.within(1, 6)
      ]);
    });
  });

});
