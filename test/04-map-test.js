'use strict';

const Promise = require('bluebird');
const mg = require('../config/mocha-globals');
const promiseClient = require('../src/answers/util/promise-client-context').promiseClient;

if (promiseClient.map(['one', 'two']) === undefined) {
  describe('04-map', function() {
    it('should run 2 promises in parallel');
  });
} else {
  describe('04-map', function() {

    it('should run 2 promises in parallel', function() {
      let startTimeMs = new Date().getTime();
      return promiseClient.map(['one', 'two']).then(function(responses) {
        let endTimeMs = new Date().getTime();
        return [
          mg.expect(responses.length).to.equal(2),
          mg.expect(responses[0]).to.equal('ONE'),
          mg.expect(responses[1]).to.equal('TWO'),
          mg.expect(endTimeMs-startTimeMs).to.be.within(45, 55, 'Operation should take 50ms to complete')
        ];
      });
    });

    it('should run 3 promises in parallel', function() {
      let startTimeMs = new Date().getTime();
      return promiseClient.map(['one', 'two', 'three']).then(function(responses) {
        let endTimeMs = new Date().getTime();
        return [
          mg.expect(responses.length).to.equal(3),
          mg.expect(responses[0]).to.equal('ONE'),
          mg.expect(responses[1]).to.equal('TWO'),
          mg.expect(responses[2]).to.equal('THREE'),
          mg.expect(endTimeMs-startTimeMs).to.be.within(45, 55, 'Operation should take 50ms to complete')
        ];
      });
    });

    it('should reject first promise', function() {
      mg.sinon.stub(promiseClient, 'resolveUpperCase')
        .withArgs('one').returns(Promise.reject())
        .withArgs('two').returns(Promise.resolve())
        .withArgs('three').returns(Promise.resolve());
      return mg.expect(promiseClient.map(['one', 'two', 'three'])).to.eventually.be.rejected
        .then(function() {
          promiseClient.resolveUpperCase.restore();
        });
    });

    it('should reject second promise', function() {
      mg.sinon.stub(promiseClient, 'resolveUpperCase')
        .withArgs('one').returns(Promise.resolve())
        .withArgs('two').returns(Promise.reject())
        .withArgs('three').returns(Promise.resolve());
      return mg.expect(promiseClient.map(['one', 'two', 'three'])).to.eventually.be.rejected
        .then(function() {
          promiseClient.resolveUpperCase.restore();
        });
    });

    it('should reject third promise', function() {
      mg.sinon.stub(promiseClient, 'resolveUpperCase')
        .withArgs('one').returns(Promise.resolve())
        .withArgs('two').returns(Promise.resolve())
        .withArgs('three').returns(Promise.reject());
      return mg.expect(promiseClient.map(['one', 'two', 'three'])).to.eventually.be.rejected
        .then(function() {
          promiseClient.resolveUpperCase.restore();
        });
    });

  });

}
