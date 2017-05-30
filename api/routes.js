var Todo = require('./models/Todo');

app.get('/api/todos', function(req, res) {
  Todo.find(function(err, todos) {
    if (err)
      res.send(err)
    res.json(todos);
  });
 });

 app.post('/api/todos', function(req, res) {
   Todo.create({
     todo: req.body.todo,
     dueDate: req.body.dueDate,
     done: false,
   }, function(err, todo) {
      if(err)
        res.send(err)
      Todo.find(function(err, todos) {
        if(err)
          res.send(err)
        res.json(todos);
      })
   })
 })

 app.delete('/api/todos/:todoId', function(req, res) {
   Todo.remove({
     _id: req.paras.todoId
   }, function(err, todo) {
      if(err)
        res.send(err);
      Todo.find(function(err, todos) {
        if(err)
          res.send(err)
        res.json(todos);
      })
   })
 })
