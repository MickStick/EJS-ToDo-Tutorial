require("dotenv").config()
var express = require('express'); //require express
var tdc = require('./controllers/todoController'); //requiring the todo controller module
var app = express(); //intitialize express
let port = process.env.PORT //set port number for the server

app.set('view engine', 'ejs'); //settingup template engine

app.use(express.static('./public')); //for using static files over the server

tdc(app); //initialize and start up todo controller

app.listen(port); //start listening on/to the port
console.log("Listening to port: " + port);