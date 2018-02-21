const mong = require('mongoose');
const Schema = mong.Schema;

//Creating schema
const todoSchema = new Schema({
    item: { type: String, required: true },
    user: { type: String, required: true }
});

const Todo = mong.model('Todo', todoSchema);

module.exports = Todo;