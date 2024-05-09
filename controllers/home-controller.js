const Home = require('../models/home');
const Account = require('../models/account');
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');

const homePath = './pages/admin/home';
// Display list of all homes.
exports.home_list = asyncHandler(async (req, res, next) => {
  const allHomes = await Home.find(
    {},
    'address price interior_info property_info.lot_size'
  )
    .sort({ price: 1 })
    .exec();

  res.render(`${homePath}/home-list`, {
    title: 'Homes List',
    homes_list: allHomes,
  });
});

// Display detail page for a specific home.
exports.home_detail = asyncHandler(async (req, res, next) => {
  const [home, allAccounts] = await Promise.all([
    Home.findById(req.params.id).exec(),
    Account.find({ homes: req.params.id }, '_id').exec(),
  ]);

  res.render(`${homePath}/home-detail`, {
    title: 'Home Details',
    home: home,
    accounts_list: allAccounts,
  });
});

// Display home create form on GET.
exports.home_create_get = (req, res, next) => {
  res.render(`${homePath}/home-form`, {
    title: 'Create New Home',
  });
};

// Handle home create on POST.
exports.home_create_post = [
  // Check for correct price input
  (req, res, next) => {
    // Regex to match a valid currency in format of dollars and cents
    const currRegEx = /^\$?\d+(,\d{3})*(\.\d{1,2})?$/;

    if (!currRegEx.test(req.body.price)) {
      req.body.price = NaN;
    } else {
      // Remove non-digit chars except for a decimal point
      const cleanedInput = req.body.price.replace(/[^\d.]/g, '');

      // Convert to number
      const number = +cleanedInput;
      req.body.price = number;
    }

    next();
  },

  body('address', 'Check address.')
    .trim()
    .isLength({ min: 2, max: 100 })
    .escape(),
  body('price', 'Check price.').isFloat({ min: 5 }),
  body('bedrooms', 'Check bedrooms.')
    .trim()
    .isInt({ min: 1, max: 200 })
    .escape(),
  body('bathrooms', 'Check bathrooms.').isInt({ min: 1, max: 200 }).escape(),
  body('kitchen').trim().escape(),
  body('flooring', 'Check flooring.')
    .trim()
    .isLength({ min: 2, max: 100 })
    .escape(),
  body('heating').trim().escape(),
  body('cooling').trim().escape(),
  body('appliances').trim().escape(),
  body('interior_other').trim().escape(),
  body('sewer', 'Check sewer.').trim().isLength({ min: 2, max: 100 }).escape(),
  body('water', 'Check water.').trim().isLength({ min: 2, max: 100 }).escape(),
  body('parking', 'Check parking.').trim().isInt({ min: 0 }).escape(),
  body('lot', 'Check lot size.').trim().isLength({ min: 2, max: 100 }).escape(),
  body('construction', 'Check construction type.')
    .trim()
    .isLength({ min: 2, max: 100 })
    .escape(),
  body('prop_other').trim().escape(),
  body('year_built', 'Check year built.').trim().isInt({ min: 1700 }).escape(),
  body('community').trim().escape(),
  body('region', 'Check region.')
    .trim()
    .isLength({ min: 2, max: 100 })
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const home = new Home({
      address: req.body.address,
      price: req.body.price,
      interior_info: {
        bedrooms: req.body.bedrooms,
        bathrooms: req.body.bathrooms,
        kitchen: req.body.kitchen,
        flooring: req.body.flooring,
        heating: req.body.heating,
        cooling: req.body.cooling,
        applicances: req.body.appliances,
        other_features: req.body.interior_other,
      },
      property_info: {
        parking: req.body.parking,
        lot_size: req.body.lot,
        construction_type: req.body.construction,
        year_built: req.body.year_built,
        utilities: {
          sewer: req.body.sewer,
          water: req.body.water,
        },
        other_features: req.body.prop_other,
      },
      community_info: {
        community_features: req.body.community,
        region: req.body.region,
      },
    });

    if (!errors.isEmpty()) {
      res.render(`${homePath}/home-form`, {
        title: 'Create New Home',
        home: home,
        errors: errors.array(),
      });
    } else {
      await home.save();
      res.redirect(home.url);
    }
  }),
];

// Display home delete form on GET.
exports.home_delete_get = asyncHandler(async (req, res, next) => {
  const [home, allAccounts] = await Promise.all([
    Home.findById(req.params.id).exec(),
    Account.find({ homes: req.params.id }, '_id').exec(),
  ]);

  if (home === null) {
    const err = new Error('Home not found');
    err.status = 404;
    return next(err);
  }

  res.render(`${homePath}/home-delete`, {
    title: 'Delete Home',
    home: home,
    accounts: allAccounts,
  });
});

