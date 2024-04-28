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
  },
  property_info: {
    parking: {
      type: Number,
      MaxLength: 100,
      required: true,
    },
    lot_size: {
      type: String,
      required: true,
    },
    construction_type: {
      type: String,
      required: true,
    },
    year_built: {
      type: Number,
      required: true,
    },
    utilities: {
      sewer: { type: String, required: true },
      water: { type: String, required: true },
    },
    other_features: String,
  },
  community_info: {
    community_features: String,
    region: {
      type: String,
      required: true,
    },
  },
});

// Virtual for home URL
HomeSchema.virtual('url').get(function () {
  return `/admin/home/${this._id}`;
});

module.exports = mongoose.model('Home', HomeSchema);
