const PropertyInfo = require('../models/property-info');
const asyncHandler = require('express-async-handler');

// Display list of all propertyinfos.
exports.propertyinfo_list = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: propertyinfo list');
});

// Display detail page for a specific propertyinfo.
exports.propertyinfo_detail = asyncHandler(async (req, res, next) => {
  res.send(`NOT IMPLEMENTED: propertyinfo detail: ${req.params.id}`);
});

// Display propertyinfo create form on GET.
exports.propertyinfo_create_get = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: propertyinfo create GET');
});

// Handle propertyinfo create on POST.
exports.propertyinfo_create_post = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: propertyinfo create POST');
});

// Display propertyinfo delete form on GET.
exports.propertyinfo_delete_get = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: propertyinfo delete GET');
});

// Handle propertyinfo delete on POST.
exports.propertyinfo_delete_post = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: propertyinfo delete POST');
});

// Display propertyinfo update form on GET.
exports.propertyinfo_update_get = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: propertyinfo update GET');
});

// Handle propertyinfo update on POST.
exports.propertyinfo_update_post = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: propertyinfo update POST');
});
