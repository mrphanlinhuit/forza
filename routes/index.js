var express = require('express');
var router = express.Router();
var app = require('../app');
var userModel = require('../models/user');
var config = require('../configs/config');
var jwt = require('jwt-simple');
var moment = require('moment');
var expires = moment().add(7, 'days').valueOf();



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/api/auth/login', function (req, res, next) {
    var username = req.body.username;
    var password = req.body.password;

    process.nextTick(function () {
        userModel.findOne({username: username, password: password}, function (err, user) {
            if (err) return next(err);

            if (!user) {
                console.log('user not found!');
            } else {
                var token = jwt.encode({
                    iss: user._id,
                    exp: expires
                }, config.jwtTokenSecret);
                console.log('user : ', user);

                res.json({
                    token: token,
                    expires: expires,
                    user: user.toJSON()
                });
            }
        });
    });
    console.log('userName: ', username);
    console.log('password: ', password);
});

router.post('/api/auth/logout', function (req, res, next) {

});



//var newUser = new userModel();
//newUser.username = 'admin@example.com';
//newUser.password = 'password';
//newUser.save(function (err, user) {
//    if(err){
//        console.error('err: ', err);
//    }
//    else{
//        console.log('saved successfully: ', user);
//    }
//
//});

module.exports = router;
