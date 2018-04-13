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
      const status = await contact.getActivityDetails('programming');
      expect(status).to.equal(200);
    });

    it('should call the correct URL', async () => {
      const contact = new Contact('Bill', 'engineer');
      const id = contact.id;

      const getMock = sandbox
        .mock(axios)
        .expects('get')
        .withArgs(`yoursite.com/user/${id}?activities=programming`)
        .returns(Promise.resolve({ status: 200 }));

      const status = await contact.getActivityDetails('programming');
      getMock.verify();
    });

    it('should call the correct URL', async () => {
      const contact = new Contact('Bill', 'engineer');
      const id = contact.id;

      const getMock = sandbox
        .mock(axios)
        .expects('get')
        .returns(Promise.reject(new Error('failed to get site')));
      try {
        await contact.getActivityDetails('programming');
        expect.fail();
      } catch (error) {
        expect(error.message).to.equal('failed to get site');
      }
    });
  });
});