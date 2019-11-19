const {Todo, User} = require('../models')

const getTodos = (id, res) => {
    Todo.find({ 'user': id }, function(err, data) {
        if (err) res.render('todo',{ status: false, message: "DB Error", Todo: null });

        if(data == null) res.render('todo', { status: false, message: "No Todos Found", Todo: data });
        res.render('todo', { status: true, message: "ToDos found", Todo: data })
    })

}

module.exports.getTodoView = (req, res, next) => {
    return getTodos(req.params.user, res)
}

module.exports.getTodos = (req, res, next) => {
    //get data from db then pass it to the todo view
    const userId = req.body.userId;
    console.log(`userId ${JSON.stringify(req.body)}`);
    let resObj = getTodos(userId)

    res.json(resObj)
   
}

module.exports.addTodo = (req, res, next) => {
    //get data from todo view then add it to the bd
    const todo = req.body;

    console.log(todo);

    Todo(todo).save(function(err, data) {
        if (err) throw err;
        res.json({ status: true, data: data });
    });
}

module.exports.deleteTodo = (req, res, next) => {
    //delete todo item from db
    let todo = req.body;
    Todo.find({ item: todo.item.replace(/\-/g, " "), user: todo.user}).remove(function(err, data) {
        if (err) throw err;
        console.log(data);
        res.json(data);
    });
}