// Handle home delete on POST.
exports.home_delete_post = asyncHandler(async (req, res, next) => {
  // Remove home from all accounts and delete home concurrently
  await Promise.all([
    Account.updateMany(
      { homes: req.body.homeid },
      { $pull: { homes: req.body.homeid } }
    ),
    Home.findByIdAndDelete(req.body.homeid),
  ]);

  // // Remove home from all accounts
  // await Account.updateMany(
  //   { homes: req.body.homeid },
  //   { $pull: { homes: req.body.homeid } }
  // );

  // // Delete home
  // await Home.findByIdAndDelete(req.body.homeid);

  res.redirect('/admin/homes');
});

// Display home update form on GET.
exports.home_update_get = asyncHandler(async (req, res, next) => {
  const home = await Home.findById(req.params.id).exec();

  if (home === null) {
    const err = new Error('Home not found.');
    err.status = 404;
    return next(err);
  }

  res.render(`${homePath}/home-form`, {
    title: 'Update Home',
    home: home,
  });
});

// Handle home update on POST.
exports.home_update_post = [
  // Check for correct price input
  (req, res, next) => {
    // Regex to match a valid currency in format of dollars and cents
    const currRegEx = /^\$?\d+(,\d{3})*(\.\d{1,2})?$/;

    if (!currRegEx.test(req.body.price)) {
      req.body.price = NaN;
    } else {
      // Remove non-digit chars except for a decimal point
      const cleanedInput = req.body.price.replace(/[^\d.]/g, '');

      // Convert to number
      const number = +cleanedInput;
      req.body.price = number;
    }

    next();
  },

  body('address', 'Check address.')
    .trim()
    .isLength({ min: 2, max: 100 })
    .escape(),
  body('price', 'Check price.').isFloat({ min: 5 }),
  body('bedrooms', 'Check bedrooms.')
    .trim()
    .isInt({ min: 1, max: 200 })
    .escape(),
  body('bathrooms', 'Check bathrooms.').isInt({ min: 1, max: 200 }).escape(),
  body('kitchen').trim().escape(),
  body('flooring', 'Check flooring.')
    .trim()
    .isLength({ min: 2, max: 100 })
    .escape(),
  body('heating').trim().escape(),
  body('cooling').trim().escape(),
  body('appliances').trim().escape(),
  body('interior_other').trim().escape(),
  body('sewer', 'Check sewer.').trim().isLength({ min: 2, max: 100 }).escape(),
  body('water', 'Check water.').trim().isLength({ min: 2, max: 100 }).escape(),
  body('parking', 'Check parking.').trim().isInt({ min: 0 }).escape(),
  body('lot', 'Check lot size.').trim().isLength({ min: 2, max: 100 }).escape(),
  body('construction', 'Check construction type.')
    .trim()
    .isLength({ min: 2, max: 100 })
    .escape(),
  body('prop_other').trim().escape(),
  body('year_built', 'Check year built.').trim().isInt({ min: 1700 }).escape(),
  body('community').trim().escape(),
  body('region', 'Check region.')
    .trim()
    .isLength({ min: 2, max: 100 })
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const home = new Home({
      address: req.body.address,
      price: req.body.price,
      interior_info: {
        bedrooms: req.body.bedrooms,
        bathrooms: req.body.bathrooms,
        kitchen: req.body.kitchen,
        flooring: req.body.flooring,
        heating: req.body.heating,
        cooling: req.body.cooling,
        appliances: req.body.appliances,
        other_features: req.body.interior_other,
      },
      property_info: {
        parking: req.body.parking,
        lot_size: req.body.lot,
        construction_type: req.body.construction,
        year_built: req.body.year_built,
        utilities: {
          sewer: req.body.sewer,
          water: req.body.water,
        },
        other_features: req.body.prop_other,
      },
      community_info: {
        community_features: req.body.community,
        region: req.body.region,
      },
      _id: req.params.id,
    });

    if (!errors.isEmpty()) {
      res.render(`${homePath}/home-form`, {
        title: 'Update New Home',
        home: home,
        errors: errors.array(),
      });
    } else {
      const updatedHome = await Home.findByIdAndUpdate(req.params.id, home);
      res.redirect(updatedHome.url);
    }
  }),
];
