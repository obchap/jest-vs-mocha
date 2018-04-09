const axios = require('axios');
const uuid = require('uuid/v4')

function Contact(name, profession = 'undecided') {
  this.name = name;
  this.profession = profession;
  this.id = uuid();
  // uncomment console.log to see how the mocking works with
  // before and after in the contact tests
  // console.log(this.id);
}

Contact.prototype.getName = function getName() {
  return this.name;
};

Contact.prototype.getProfession = function getProfession() {
  return this.profession;
};

Contact.prototype.getActivityDetails = async function getActivityDetails(activity) {
  try {
    const response = await axios.get(`yoursite.com/user/${this.id}?activities=${activity}`);
    return response.status;
  } catch (error) {
    throw error;
  }
};

module.exports = Contact;
