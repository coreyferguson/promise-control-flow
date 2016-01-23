'use strict';

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

var sinon = require('sinon');
var sinonChai = require('sinon-chai');
chai.use(sinonChai);

module.exports = {
  expect: chai.expect,
  sinon: sinon
};
