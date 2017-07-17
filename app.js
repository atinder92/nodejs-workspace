var express         = require('express');
var bodyParser      = require('body-parser');
var cookieParser    = require('cookie-parser');
var passport        = require('passport');
var session         = require('express-session');
var flash           = require('connect-flash');

//create instance of express app
var app = express();
//configure port 
var port = process.env.PORT || 8080;

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(session({secret:'library'}));
app.use(flash());
require('./src/config/passport')(app);



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
            Link:"/books",
            Text:"Books"
        }];


//Routes
var booksRouter = require('./src/routes/bookRoutes')(nav);
var adminRouter = require('./src/routes/adminRoutes')(nav);
var authRouter  = require('./src/routes/authRoutes')(nav);




//if the request goes to /books, then use booksRouter
app.use('/books',booksRouter);
app.use('/admin',adminRouter);
app.use('/auth',authRouter);

app.get('/',function(req,res){


    validationError = req.flash('message');
    res.render('index',{
        nav:[{
            Link:"/books",
            Text:"Books"
        }],
        validationErrorMsg:validationError

    });

});

app.listen(port,function(err){
    console.log(`Running server on ${port}`);
});