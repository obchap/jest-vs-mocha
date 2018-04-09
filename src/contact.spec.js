const axios = require('axios');
const chai = require('chai');
const sinon = require('sinon');

const Contact = require('./contact');

const { expect } = chai;

let sandbox;

describe('contact.js', () => {
  before(() => {
    sandbox = sinon.sandbox.create();
  });

  describe('getName', () => {
    it('should return the name', () => {
      const contact = new Contact('Bill');
      const name = contact.getName();
      expect(name).to.equal('Bill');
    });
  });

  describe('getProfession', () => {
    it('should return the undecided if no profession is given', () => {
      const contact = new Contact('Bill');
      const profession = contact.getProfession();
      expect(profession).to.equal('undecided');
    });
  });

  describe('getSiteStatus', () => {
    afterEach(() => {
      sandbox.restore();
    });

    it('should return status of 200', async () => {
      const contact = new Contact('Bill', 'engineer');

      sandbox.stub(axios, 'get').returns(Promise.resolve({ status: 200 }));
      try {
        const status = await contact.getActivityDetails('programming');
        expect(status).to.equal(200);
      } catch (error) {
        expect.fail(error);
      }
    });

    it('should call the correct URL', async () => {
      const contact = new Contact('Bill', 'engineer');
      const id = contact.id;

      const getMock = sandbox.mock(axios, 'get').returns(Promise.resolve({ status: 200 }));

      try {
        const status = await contact.getActivityDetails('programming');
        // expect(axios.get).toBeCalledWith(`yoursite.com/user/${id}?activities=programming`);
        // console.log(getStub);
        // expect(getStub.calledWith(`yoursite.com/user/${id}?activities=programming`)).to.equal(false);
        getMock.verify();
      } catch (error) {
        expect.fail(error);
      }
    });

    // test('should return an error when axios fails', async () => {
    //   const contact = new Contact('Bill', 'engineer');

    //   axios.get.mockRejectedValue(new Error('failed to get site'));
    //   try {
    //     const status = await contact.getActivityDetails('programming');
    //     fail('Should not have successfully gotten a response');
    //   } catch (error) {
    //     expect(error.message).toBe('failed to get site');
    //   }
    // });
  });
});