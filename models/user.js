const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  first_name: {
    type: String,
    minLength: [3, 'First name too short'],
    maxLength: 100,
    required: true,
  },
  last_name: {
    type: String,
    minLength: [3, 'Last name too short'],
    maxLength: 100,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

// Virtual for user URL
UserSchema.virtual('url').get(function () {
  return `/admin/user/${this.id}`;
});

// Export model
module.exports = mongoose.model('User', UserSchema);
