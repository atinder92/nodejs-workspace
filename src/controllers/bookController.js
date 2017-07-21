var mongodb = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectId;
var mongoose = require('mongoose');
var BookData = require('../models/books.server.model');


var bookController = function(service,nav){

    
    var getIndex = function(req,res){

        // //connect to database
        // var url = "mongodb://localhost:27017/libraryapp";
        // mongodb.connect(url,function(err,db){

        //     var collection = db.collection('books');

        //     //get all books
        //     collection.find({}).toArray(function(err,results){


        //           res.render('books',{
        //               books:results,
        //               nav :nav


        //            });


        //     });



        // });

        //Using Mongoose API to get all documents
        mongoose.connect('mongodb://localhost:27017/libraryapp');

        BookData.find(function(err,results){

            res.render('books',{
                books:results,
                nav:nav
            });


        });



    }

    var getById = function(req,res){

        //get id
        var id = new objectId(req.params.id);

        // //connect to database
        // var url = "mongodb://localhost:27017/libraryapp";
        // mongodb.connect(url,function(err,db){

        //     var collection = db.collection('books');
        //     collection.findOne({_id:id},function(err,result){

        //     res.render('bookView',{
        //         book:result,
        //         nav : nav


        //      });

        //      db.close();

        //     });

        // });



        //Using mongoose to get book by ID
        mongoose.connect('mongodb://localhost:27017/libraryapp');

        BookData.findById(id,function(err,result){

            res.render('bookView',{
                book:result,
                nav:nav
            });


        });



    }


    var removeBookById = function(req,res){

        //get id
        var id = new objectId(req.params.id);
        //Connect to mongoose 
        mongoose.connect('mongodb://localhost:27017/libraryapp');

        var query = BookData.findByIdAndRemove(id,function(err){

            if(!err){
                res.redirect('/books');
            }

        });



    }

    return {
        getIndex : getIndex,
        getById  : getById,
        removeBookById : removeBookById
    }


}

module.exports = bookController;