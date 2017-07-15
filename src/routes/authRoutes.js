var express  = require('express');
var authRouter = express.Router();
var mongodb = require('mongodb').MongoClient;
var passport = require('passport');

var router = function(nav){

    authRouter.route('/signUp').post(function(req,res){

        console.log(req.body);

        //set database url
        var url = "mongodb://localhost:27017/libraryapp";

        //connect with database
        mongodb.connect(url,function(err,db){
                //select users collection
                var collection = db.collection('users');    
                //create user object

                var user = {
                    username : req.body.userName,
                    password : req.body.password
                };

                //insert user object in users collection

                collection.insert(user,function(err,result){

                    console.log(result);
                    db.close();
                });


        });


        // req.login(req.body,function(){
        //     res.redirect('/auth/profile');

        // });


    });


    authRouter.route('/signIn').post(passport.authenticate('local',{failureRedirect:'/'}),function(req,res){

        res.redirect('/auth/profile');

    });

    authRouter.route('/profile').get(function(req,res){

        res.json(req.user);

    });

    return authRouter;
}

module.exports = router;
