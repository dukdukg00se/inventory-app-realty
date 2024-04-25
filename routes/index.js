const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'A Real Estate App' });
});

router.get('/myadmin', (req, res) => {
  res.redirect('/admin');
});

module.exports = router;
