const chai = require('chai');

const Engineer = require('./engineer');

const { expect } = chai;

describe('engineer.js', () => {
  describe('getName', () => {
    it('should return the name', () => {
      const engineer = new Engineer('Bill');
      const name = engineer.getName();
      expect(name).to.equal('Bill');;
    });
  });

  describe('getProfession', () => {
    it('should return the profession', () => {
      const engineer = new Engineer('Bill');
      const profession = engineer.getProfession();
      expect(profession).to.equal('Engineer');
    });
  });
});
