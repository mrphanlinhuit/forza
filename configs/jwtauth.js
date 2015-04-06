/**
 * Created by Administrator on 4/6/2015.
 */
var userModel = require('../models/user');
var config = require('../configs/config');
var jwt = require('jwt-simple');

module.exports = function (req, res, next) {
    var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers('x-access-token');

    //==try to decode the JWT
    if(token){
        try{
            var decoded = jwt.decode(token, config.jwtTokenSecret);
            if(decoded< Date.now()){
                res.end('Access token has expired', 400);

            }else{
                next();
            }
        }catch(err){
            console.error('decode failed : ', err);
            return next();
        }
    }else{
        next();
    }
};