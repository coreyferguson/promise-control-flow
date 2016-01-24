'use strict';

const Promise = require('bluebird');
const mg = require('../config/mocha-globals');
const promiseClient = require('../src/answers/util/promise-client-context').promiseClient;
const nodeJsClient = require('../src/node-js-client');

if (promiseClient.promisify('success') === undefined) {
  describe('06-promsify', function() {
    it('should resolve the promise');
  });
} else {
  describe('06-promsify', function() {

    it('should resolve the promise', function() {
      return mg.expect(promiseClient.promisify('success')).to.eventually.equal('SUCCESS');
    });

    it('should use Promise.promisify and nodeJsClient.resolveUpperCase', function() {
      mg.sinon.stub(Promise, 'promisify').returns(function(name) {
        return new Promise(function(resolve, reject) {
          resolve('successfully called promisify');
        });
      });
      return Promise.all([
        mg.expect(promiseClient.promisify('success'))
          .to.eventually.equal('successfully called promisify')
          .then(function() {
            Promise.promisify.restore();
          }),
        mg.expect(Promise.promisify).to.have.been.calledWith(nodeJsClient.resolveUpperCase)
      ]);
    });

  });
}
