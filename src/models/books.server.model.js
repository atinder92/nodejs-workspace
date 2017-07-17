var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

//Different ways of creating schemas

/** 1 */
//Mongoose will automatically adds `id` field for the schema
var bookSchema = new Schema({

    bookName        : String,
    bookAuthor      : String,
    bookDescription : String,
    createdDate     : {type:Date,default:Date.now}


});

/* 2 
Creating schema without `id` field
*/

// var exampleSchema = new Schema({name:String},{_id:false});

/* 3
*/
// var bookSchema = new Schema;

// bookSchema.add({

//     bookName        : String,
//     bookAuthor      : String,
//     bookDescription : String,
//     createdDate     : {type:Date,default:Date.now}

// });