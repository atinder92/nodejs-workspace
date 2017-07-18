var express  = require('express');
var adminRouter = express.Router();
var mongodb = require('mongodb').MongoClient;
var mongoose = require('mongoose');
var bookModel = require('../models/books.server.model');

var books = [{
    title : "HTML and CSS: Design and Build Websites",
    description:"Every day, more and more people want to learn some HTML and CSS. Joining the professional web designers and programmers are new audiences who need to know a little bit of code at work (update a content management system or e-commerce store) and those who want to make their personal blogs more attractive. Many books teaching HTML and CSS are dry and only written for those who want to become programmers, which is why this book takes an entirely new approach."
},
{
    title : "JavaScript and jQuery: Interactive Front-End Web Development",
    description:"This full-color book adopts a visual approach to teaching JavaScript & jQuery, showing you how to make web pages more interactive and interfaces more intuitive through the use of inspiring code examples, infographics, and photography. The content assumes no previous programming experience, other than knowing how to create a basic web page in HTML & CSS. You'll learn how to achieve techniques seen on many popular websites (such as adding animation, tabbed panels, content sliders, form validation, interactive galleries, and sorting data)..Introduces core programming concepts in JavaScript and jQueryUses clear descriptions, inspiring examples, and easy-to-follow diagramsTeaches you how to create scripts from scratch, and understand the thousands of JavaScripts, JavaScript APIs, and jQuery plugins that are available on the webDemonstrates the latest practices in progressive enhancement, cross-browser compatibility, and when you may be better off using CSS3"

},
{
    title : "Angular 2 Development with TypeScript",
    description:"Angular 2 Development with Typescript teaches you what you need to start using Angular, while you also learn TypeScript and how to take advantage of its benefits. This hands-on book begins with an overview of Angular 2 architecture and an introduction to the online auction application that you’ll be developing throughout the book. You’ll learn TypeScript and how to write classes, interfaces, and generics, as well as how to transpile TypeScript code into today’s JavaScript that can be deployed in all Web browsers. More topics include data and views, user interaction with forms, and communicating with servers. Finally, you’ll learn how to test and deploy your Angular 2 applications. "

},
{
    title : "JavaScript: The Good Parts",  
    description:"Most programming languages contain good and bad parts, but JavaScript has more than its share of the bad, having been developed and released in a hurry before it could be refined. This authoritative book scrapes away these bad features to reveal a subset of JavaScript that's more reliable, readable, and maintainable than the language as a whole-a subset you can use to create truly extensible and efficient code. "

},
{
    title : "JavaScript Patterns",  
    description:"What's the best approach for developing an application with JavaScript? This book helps you answer that question with numerous JavaScript coding patterns and best practices. If you're an experienced developer looking to solve problems related to objects, functions, inheritance, and other language-specific categories, the abstractions and code templates in this guide are ideal -- whether you're writing a client-side, server-side, or desktop application with JavaScript."

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

    adminRouter.route('/addBooksForm').get(function(req,res){


        res.render('bookForm');


    });

    //adding new item
    adminRouter.route('/addBooksForm/newitem').post(function(req,res){

    //connect to mongodb via mongoose    
    mongoose.connect('mongodb://localhost:27017/libraryapp');

    var bookData = new bookModel({
        bookName: req.body.bookName,
        bookAuthor: req.body.bookAuthor,
        bookDescription : req.body.bookDescription




    });


    bookData.save();

    res.send('Ok');


    });




    return adminRouter;
};


module.exports = router;

