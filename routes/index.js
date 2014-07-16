var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Siren of Shame Web Listener' });
});

router.post('/turnon', function (req, res) {
    console.log('Turn on the siren!');
    res.render('index', { title: 'Siren of Shame Web Listener' });
});

module.exports = router;
