const axios = require('axios');

const Engineer = require('./engineer');

const getEngineerName = () => {
  const engineer = new Engineer('Mick');
  return engineer.getName();
}

const getActivityDetails = async url => {
  const engineer = new Engineer('Mick');
  try {
    const response = await engineer.getActivityDetails('hiking');
    return response;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getActivityDetails,
  getEngineerName,
}