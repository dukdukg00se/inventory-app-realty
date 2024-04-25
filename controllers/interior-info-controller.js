const InteriorInfo = require('../models/interior-info');
const asyncHandler = require('express-async-handler');

// Display list of all interiorinfos.
exports.interiorinfo_list = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: interiorinfo list');
});

// Display detail page for a specific interiorinfo.
exports.interiorinfo_detail = asyncHandler(async (req, res, next) => {
  res.send(`NOT IMPLEMENTED: interiorinfo detail: ${req.params.id}`);
});

// Display interiorinfo create form on GET.
exports.interiorinfo_create_get = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: interiorinfo create GET');
});

// Handle interiorinfo create on POST.
exports.interiorinfo_create_post = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: interiorinfo create POST');
});

// Display interiorinfo delete form on GET.
exports.interiorinfo_delete_get = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: interiorinfo delete GET');
});

// Handle interiorinfo delete on POST.
exports.interiorinfo_delete_post = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: interiorinfo delete POST');
});

// Display interiorinfo update form on GET.
exports.interiorinfo_update_get = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: interiorinfo update GET');
});

// Handle interiorinfo update on POST.
exports.interiorinfo_update_post = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: interiorinfo update POST');
});
