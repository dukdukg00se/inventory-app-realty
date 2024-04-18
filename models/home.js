const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HomeSchema = new Schema({
  address: {
    type: String,
    MaxLength: 100,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  interior_info: {
    type: Schema.Types.ObjectId,
    ref: 'InteriorInfo',
    required: true,
  },
  property_info: {
    type: Schema.Types.ObjectId,
    ref: 'PropertyInfo',
    required: true,
  },
  community_info: {
    type: Schema.Types.ObjectId,
    ref: 'CommunityInfo',
    required: true,
  },
});

module.exports = mongoose.model('Home', HomeSchema);