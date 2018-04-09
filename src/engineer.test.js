const fs = require('fs');

const Engineer = require('./engineer');

jest.mock('fs');

describe('engineer.js', () => {
  describe('getName', () => {
    test('should return the name', () => {
      const engineer = new Engineer('Bill');
      const name = engineer.getName();
      expect(name).toBe('Bill');
    });
  });

  describe('getProfession', () => {
    test('should return the profession', () => {
      const engineer = new Engineer('Bill');
      const profession = engineer.getProfession();
      expect(profession).toBe('Engineer');
    });
  });
});
