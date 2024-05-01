const User = require('../models/user');
const Account = require('../models/account');
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');

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
    Account.findOne({ users: req.params.id }, 'type').exec(),
  ]);

  if (user === null) {
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
exports.user_create_get = (req, res, next) => {
  res.render(`${userPath}/user-form`, {
    title: 'Create New User',
  });
};

// Handle user create on POST.
exports.user_create_post = [
  body('first_name')
    .trim()
    .isLength({ min: 2 })
    .escape()
    .withMessage('First name must be at least 2 characters.')
    .isAlphanumeric()
    .withMessage('Name has non-alphanumeric characters.'),
  body('last_name')
    .trim()
    .isLength({ min: 2 })
    .escape()
    .withMessage('Last name must be at least 2 characters.')
    .isAlphanumeric()
    .withMessage('Name has non-alphanumeric characters.'),
  body('email', 'Please submit a valid email.').trim().escape().isEmail(),

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
      res.render(`${userPath}/user-form`, {
        title: 'Create New User',
        user: user,
        errors: errors.array(),
      });
    } else {
      // Data from form is valid

      // Save user
      await user.save();

      // Redirect to new user record

      console.log(user);
      res.redirect(user.url);
    }
  }),
];

// Display user delete form on GET.
exports.user_delete_get = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: user delete GET');
});

// Handle user delete on POST.
exports.user_delete_post = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: user delete POST');
});

// Display user update form on GET.
exports.user_update_get = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: user update GET');
});

// Handle user update on POST.
exports.user_update_post = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: user update POST');
});
