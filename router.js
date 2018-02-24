const bp = require('body-parser');
const urlcp = bp.urlencoded({ extended: false });
const Todo = require('./controllers/todo.controller');
const User = require('./controllers/user.controller');
module.exports = (app) => {
    app.get('/', User.index);

    app.get('/todo', urlcp, Todo.getTodoView);

    app.get('/todo/get', urlcp, Todo.getTodos);

    app.post('/todo', urlcp, Todo.addTodo);

    app.delete('/todo/:item', Todo.deleteTodo);

    app.post('/user/login', urlcp, User.loginUser);

    app.post('/user/register', urlcp, User.registerUser);

}