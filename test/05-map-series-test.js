'use strict';

const Promise = require('bluebird');
const mg = require('../config/mocha-globals');
const promiseClient = require('../src/answers/util/promise-client-context').promiseClient;

if (promiseClient.mapSeries(['one', 'two']) === undefined) {
  describe('05-mapSeries', function() {
    it('should run 2 promises in sequence');
  });
} else {
  describe('05-mapSeries', function() {

    it('should run 2 promises in sequence', function() {
      let startTimeMs = new Date().getTime();
      return promiseClient.mapSeries(['one', 'two']).then(function(responses) {
        let endTimeMs = new Date().getTime();
        return [
          mg.expect(responses.length).to.equal(2),
          mg.expect(responses[0]).to.equal('ONE'),
          mg.expect(responses[1]).to.equal('TWO'),
          mg.expect(endTimeMs-startTimeMs).to.be.within(95, 105, 'Operation should take 100ms to complete')
        ];
      });
    });

    it('should run 3 promises in sequence', function() {
      let startTimeMs = new Date().getTime();
      return promiseClient.mapSeries(['one', 'two', 'three']).then(function(responses) {
        let endTimeMs = new Date().getTime();
        return [
          mg.expect(responses.length).to.equal(3),
          mg.expect(responses[0]).to.equal('ONE'),
          mg.expect(responses[1]).to.equal('TWO'),
          mg.expect(responses[2]).to.equal('THREE'),
          mg.expect(endTimeMs-startTimeMs).to.be.within(145, 155, 'Operation should take 150ms to complete')
        ];
      });
    });

    it('should reject first promise', function() {
      mg.sinon.stub(promiseClient, 'resolveUpperCase')
        .withArgs('one').returns(Promise.reject())
        .withArgs('two').returns(Promise.resolve())
        .withArgs('three').returns(Promise.resolve());
      return mg.expect(promiseClient.mapSeries(['one', 'two', 'three'])).to.eventually.be.rejected
        .then(function() {
          promiseClient.resolveUpperCase.restore();
        });
    });

    it('should reject second promise', function() {
      mg.sinon.stub(promiseClient, 'resolveUpperCase')
        .withArgs('one').returns(Promise.reject())
        .withArgs('two').returns(Promise.resolve())
        .withArgs('three').returns(Promise.resolve());
      return mg.expect(promiseClient.mapSeries(['one', 'two', 'three'])).to.eventually.be.rejected
        .then(function() {
          promiseClient.resolveUpperCase.restore();
        });
    });

    it('should reject third promise', function() {
      mg.sinon.stub(promiseClient, 'resolveUpperCase')
        .withArgs('one').returns(Promise.reject())
        .withArgs('two').returns(Promise.resolve())
        .withArgs('three').returns(Promise.resolve());
      return mg.expect(promiseClient.mapSeries(['one', 'two', 'three'])).to.eventually.be.rejected
        .then(function() {
          promiseClient.resolveUpperCase.restore();
        });
    });

  });
}

