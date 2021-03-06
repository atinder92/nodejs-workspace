var passport        = require('passport');
var LocalStrategy   = require('passport-local').Strategy;
var mongodb         = require('mongodb').MongoClient;
var flash           = require('connect-flash');



module.exports = function(){

    passport.use(new LocalStrategy({

        //get the username and password from request

        usernameField : 'username',
        passportField : 'password',
        passReqToCallback : true

    },function(req,username,password,done){

          //set database url
        var url = "mongodb://localhost:27017/libraryapp";

        //connect with database
        mongodb.connect(url,function(err,db){

            var collection = db.collection('users');

            collection.findOne({username:username},function(err,result){
                
                //if result is found, then send error message
                if(result == null){
                    done(null,false,req.flash('message', 'Username does not exist'));
                    return;
                }

                //if the password match, then set user object
                if(result.password === password){
                    var user = result;
                    done(null,user);

                }else{
                    done(null,false,req.flash('message', 'Incorrect Password'));
                }
                


            });


        });


    }));


};