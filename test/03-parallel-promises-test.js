'use strict';

const test = require('../config/test-globals');
const asyncClient = require('../src/async-client');

describe('03-parallel-promises', function() {

  it('should roll 2 dice in ~50ms', function() {
    var startTimeMs = new Date().getTime();
    return asyncClient.rollDiceInParallel(2).then(function(values) {
      var endTimeMs = new Date().getTime();
      return Promise.all([
        test.expect(values.length).to.equal(2),
        test.expect(values[0]).to.be.within(1, 6),
        test.expect(values[1]).to.be.within(1, 6),
        test.expect(endTimeMs-startTimeMs).to.be.within(45, 55)
      ]);
    });


  })

});
