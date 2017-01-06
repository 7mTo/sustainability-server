var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

var db = require('../queries');

router.get('/api/sustainability', db.getBackedScans);
router.get('/api/sustainability/:id', db.getSingleUser);
router.post('/api/sustainability', db.createUser);
router.post('/api/sustainability', db.createScan);
router.put('/api/sustainability/:id', db.updateUser);
router.delete('/api/sustainability/:id', db.removeUser);

module.exports = router;
