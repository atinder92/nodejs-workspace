var express = require('express');
var booksRouter = express.Router();
var mongodb = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectId;

var  router = function(nav){

// SETTING ROUTES FOR THE APPLICATION


    booksRouter.use(function(req,res,next){

        if(!req.user){
            res.redirect('/')
        }
        next();

    });


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
        var id = new objectId(req.params.id);

        //connect to database
        var url = "mongodb://localhost:27017/libraryapp";
        mongodb.connect(url,function(err,db){

            var collection = db.collection('books');
            collection.findOne({_id:id},function(err,result){

            res.render('bookView',{
                book:result,
                nav : nav


             });

             db.close();

            });

        });
        



      



        
    });

    return booksRouter;


}


module.exports = router;

