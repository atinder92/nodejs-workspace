var express     = require('express');
var adminRouter = express.Router();
var mongodb     = require('mongodb').MongoClient;
var mongoose    = require('mongoose');
var formidable  = require('formidable');
var bookModel   = require('../models/books.server.model');
var fs          = require('fs');


var router = function(nav){


    adminRouter.use(function(req,res,next){

        if(!req.user){
            res.redirect('/')
        }
        next();

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

    


            var form = new formidable.IncomingForm();
            //set temp upload directory
            form.uploadDir = "/Users/atindersingh/Desktop/github apps/nodejs-workspace/uploads";
            //process the form
            form.parse(req, function(err, fields, files) {
            
                //get form fields and trim white spaces
                var bookName = fields.bookName.trim();
                var bookAuthor = fields.bookAuthor.trim();
                var bookDescription = fields.bookDescription.trim();

                //validate form fields
                    var formValid = false;

                    if(!(bookName == "" || bookAuthor == "" || bookDescription == "")){
                        formValid = true;    
                    }
                    //save the book, if form is valid
                    if(formValid){

                        var oldpath = files.bookImage.path;
                        var newpath = "/Users/atindersingh/Desktop/github apps/nodejs-workspace/uploads/"+files.bookImage.name;

                        fs.rename(oldpath, newpath, function (err) {
                                if (err) throw err;

                                //connect to mongodb via mongoose    
                                mongoose.connect('mongodb://localhost:27017/libraryapp');



                                    //create bookData object
                                    var bookData = new bookModel({
                                        bookName: req.body.bookName,
                                        bookAuthor: req.body.bookAuthor,
                                        bookDescription : req.body.bookDescription




                                    });
                                    //save bookData object
                                    bookData.save(function(err){
                                        if(err){
                                            res.send('error in saving information');
                                            return;
                                        }
                                        req.session.savedSuccess = "Book Information Saved";
                                        res.redirect('/admin/addBooksForm');

                                        });
        


                            });

                    }else{
                        //redirect to Book Form with error object
                        req.session.error = "Please fill in the form";
                        res.redirect('/admin/addBooksForm');
                    }


            });
    
    // }

     


    });




    return adminRouter;
};


module.exports = router;

