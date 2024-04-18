// User schema code
const { kMaxLength } = require('buffer');
const mongoose = require('mongoose');
const { userInfo, type } = require('os');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  first_name: {
    type: String,
    MaxLength: 100,
    required: [true, 'Why no first name?'],
  },
  last_name: {
    type: String,
    MaxLength: 100,
    required: [true, 'Why no last name?'],
  },
  email: {
    type: String,
    required: true,
  },
});

// Export model
module.exports = mongoose.model('User', UserSchema);
