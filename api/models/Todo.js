var mongoose = require('mongoose');

var Todo = mongoose.model('Todo', {
  todo : String,
  dueDate: Date,
  done: Boolean
});

module.exports = Todo;
