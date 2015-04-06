/**
 * Created by Administrator on 4/6/2015.
 */
var mongoose = require('mongoose');
var schema = mongoose.Schema;

userSchema = schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    meta:{
        registerDate: {type: Date, default: Date.now()},
        modifyDate: {type: Date, default: null}
    }
});

module.exports = mongoose.model('user', userSchema);