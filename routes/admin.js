const express = require('express');
const router = express.Router();

// Require controller modules
const account_controller = require('../controllers/account-controller');
const community_info_controller = require('../controllers/community-info-controller');
const home_controller = require('../controllers/home-controller');
const interior_info_controller = require('../controllers/interior-info-controller');
const property_info_controller = require('../controllers/property-info-controller');
const user_controller = require('../controllers/user-controller');

/// ACCOUNT ROUTES ///

// GET admin home landing page
router.get('/', account_controller.index);

// GET request for creating an Account. Place before routes that display Account (uses id)
router.get('/account/create', account_controller.account_create_get);

router.post('/account/create', account_controller.account_create_post);

router.get('/account/:id/delete', account_controller.account_delete_get);

router.get('/account/:id/delete', account_controller.account_delete_post);

router.get('/account/:id/update', account_controller.account_update_get);

router.post('/account/:id/update', account_controller.account_create_post);

router.get('/account/:id', account_controller.account_detail);

router.get('/accounts', account_controller.account_list);

/// COMMUNITY INFO ROUTES ///

// GET request for creating CommunityInfo. Place before routes that use id
router.get(
  '/communityinfo/create',
  community_info_controller.communityinfo_create_get
);

router.post(
  '/communityinfo/create',
  community_info_controller.communityinfo_create_post
);

router.get(
  '/communityinfo/:id/delete',
  community_info_controller.communityinfo_delete_get
);

router.post(
  '/communityinfo/id/delete',
  community_info_controller.communityinfo_delete_post
);

router.get(
  '/communityinfo/:id/update',
  community_info_controller.communityinfo_update_get
);

router.post(
  '/communityinfo/:id/update',
  community_info_controller.communityinfo_update_post
);

router.get(
  '/communityinfo/:id',
  community_info_controller.communityinfo_detail
);

router.get('/communityinfos', community_info_controller.communityinfo_list);

/// HOME ROUTES ///

// GET request for creating Home. Place before routes that use id
router.get('/home/create', home_controller.home_create_get);

router.post('/home/create', home_controller.home_create_post);

router.get('/home/:id/delete', home_controller.home_delete_get);

router.post('/home/:id/delete', home_controller.home_delete_post);

router.get('/home/:id/update', home_controller.home_update_get);

router.post('/home/:id/update', home_controller.home_update_post);

router.get('/home/:id', home_controller.home_detail);

router.get('/homes', home_controller.home_list);

/// INTERIOR INFO ROUTES ///

// GET request for creating InteriorInfo. Place before routes that use id
router.get(
  '/interiorinfo/create',
  interior_info_controller.interiorinfo_create_get
);

router.post(
  '/interiorinfo/create',
  interior_info_controller.interiorinfo_create_post
);

router.get(
  '/interiorinfo/:id/delete',
  interior_info_controller.interiorinfo_delete_get
);

router.post(
  '/interiorinfo/id/delete',
  interior_info_controller.interiorinfo_delete_post
);

router.get(
  '/interiorinfo/:id/update',
  interior_info_controller.interiorinfo_update_get
);

router.post(
  '/interiorinfo/:id/update',
  interior_info_controller.interiorinfo_update_post
);

router.get('/interiorinfo/:id', interior_info_controller.interiorinfo_detail);

router.get('/interiorinfos', interior_info_controller.interiorinfo_list);

/// PROPERTY INFO ROUTES ///

// GET request for creating PropertyInfo. Place before routes that use id
router.get(
  '/propertyinfo/create',
  property_info_controller.propertyinfo_create_get
);

router.post(
  '/propertyinfo/create',
  property_info_controller.propertyinfo_create_post
);

router.get(
  '/propertyinfo/:id/delete',
  property_info_controller.propertyinfo_delete_get
);

router.post(
  '/propertyinfo/id/delete',
  property_info_controller.propertyinfo_delete_post
);

router.get(
  '/propertyinfo/:id/update',
  property_info_controller.propertyinfo_update_get
);

router.post(
  '/propertyinfo/:id/update',
  property_info_controller.propertyinfo_update_post
);

router.get('/propertyinfo/:id', property_info_controller.propertyinfo_detail);

router.get('/propertyinfos', property_info_controller.propertyinfo_list);

/// USER INFO ROUTES ///

// GET request for creating User. Place before routes that use id
router.get('/user/create', user_controller.user_create_get);

router.post('/user/create', user_controller.user_create_post);

router.get('/user/:id/delete', user_controller.user_delete_get);

router.post('/user/id/delete', user_controller.user_delete_post);

router.get('/user/:id/update', user_controller.user_update_get);

router.post('/user/:id/update', user_controller.user_update_post);

router.get('/user/:id', user_controller.user_detail);

router.get('/users', user_controller.user_list);

router.get('/user', (req, res) => {
  res.redirect('/admin/users');
});

module.exports = router;
