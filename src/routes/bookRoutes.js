var express = require('express');
var booksRouter = express.Router();
var mongodb = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectId;


var  router = function(nav){

// SETTING ROUTES FOR THE APPLICATION
    var bookController = require('../controllers/bookController')(null,nav);


    booksRouter.use(function(req,res,next){

        if(!req.user){
            res.redirect('/')
        }
        console.log('testing');
        next();

    });


    booksRouter.route('/').get(bookController.getIndex);
    booksRouter.route('/:id').get(bookController.getById);

    return booksRouter;


}


module.exports = router;

