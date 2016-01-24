'use strict';

const Promise = require('bluebird');
const mg = require('../config/mocha-globals');
const promiseClient = require('../src/answers/util/promise-client-context').promiseClient;

if (promiseClient.join('one', 'two') === undefined) {
  describe('02-join', function() {
    it('should run 2 promises in parallel');
  });
} else {
  describe('02-join', function() {

    it('should run 2 promises in parallel', function() {
      let startTimeMs = new Date().getTime();
      return promiseClient.join('one', 'two').then(function(responses) {
        let endTimeMs = new Date().getTime();
        return [
          mg.expect(responses.length).to.equal(2),
          mg.expect(responses[0]).to.equal('ONE'),
          mg.expect(responses[1]).to.equal('TWO'),
          mg.expect(endTimeMs-startTimeMs).to.be.within(45, 55, 'Operation should take 50ms to complete')
        ];
      });
    });

    it('should reject first promise', function() {
      return mg.expect(promiseClient.join(null, 'two')).to.eventually.be.rejected;
    });

    it('should reject second promise', function() {
      return mg.expect(promiseClient.join('one', null)).to.eventually.be.rejected;
    });

  });
}
