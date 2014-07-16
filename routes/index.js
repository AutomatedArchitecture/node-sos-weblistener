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
    sos.connect(function(err, sosDevice) {
        if (err) {
            res.render('index', { title: 'Siren of Shame Web Listener', err: err });
        }
        sosDevice.readAllInfo(function(err2, deviceInfo) {
            if (err2) {
                res.render('index', { title: 'Siren of Shame Web Listener', err: err2 });
            } else {
                var controlPacket = {
                    audioMode: deviceInfo.audioPatterns[0].id,
                    audioPlayDuration: 500,
                    ledMode: deviceInfo.ledPatterns[0].id,
                    ledPlayDuration: 500
                };
                console.log(controlPacket);
                sosDevice.sendControlPacket(controlPacket, function(err3) {
                    if (err3) {
                        res.render('index', { title: 'Siren of Shame Web Listener', err: err3 });
                    } else {
                        res.render('index', { title: 'Siren of Shame Web Listener', device: sosDevice, deviceInfo: deviceInfo });
                    }
                });
            }
        });
    });
});

module.exports = router;
