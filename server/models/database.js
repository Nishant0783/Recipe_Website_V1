// In this file we are establishing connection with mongoDb with the help of mongoose.

require('dotenv').config();
const mongoose = require('mongoose');
const { Schema } = mongoose;
// console.log(process.env.MONGODB_URI);

// mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }).then(()=>{
//     console.log("Connection Succesfull");
// }).catch((err)=> {
//     console.log(err);
// });
mongoose.connect(`mongodb://127.0.0.1:27017/Recipe`, { useNewUrlParser: true, useUnifiedTopology: true }).then(()=>{
    console.log("Connection Succesfull");
}).catch((err)=> {
    console.log(err);
});


// As we know we have two collections in this database
// 1) Category--> For storing the data for categories
// 2) Recipe--> For storing teh information about the each recipe.
// So, here we are telling mongoose to use the file Category.js and Recipe.js which are inside the same folder.
require('./Category');
require('./Recipe');



/****** In this file I have tried to use dotenv module to store all the configurational details but I am failing to establish connection with mongoDB with the use of dotenv file therefore, I have hard coded the connection string inside connect method.*/
