var express = require('express');
var router = express.Router();
var sos = require('sos-device');

/* GET home page. */
router.get('/', function(req, res) {
    sos.connect(function(err, sosDevice) {
        if (err) {
            res.render('index', { title: 'Siren of Shame Web Listener', err: err });
        }
        sosDevice.readAllInfo(function(err2, deviceInfo) {
            if (err2) {
                res.render('index', { title: 'Siren of Shame Web Listener', err: err2 });
            } else {
                console.log("deviceInfo:", deviceInfo);
                res.render('index', { title: 'Siren of Shame Web Listener', device: sosDevice, deviceInfo: deviceInfo });
            }
        });
    });
});

router.post('/turnon', function (req, res) {
    console.log('Turn on the siren!');
    res.render('index', { title: 'Siren of Shame Web Listener' });
});

module.exports = router;
