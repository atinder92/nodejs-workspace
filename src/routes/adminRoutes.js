var express  = require('express');
var adminRouter = express.Router();
var mongodb = require('mongodb').MongoClient;



var books = [{
    title : "Book 1",
    author:"Author 1"
},
{
    title : "Book 2",
    author:"Author 2"
},
{
    title : "Book 3",
    author:"Author 3"
},
{
    title : "Book 4",
    author:"Author 4"
},
{
    title : "Book 5",
    author:"Author 5"
}

];

var router = function(nav){


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



    return adminRouter;
};


module.exports = router;

