const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PropertyInfoSchema = new Schema({
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
});

// Virtual for property info URL
PropertyInfoSchema.virtual('url').get(function () {
  return `/propertyinfo/${this._id}`;
});

module.exports = mongoose.model('PropertyInfo', PropertyInfoSchema);
