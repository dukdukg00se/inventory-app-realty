const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommunityInfoSchema = new Schema({
  community_features: String,
  region: {
    type: String,
    required: true,
  },
});

// Virtual for community info URL
CommunityInfoSchema.virtual('url').get(function () {
  return `/admin/communityinfo/${this._id}`;
});

module.exports = mongoose.model('CommunityInfo', CommunityInfoSchema);
