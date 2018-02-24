const Todo = require('../models/todo.model');
const User = require('../models/user.model');

module.exports.getTodoView = (req, res, next) => {
    res.render('todo');
}

module.exports.getTodos = (req, res, next) => {
    //get data from db then pass it to the todo view
    const userId = req.body; //.userId;
    console.log(`userId ${JSON.stringify(req.body)}`);
    Todo.find({ 'user': userId }, function(err, data) {
        if (err) throw err;

        res.json({ status: true, message: "ToDos found", Todo: data });
    });
}

module.exports.addTodo = (req, res, next) => {
    //get data from todo view then add it to the bd
    const todo = req.body;

    console.log(todo);

    const newTodo = Todo(todo).save(function(err, data) {
        if (err) throw err;
        res.json({ status: true, data: data });
    });
}

module.exports.deleteTodo = (req, res, next) => {
    //delete todo item from db
    Todo.find({ item: req.params.item.replace(/\-/g, " ") }).remove(function(err, data) {
        if (err) throw err;
        console.log(data);
        res.json(data);
    });
}