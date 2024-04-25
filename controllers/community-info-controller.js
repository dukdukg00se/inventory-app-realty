const CommunityInfo = require('../models/community-info');
const asyncHandler = require('express-async-handler');

// Display list of all CommunityInfos.
exports.communityinfo_list = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: CommunityInfo list');
});

// Display detail page for a specific CommunityInfo.
exports.communityinfo_detail = asyncHandler(async (req, res, next) => {
  res.send(`NOT IMPLEMENTED: CommunityInfo detail: ${req.params.id}`);
});

// Display CommunityInfo create form on GET.
exports.communityinfo_create_get = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: CommunityInfo create GET');
});

// Handle CommunityInfo create on POST.
exports.communityinfo_create_post = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: CommunityInfo create POST');
});

// Display CommunityInfo delete form on GET.
exports.communityinfo_delete_get = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: CommunityInfo delete GET');
});

// Handle CommunityInfo delete on POST.
exports.communityinfo_delete_post = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: CommunityInfo delete POST');
});

// Display CommunityInfo update form on GET.
exports.communityinfo_update_get = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: CommunityInfo update GET');
});

// Handle CommunityInfo update on POST.
exports.communityinfo_update_post = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: CommunityInfo update POST');
});
