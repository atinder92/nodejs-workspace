var express = require('express');
var booksRouter = express.Router();
var mongodb = require('mongodb').MongoClient;


var  router = function(nav){

// SETTING ROUTES FOR THE APPLICATION


    booksRouter.route('/').get(function(req,res){

        //connect to database
        var url = "mongodb://localhost:27017/libraryapp";
        mongodb.connect(url,function(err,db){

            var collection = db.collection('books');

            //get all books
            collection.find({}).toArray(function(err,results){


                  res.render('books',{
                      books:results,
                      nav :nav


                   });


            });



        });




      

    });

    booksRouter.route('/:id').get(function(req,res){
        //get id
        var id = req.params.id;

        res.render('bookView',{
            book:books[id-1],
            nav : nav


        })



        
    });

    return booksRouter;


}


module.exports = router;

