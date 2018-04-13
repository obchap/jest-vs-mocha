const Engineer = require('./engineer');
const utility = require('./engineer-utility');

jest.mock('./engineer');

describe('engineer-utility.js', () => {
  describe('getEngineerName', () => {
    afterEach(() => jest.resetAllMocks());
    // You can setup a beforeAll to mock the exact mock
    // for every single test
    // beforeAll(() => {
    //   Engineer.mockImplementation(() => {
    //     return {
    //       getName: () => {
    //         return 'Jane';
    //       },
    //       getActivityDetails: jest.fn(),
    //     };
    //   });
    // });

    test('should return the engineer name', () => {
      Engineer.mockImplementation(() => {
        return {
          getName: () => {
            return 'Jane';
          },
        };
      });
      const name = utility.getEngineerName();
      expect(name).toBe('Jane');
    });

    test('should return the engineer activity details', async () => {
      Engineer.mockImplementation(() => {
        return {
          getActivityDetails: () => Promise.resolve(['walking', 'climbing']),
        };
      });
      try {
        const details = await utility.getActivityDetails('hiking');
        expect(details).toEqual(['walking', 'climbing']);
      } catch (error) {
        // incase there is another error that happens in the function,
        // it's a good practice to catch the error and then fail it
        fail(error)
      }
    });
  });
});
