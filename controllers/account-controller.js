const Account = require('../models/account');
const Home = require('../models/home');
const User = require('../models/user');

const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');

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
  const allAccounts = await Account.find({}, 'user')
    .sort({ type: 1 })
    .populate('users')
    .exec();

  res.render(`${accountPath}/account-list`, {
    title: 'All Accounts',
    accounts_list: allAccounts,
  });
});

// Display detail page for a specific Account
exports.account_detail = asyncHandler(async (req, res, next) => {
  const account = await Account.findById(req.params.id)
    .populate({
      path: 'users',
      select: 'first_name last_name',
    })
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
exports.account_create_get = (req, res, next) => {
  res.render(`${accountPath}/account-form`, {
    title: 'Create New Account',
  });
};

// Handle Account create on POST
exports.account_create_post = [
  body('first_name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .escape()
    .withMessage('First name length must be between 2 and 100.')
    .isAlphanumeric()
    .withMessage('First name must be alphanumeric.'),
  body('last_name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .escape()
    .withMessage('Last name length must be between 2 and 100.')
    .isAlphanumeric()
    .withMessage('Last name must be alphanumeric.'),
  body('email', 'Must be a valid email').trim().escape().isEmail(),
  body('account', 'Check account field.').trim().escape().notEmpty(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const newUser = new User({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
    });

    const newAccount = new Account({
      type: req.body.account,
      users: newUser._id,
    });

    if (!errors.isEmpty()) {
      res.render(`${accountPath}/account-form`, {
        title: 'Create New Account',
        account: newAccount,
        user: newUser,
        errors: errors.array(),
      });
    } else {
      await newUser.save();
      await newAccount.save();

      res.redirect(newAccount.url);
    }
  }),
];

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
