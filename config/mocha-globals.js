'use strict';

let chai = require('chai');
let chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

let sinon = require('sinon');
let sinonChai = require('sinon-chai');
chai.use(sinonChai);

module.exports = {
  expect: chai.expect,
  sinon: sinon
};
