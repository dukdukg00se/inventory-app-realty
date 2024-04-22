const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InteriorInfoSchema = new Schema({
  bedrooms: {
    type: Number,
    MaxLength: 100,
    required: true,
  },
  bathrooms: {
    type: Number,
    MaxLength: 100,
    required: true,
  },
  kitchen: {
    type: String,
    required: true,
  },

  flooring: {
    type: String,
    required: true,
  },

  heating: String,
  cooling: String,
  appliances: String,
  other_features: String,
});

// Virtual for interior info URL
InteriorInfoSchema.virtual('url').get(function () {
  return `/admin/interiorinfo/${this._id}`;
});

module.exports = mongoose.model('InteriorInfo', InteriorInfoSchema);
