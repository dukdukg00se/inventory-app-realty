// Account schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AccountSchema = new Schema({
  type: {
    type: String,
    enum: ['basic', 'premium', 'platinum'],
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
  messages: String,
  created_on: {
    type: Date,
    default: Date.now(),
  },
});

// Export model
module.exports = mongoose.model('Account', AccountSchema);
