var express = require('express');
var booksRouter = express.Router();

// Books Data
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


var  router = function(nav){

// SETTING ROUTES FOR THE APPLICATION


    booksRouter.route('/').get(function(req,res){

        res.render('books',{
            books:books,
            nav :nav


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

