const express = require('express');
const router = express.Router();

// Require controller modules
const account_controller = require('../controllers/account-controller');
const home_controller = require('../controllers/home-controller');
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
