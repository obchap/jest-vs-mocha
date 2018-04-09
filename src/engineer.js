const Contact = require('./contact');

function Engineer(name) {
  Contact.call(this, name, 'Engineer');
}

Engineer.prototype = Object.create(Contact.prototype);
Engineer.prototype.constructor = Engineer;

module.exports = Engineer;