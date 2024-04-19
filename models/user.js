const mongoose = require('mongoose');
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

// Virtual for user URL
UserSchema.virtual('url').get(function () {
  return `/admin/user/${this.id}`;
});

// Export model
module.exports = mongoose.model('User', UserSchema);
