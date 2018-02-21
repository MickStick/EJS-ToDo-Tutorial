var express = require('express'); //require express
var app = express(); //intitialize express
const port = 8888; //set port number for the server
var mong = require('mongoose'); //.MongoClient, assert = require('assert');
var url = 'mongodb://localhost:27017/app';
var shell = require('shelljs');
const router = require('./router');

/*var data = [
    {item: 'Learn Server side coding'},
    {item: 'Learn ReactJS Front-End'},
    {item: 'Develop Test Application'},`
    {item: 'Get Food'}
];*/

mong.Promise = global.Promise;

//Connect to mongo database

mong.connect(url, function() {
    console.log("Connected to database: " + url + "...");
});

app.set('view engine', 'ejs'); //settingup template engine

app.use(express.static('./public')); //for using static files over the server

router(app); //initialize and start up todo controller

app.listen(port); //start listening on/to the port
console.log("Listening to port: " + port);