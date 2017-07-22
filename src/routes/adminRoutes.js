var express  = require('express');
var adminRouter = express.Router();
var mongodb = require('mongodb').MongoClient;
var mongoose = require('mongoose');
var bookModel = require('../models/books.server.model');



var router = function(nav){


    adminRouter.use(function(req,res,next){

        if(!req.user){
            res.redirect('/')
        }
        next();

    });
    adminRouter.route('/addBooks').get(function(req,res){

        //set database url
        var url = "mongodb://localhost:27017/libraryapp";

        //connect with database
        mongodb.connect(url,function(err,db){
            //create books collection
            var collection = db.collection('books');
            //insert books into collection
            collection.insertMany(books,function(err,results){
                res.send(results);
                db.close();


            });



        });



    });

    adminRouter.route('/addBooksForm').get(function(req,res){

        
        res.render('bookForm',{error:req.session.error,savedSuccess:req.session.savedSuccess,nav:nav},function(err,html){
                    
            //clears error session
            delete req.session.error;
            delete req.session.savedSuccess;
            res.send(html);

        });

    });

    //adding new item
    adminRouter.route('/addBooksForm/newitem').post(function(req,res){

    
    //get form fields and trim white spaces

    var bookName = req.body.bookName.trim();
    var bookAuthor = req.body.bookAuthor.trim();
    var bookDescription = req.body.bookDescription.trim();

    //validate form fields
    var formValid = false;

    if(!(bookName == "" || bookAuthor == "" || bookDescription == "")){
        formValid = true;    
    }

    //save information, if form is valid
    if(formValid){

            //connect to mongodb via mongoose    
            mongoose.connect('mongodb://localhost:27017/libraryapp');


            var bookData = new bookModel({
                bookName: req.body.bookName,
                bookAuthor: req.body.bookAuthor,
                bookDescription : req.body.bookDescription




            });
            bookData.save(function(err){
                if(err){
                    res.send('error in saving information');
                    return;
                }
            req.session.savedSuccess = "Book Information Saved";
            res.redirect('/admin/addBooksForm');

            });
        }
        else{
            //redirect to Book Form with error object
            req.session.error = "Please fill in the form";
            res.redirect('/admin/addBooksForm');


        }


    });




    return adminRouter;
};


module.exports = router;

