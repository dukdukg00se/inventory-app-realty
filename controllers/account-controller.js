const Account = require('../models/account');
const Home = require('../models/home');
const User = require('../models/user');

const asyncHandler = require('express-async-handler');

const accountPath = './pages/admin/account';

// Main page for Admin route
exports.index = asyncHandler(async (req, res, next) => {
  const [numAccounts, numHomes, numUsers] = await Promise.all([
    Account.countDocuments({}).exec(),
    Home.countDocuments({}).exec(),
    User.countDocuments({}).exec(),
  ]);

  res.render('./pages/admin/index', {
    title: 'Admin Dashboard',
    accounts_count: numAccounts,
    homes_count: numHomes,
    users_count: numUsers,
  });
});

// Display list of Accounts
exports.account_list = asyncHandler(async (req, res, next) => {
  const allAccounts = await Account.find({}, 'type user created_on')
    .sort({ type: 1 })
    .populate('user')
    .exec();

  res.render(`${accountPath}/account-list`, {
    title: 'All Accounts',
    accounts_list: allAccounts,
  });
});

// Display detail page for a specific Account
exports.account_detail = asyncHandler(async (req, res, next) => {
  const account = await Account.findById(req.params.id)
    .populate('user')
    .populate('homes')
    .exec();

  if (account === null) {
    // No results
    const err = new Error('Genre not found');
    err.status = 404;
    return next(err);
  }

  res.render(`${accountPath}/account-detail`, {
    title: 'Account Details',
    account: account,
  });
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
