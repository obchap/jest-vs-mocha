const axios = require('axios');

const Contact = require('./contact');
const uuid = require('uuid/v4');

jest.mock('axios');
jest.mock('uuid/v4');

describe('contact.js', () => {
  uuid.mockImplementation(() => 1233456);
  describe('getName', () => {
    test('should return the name', () => {
      const contact = new Contact('Bill');
      const name = contact.getName();
      expect(name).toBe('Bill');
    });
  });

  describe('getProfession', () => {
    test('should return the undecided if no profession is given', () => {
      const contact = new Contact('Bill');
      const profession = contact.getProfession();
      expect(profession).toBe('undecided');
    });
  });

  describe('getSiteStatus', () => {
    // this will clear out the mockImplementation or
    // uuid from above
    beforeEach(() => jest.resetAllMocks());

    test('should return status of 200', async () => {
      const contact = new Contact('Bill', 'engineer');

      axios.get.mockResolvedValue({ status: 200 });
      try {
        const status = await contact.getActivityDetails('programming');
        expect(status).toBe(200);
      } catch (error) {
        fail(error);
      }
    });

    test('should call the correct URL', async () => {
      const contact = new Contact('Bill', 'engineer');
      const id = contact.id;

      axios.get.mockResolvedValue({ status: 200 });

      try {
        const status = await contact.getActivityDetails('programming');
        expect(axios.get).toBeCalledWith(`yoursite.com/user/${id}?activities=programming`);
        expect(axios.get.mock.calls.length).toBe(1);
        expect(axios.get.mock.calls[0][0]).toBe(`yoursite.com/user/${id}?activities=programming`);
      } catch (error) {
        fail(error);
      }
    });

    test('should return an error when axios fails', async () => {
      const contact = new Contact('Bill', 'engineer');

      axios.get.mockRejectedValue(new Error('failed to get site'));
      try {
        const status = await contact.getActivityDetails('programming');
        fail('Should not have successfully gotten a response');
      } catch (error) {
        expect(error.message).toBe('failed to get site');
      }
    });
  });
});
