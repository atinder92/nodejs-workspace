var express  = require('express');
var authRouter = express.Router();
var mongodb = require('mongodb').MongoClient;
var passport = require('passport');

var router = function(nav){

    //Signing Up new user
    //Insert user object into users collection

    authRouter.route('/signUp').post(function(req,res){

        console.log(req.body);

        //set database url
        var url = "mongodb://localhost:27017/libraryapp";

        //connect with database
        mongodb.connect(url,function(err,db){
                //select users collection
                //If no users collection exists, then it will create one
                var collection = db.collection('users');    
                
                //create user object

                var user = {
                    username : req.body.username,
                    password : req.body.password
                };

                //insert user object in users collection

                collection.insert(user,function(err,result){
                    db.close();
                });


        });


    


    });


    // when sign in , authenticate user with local strategy
    authRouter.route('/signIn').post(passport.authenticate('local',{failureRedirect:'/'}),function(req,res){

        res.redirect('/auth/profile');

    });

    authRouter.route('/profile').all(function(req,res,next){
         
        if(!req.user){
                res.redirect('/');
          }
          next();  


    }).get(function(req,res){

    


        res.json(req.user);

    });

    return authRouter;
}

module.exports = router;
