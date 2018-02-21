const bp = require('body-parser');
const urlcp = bp.urlencoded({ extended: false });
const Todo = require('./controllers/todo.controller');
const User = require('./controllers/user.controller');
module.exports = (app) => {
    app.get('/', User.index);

    app.get('/todo', Todo.getTodos);

    app.post('/todo', urlcp, Todo.addTodo);

    app.delete('/todo/:item', Todo.deleteTodo);

}