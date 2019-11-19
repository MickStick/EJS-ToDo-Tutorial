require('dotenv').config()
var express = require('express'); //require express
var app = express(); //intitialize express
var bp = require('body-parser');
const port = process.env.PORT; //set port number for the server
var mong = require('mongoose'); //.MongoClient, assert = require('assert');
var url = process.env.MONGODB_URI;
const router = require('./router');
const path = require('path')

mong.Promise = global.Promise;

//Connect to mongo database

mong.connect(url, 
    { 
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, 
    function() {
    console.log("Connected to database: " + url + "...");
});

app.set('view engine', 'ejs'); //settingup template engine

app.use(bp.json()); //initialize body-parser
app.use(express.static(path.join(__dirname, '/public'))); //for using static files over the server

router(app); //initialize and start up todo controller

app.listen(port); //start listening on/to the port
console.log("Listening to port: " + port);

module.exports = app;