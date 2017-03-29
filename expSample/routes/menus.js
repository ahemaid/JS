var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {

  var menus = '';

  for (var i = 0; i < 3; i++) {
    menus += `<li> <a href="/">Home Page</a> </li>`;
  }

  res.render('menus', {
    title: 'test',
    menus: menus
  });
});

module.exports = router;
