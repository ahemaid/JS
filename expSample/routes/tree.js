var express = require('express');
var router = express.Router();

/* GET Menus list. */
router.get('/', function(req, res) {

  var tree = '<ul ><li class="current"><a href="http://localhost:3000/">Home</a></li><li><a href="http://localhost:3000/users">Users</a></li><li><a href="http://localhost:3000/visualization1">Visualization</a></li><li><a href="http://localhost:3000/contactus">Contact Us</a></li></ul>';
res.render('tree', {
title: 'test',
 tree: tree
});
});

module.exports = router;
