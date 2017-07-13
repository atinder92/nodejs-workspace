var express = require('express');

var app = express();

var port = process.env.PORT || 8080;

app.use(express.static('public'));
// app.use(express.static('src/views'));

//Jade Templating Engine Settings
//Install Jade using - npm install --save jade
app.set('views','./src/views');
// app.set('view engine','jade');


//Handlebar templating Engine Settings
//Install Handlebar for Express using - npm install --save express-handlebars
// var handlebars = require('express-handlebars');
// app.engine('.hbs',handlebars({extname:'.hbs'}));
// app.set('view engine','.hbs')


//EJS templating Engine Settings
//Install EJS using - npm install --save ejs
app.set('view engine','ejs');

var nav = [{
            Link:"/authors",
            Text:"Authors"
        },{
            Link:"/books",
            Text:"Books"
        }];


//Routes
var booksRouter = require('./src/routes/bookRoutes')(nav);

//if the request goes to /books, then use booksRouter
app.use('/books',booksRouter);


app.get('/',function(req,res){

    res.render('index',{
        nav:[{
            Link:"/authors",
            Text:"Authors"
        },{
            Link:"/books",
            Text:"Books"
        }]

    });

});

app.listen(port,function(err){
    console.log(`Running server on ${port}`);
});