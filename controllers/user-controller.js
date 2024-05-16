const User = require('../models/user');
const Account = require('../models/account');
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const debug = require('debug')('user');

const userPath = './pages/admin/user';

// Display list of all users.
exports.user_list = asyncHandler(async (req, res, next) => {
  const allUsers = await User.find({}, 'first_name last_name').exec();

  res.render(`${userPath}/user-list`, {
    title: 'Users List',
    users_list: allUsers,
  });
});

// Display detail page for a specific user.
exports.user_detail = asyncHandler(async (req, res, next) => {
  const [user, userAccount] = await Promise.all([
    User.findById(req.params.id).exec(),
    Account.findOne({ users: req.params.id }, '_id').exec(),
  ]);

  if (user === null) {
    debug(`User id not found for details`);
    const err = new Error('User not found');
    err.status = 404;
    return next(err);
  }

  res.render(`${userPath}/user-detail`, {
    title: 'User Detail',
    user: user,
    user_account: userAccount,
  });
});

// Display user create form on GET.
exports.user_create_get = asyncHandler(async (req, res, next) => {
  const allAccounts = await Account.find({}, '_id').sort({ _id: 1 }).exec();

  res.render(`${userPath}/user-form`, {
    title: 'Create New User',
    accounts_list: allAccounts,
  });
});

// Handle user create on POST.
exports.user_create_post = [
  body('first_name')
    .trim()
    .isLength({ min: 2 })
    .escape()
    .withMessage('First name must be at least 2 characters.')
    .isAlphanumeric()
    .withMessage('First name must contain only letters and numbers.'),
  body('last_name')
    .trim()
    .isLength({ min: 2 })
    .escape()
    .withMessage('Last name must be at least 2 characters.')
    .isAlphanumeric()
    .withMessage('Last name must contain only letters and numbers.'),
  body('email').trim().escape().isEmail(),
  body('account').trim().escape(),

  asyncHandler(async (req, res, next) => {
    // Extract validation errors from request
    const errors = validationResult(req);

    // Create User object w/ escaped and trimmed data
    const user = new User({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
    });

    if (!errors.isEmpty()) {
      // Errors. Render form again with sanitized values/error msgs
      const allAccounts = await Account.find({}, '_id').sort({ _id: 1 }).exec();

      res.render(`${userPath}/user-form`, {
        title: 'Create New User',
        user: user,
        accounts_list: allAccounts,
        associated_account_id: req.body.account,
        errors: errors.array(),
      });
    } else {
      // Data from form is valid
      // Save user
      await user.save();

      // Add user to account
      const account = await Account.findById(req.body.account).exec();
      account.users.push(user._id);

      await account.save();

      // Redirect to new user record
      res.redirect(user.url);
    }
  }),
];

// Display user delete form on GET.
exports.user_delete_get = asyncHandler(async (req, res, next) => {
  const [user, account] = await Promise.all([
    User.findById(req.params.id).exec(),
    Account.findOne({ users: req.params.id }).exec(),
  ]);

  if (user === null) {
    debug(`User id not found for delete`);
    const err = new Error('User not found.');
    err.status = 404;
    return next(err);
  }

  res.render(`${userPath}/user-delete`, {
    title: 'Delete User',
    user: user,
    account: account,
  });
});

// Handle user delete on POST.
exports.user_delete_post = asyncHandler(async (req, res, next) => {
  const [user, account] = await Promise.all([
    User.findById(req.params.id).exec(),
    Account.findOne({ users: req.params.id }).exec(),
  ]);

  if (account.users.length < 2) {
    // Only one user on account. Render same as GET route
    res.render(`${userPath}/user-delete`, {
      title: 'Delete User',
      user: user,
      account: account,
    });
    return;
  } else {
    await Promise.all([
      Account.findOneAndUpdate(
        { users: req.body.userid },
        { $pull: { users: req.body.userid } }
      ),
      User.findByIdAndDelete(req.body.userid),
    ]);

    // await Account.findOneAndUpdate(
    //   { users: req.body.userid },
    //   { $pull: { users: req.body.userid } }
    // );

    // await User.findByIdAndDelete(req.body.userid);

    res.redirect('/admin/users');
  }
});

// Display user update form on GET.
exports.user_update_get = asyncHandler(async (req, res, next) => {
  const [user, account] = await Promise.all([
    User.findById(req.params.id).exec(),
    Account.findOne({ users: req.params.id }, '_id').exec(),
  ]);

  if (user === null) {
    debug(`User id not found for update`);
    const err = new Error('User not found');
    err.status = 404;
    return next(err);
  }

  res.render(`${userPath}/user-form`, {
    title: 'Update User',
    user: user,
    accounts_list: [account],
    associated_account_id: account._id,
  });
});

// Handle user update on POST.
exports.user_update_post = [
  body('first_name')
    .trim()
    .isLength({ min: 2 })
    .escape()
    .withMessage('First name must be at least 2 characters.')
    .isAlphanumeric()
    .withMessage('First name must contain only letters and numbers.'),
  body('last_name')
    .trim()
    .isLength({ min: 2 })
    .escape()
    .withMessage('Last name must be at least 2 characters.')
    .isAlphanumeric()
    .withMessage('Last name must contain only letters and numbers.'),
  body('email', 'Check email.').trim().escape().isEmail(),
  body('account').trim().escape(),

  body('verify_btn').trim().escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const user = new User({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      _id: req.params.id,
    });

    const account = await Account.findOne(
      { users: req.params.id },
      '_id'
    ).exec();

    if (!errors.isEmpty()) {
      res.render(`${userPath}/user-form`, {
        title: 'Update User',
        user: user,
        accounts_list: [account],
        associated_account_id: account._id,
        errors: errors.array(),
      });
    } else {
      if (account._id != req.body.account) {
        debug(`Account id not found for update: ${account._id}`);
        const err = new Error('Account number error.');
        err.status = 400;
        return next(err);
      }

      // Check if pw is correct
      // if (req.body.verify_btn != 'abcd') {
      //   debug(`Shucks, wrong password: ${req.body.verify_btn}`);
      //   const err = new Error('Wrong passowrd.');
      //   err.status = 400;
      //   return next(err);
      // }

      const updatedUser = await User.findByIdAndUpdate(req.params.id, user);

      res.redirect(updatedUser.url);
    }
  }),
];
