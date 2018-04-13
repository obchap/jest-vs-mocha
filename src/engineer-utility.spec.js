const chai = require('chai');
const sinon = require('sinon');

const Engineer = require('./engineer');
const utility = require('./engineer-utility');

const { expect } = chai;

let sandbox;

describe('engineer-utility.js', () => {
  before(() => {
    sandbox = sinon.sandbox.create();
  });

  // You can setup a beforeAll to mock the exact mock
  // for every single test.  In this case though, you 
  // have to set up multiple stubs.
  // beforeEach(() => {
  //   const engineerStub = sandbox
  //     .stub(Engineer.prototype, 'getName')
  //     .returns('Willy');
  //   const engineerStub2 = sandbox
  //     .stub(Engineer.prototype, 'getActivityDetails')
  //     .returns(Promise.resolve(['walking', 'climbing']));
  // });

  afterEach(() => sandbox.restore());

  describe('getEngineerName', () => {
    it('should return the engineer name', () => {
      const engineerStub = sandbox
        .stub(Engineer.prototype, 'getName')
        .returns('Willy');

      const name = utility.getEngineerName();
      expect(name).to.equal('Willy');
    });

    it('should return the engineer activity details', async () => {

      const engineerStub = sandbox
        .stub(Engineer.prototype, 'getActivityDetails')
        .returns(Promise.resolve(['walking', 'climbing']));

      const details = await utility.getActivityDetails('hiking');
      expect(details).to.deep.equal(['walking', 'climbing']);
    });
  });
});