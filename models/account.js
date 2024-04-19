const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AccountSchema = new Schema({
  type: {
    type: String,
    enum: ['Basic', 'Guided', 'White Glove'],
    default: 'Basic',
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  homes: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Home',
    },
  ],
  created_on: {
    type: Date,
    default: Date.now(),
  },
});

// Virtual for account URL
AccountSchema.virtual('url').get(function () {
  return `/admin/account/${this._id}`;
});

module.exports = mongoose.model('Account', AccountSchema);
