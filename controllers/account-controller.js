const Account = require('../models/account');
const CommunityInfo = require('../models/community-info');
const Home = require('../models/home');
const InteriorInfo = require('../models/interior-info');
const PropertyInfo = require('../models/property-info');
const User = require('../models/user');

const asyncHandler = require('express-async-handler');

// Main page for Admin route
exports.index = asyncHandler(async (req, res, next) => {
  const [
    numAccounts,
    numCommunityInfos,
    numHomes,
    numInteriorInfos,
    numPropertyInfos,
    numUsers,
  ] = await Promise.all([
    Account.countDocuments({}).exec(),
    CommunityInfo.countDocuments({}).exec(),
    Home.countDocuments({}).exec(),
    InteriorInfo.countDocuments({}).exec(),
    PropertyInfo.countDocuments({}).exec(),
    User.countDocuments({}).exec(),
  ]);

  res.render('./pages/admin/index', {
    title: 'Admin Dashboard',
    accounts_count: numAccounts,
    communityinfos_count: numCommunityInfos,
    homes_count: numHomes,
    interiorinfos_count: numInteriorInfos,
    propertyinfos_count: numPropertyInfos,
    users_count: numUsers,
  });
});

// Display list of Accounts
exports.account_list = asyncHandler(async (req, res, next) => {
  // res.send('NOT IMPLEMENTED: Account List');

  const allAccounts = await Account.find({}, 'type user created_on')
    .sort({ type: 1 })
    .populate('user')
    .exec();

  res.render('./pages/admin/account/account-list', {
    title: 'All Accounts',
    accounts_list: allAccounts,
  });
});

// Display detail page for a specific Account
exports.account_detail = asyncHandler(async (req, res, next) => {
  res.send(`NOT IMPLEMENTED: Account detail: ${req.params.id}`);
});

// Display Account create form on GET
exports.account_create_get = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Account create GET');
});

// Handle Account create on POST
exports.account_create_post = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Account create POST');
});

// Display Account delete form on GET
exports.account_delete_get = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Account delete GET');
});

// Handle Account delete on POST
exports.account_delete_post = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Account delete POST');
});

// Display Account update form on GET
exports.account_update_get = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Account update GET');
});

// Handle Account update on POST
exports.account_update_post = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Account update POST');
});
