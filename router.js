const bp = require('body-parser');
const urlcp = bp.urlencoded({ extended: false });
const {Todo, User} = require('./controllers')
module.exports = (app) => {
    app.get('/', User.index);

    app.get('/todo/get', urlcp, Todo.getTodos);

    app.get('/todo/:user', urlcp, Todo.getTodoView);

    app.post('/todo', urlcp, Todo.addTodo);

    app.delete('/todo/', Todo.deleteTodo);

    app.post('/user/login', urlcp, User.loginUser);

    app.post('/user/register', urlcp, User.registerUser);

}