var mongodb = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectId;


var bookController = function(service,nav){

    
    var getIndex = function(req,res){

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


    }

    var getById = function(req,res){

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


    }

    return {
        getIndex : getIndex,
        getById  : getById
    }


}

module.exports = bookController;