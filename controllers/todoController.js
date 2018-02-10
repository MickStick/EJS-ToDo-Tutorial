var bp = require('body-parser');
var urlcp = bp.urlencoded({ extended: false });
var mong = require('mongoose'); //.MongoClient, assert = require('assert');
var url = 'mongodb://localhost:27017/app';
var shell = require('shelljs');

/*var data = [
    {item: 'Learn Server side coding'},
    {item: 'Learn ReactJS Front-End'},
    {item: 'Develop Test Application'},`
    {item: 'Get Food'}
];*/

mong.Promise = global.Promise;

//Connect to mongo database

mong.connect(url, {
    useMongoClient: true,
}, function() {
    console.log("Connected to database: " + url + "...");
});


/*MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  db.close();
}); */

//Creating schema
var todoSchema = new mong.Schema({
    item: String
});

var Todo = mong.model('Todo', todoSchema); //Created db model


module.exports = function(app) {
    //var ipcon = shell.exec('ipconfig /all');
    //console.log(ipcon);

    app.get('/todo', function(req, res) {
        //get data from db then pass it to the todo view
        Todo.find({}, function(err, data) {
            if (err) throw err;
            res.render('todo', { todo: data });
        });

    });

    app.post('/todo', urlcp, function(req, res) {
        //get data from todo view then add it to the bd
        var newTodo = Todo(req.body).save(function(err, data) {
            if (err) throw err;
            res.json(data);
        });
    });

    app.delete('/todo/:item', function(req, res) {
        //delete todo item from db
        Todo.find({ item: req.params.item.replace(/\-/g, " ") }).remove(function(err, data) {
            if (err) throw err;
            res.json(data);
        });
    });
}
