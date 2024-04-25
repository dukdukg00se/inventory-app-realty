const Home = require('../models/home');
const asyncHandler = require('express-async-handler');

// Display list of all homes.
exports.home_list = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: home list');
});

// Display detail page for a specific home.
exports.home_detail = asyncHandler(async (req, res, next) => {
  res.send(`NOT IMPLEMENTED: home detail: ${req.params.id}`);
});

// Display home create form on GET.
exports.home_create_get = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: home create GET');
});

// Handle home create on POST.
exports.home_create_post = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: home create POST');
});

// Display home delete form on GET.
exports.home_delete_get = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: home delete GET');
});

// Handle home delete on POST.
exports.home_delete_post = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: home delete POST');
});

// Display home update form on GET.
exports.home_update_get = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: home update GET');
});

// Handle home update on POST.
exports.home_update_post = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: home update POST');
});
