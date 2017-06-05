var Todo = require('./models/Todo');


module.exports = function(app) {
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
   app.put('/api/todos/done/:todoId', function(req, res) {
     Todo.update({ _id: req.params.todoId }, { $set: { done: true }}, function(err, todo) {
       if(err)
        res.send(err);
      Todo.find(function(err, todos) {
        if(err)
          res.send(err);
        res.json(todos);
      })
     });
   })

   app.delete('/api/todos/:todoId', function(req, res) {
     Todo.remove({
       _id: req.params.todoId
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

   app.get('*', function(req, res) {
     res.sendFile(__dirname + './client/index.html'); // load the single view file (angular will handle the page changes on the front-end)
  });
}
