'use strict';

const test = require('../config/test-globals');
const asyncClient = require('../src/async-client');

describe('04-sequence-promises', function() {

  it('should roll 1 die in ~50ms', function() {
    asyncClient.rollDie = test.sinon.stub().returns(new Promise(function(resolve, reject) {
      setTimeout(function() {
        resolve(1);
      }, 50);
    }));
    var startTimeMs = new Date().getTime();
    return asyncClient.rollDiceSequentially().then(function(win) {
      var endTimeMs = new Date().getTime();
      return test.expect(endTimeMs-startTimeMs).to.be.within(45, 55);
    });
  });

  it('should roll 2 die in ~100ms', function() {
    var rollDie = test.sinon.stub();
    asyncClient.rollDie = rollDie;
    rollDie.returns(new Promise(function(resolve, reject) {
      setTimeout(function() {
        rollDie.returns(new Promise(function(resolve, reject) {
          setTimeout(function() {
            resolve(1);
          }, 50);
        }));
        resolve(2);
      }, 50);
    }));
    var startTimeMs = new Date().getTime();
    return asyncClient.rollDiceSequentially().then(function(win) {
      var endTimeMs = new Date().getTime();
      return test.expect(endTimeMs-startTimeMs).to.be.within(95, 105);
    });
  });

});
