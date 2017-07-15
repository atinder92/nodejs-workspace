var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

module.exports = function(){

    passport.use(new LocalStrategy({
        usernameField : 'username',
        passportField : 'password'

    },function(username,password,done){

        var user = {
            username: username,
            password: password
        };
        done(null,user);

    }));


};