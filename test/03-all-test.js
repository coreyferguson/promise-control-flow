'use strict';

const Promise = require('bluebird');
const mg = require('../config/mocha-globals');
const promiseClient = require('../src/answers/util/promise-client-context').promiseClient;

if (promiseClient.all(2, 'success') === undefined) {
  describe('03-all', function() {
    it('should run 2 promises in parallel');
  });
} else {
  describe('03-all', function() {

    it('should run 2 promises in parallel', function() {
      let startTimeMs = new Date().getTime();
      return promiseClient.all(2).then(function(responses) {
        let endTimeMs = new Date().getTime();
        return [
          mg.expect(responses.length).to.equal(2),
          mg.expect(responses[0]).to.equal('0'),
          mg.expect(responses[1]).to.equal('1'),
          mg.expect(endTimeMs-startTimeMs).to.be.within(45, 55, 'Operation should take 50ms to complete')
        ];
      });
    });

    it('should run 3 promises in parallel', function() {
      let startTimeMs = new Date().getTime();
      return promiseClient.all(3).then(function(responses) {
        let endTimeMs = new Date().getTime();
        return [
          mg.expect(responses.length).to.equal(3),
          mg.expect(responses[0]).to.equal('0'),
          mg.expect(responses[1]).to.equal('1'),
          mg.expect(responses[2]).to.equal('2'),
          mg.expect(endTimeMs-startTimeMs).to.be.within(45, 55, 'Operation should take 50ms to complete')
        ];
      });
    });

    it('should reject first promise', function() {
      mg.sinon.stub(promiseClient, 'resolveUpperCase')
        .withArgs('0').returns(Promise.reject())
        .withArgs('1').returns(Promise.resolve());
      return mg.expect(promiseClient.all(2)).to.eventually.be.rejected
        .then(function() {
          promiseClient.resolveUpperCase.restore();
        });
    });

    it('should reject second promise', function() {
      mg.sinon.stub(promiseClient, 'resolveUpperCase')
        .withArgs('0').returns(Promise.resolve())
        .withArgs('1').returns(Promise.reject());
      return mg.expect(promiseClient.all(2)).to.eventually.be.rejected
        .then(function() {
          promiseClient.resolveUpperCase.restore();
        });
    });

    it('should reject third promise', function() {
      mg.sinon.stub(promiseClient, 'resolveUpperCase')
        .withArgs('0').returns(Promise.resolve())
        .withArgs('1').returns(Promise.resolve())
        .withArgs('2').returns(Promise.reject());
      return mg.expect(promiseClient.all(3)).to.eventually.be.rejected
        .then(function() {
          promiseClient.resolveUpperCase.restore();
        });
    });

  });
}
