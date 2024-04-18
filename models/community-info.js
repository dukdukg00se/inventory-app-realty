const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommunityInfoSchema = new Schema({
  community_features: String,
  region: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('CommunityInfo', CommunityInfoSchema);
