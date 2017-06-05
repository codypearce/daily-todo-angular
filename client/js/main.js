var app = angular.module('dailyTodo', ['720kb.datepicker']);

app.controller( 'mainController', function($scope, $http) {
    $scope.date = new Date();
    $http.get('/api/todos')
      .then(function(data, err) {
        if(err)
          console.log(err)
        $scope.todos = data.data;
      })

    $scope.createTodo = function(todo) {
      if(todo.todo.length < 1) {
        return;
      }
      $http.post('/api/todos', todo)
        .then(function(data, err) {
          if(err)
            console.log(err)
          $scope.todo.todo = '';
          $scope.todo.dueDate = '';
          $scope.todos = data.data;
      })
    };

    $scope.finishTodo = function(id) {
      $http.put('/api/todos/done/' + id)
        .then(function(data, err) {
          if(err)
            console.log(err)
          $scope.todos = data.data;
        })
    }
    $scope.undoTodo = function(id) {
      $http.put('/api/todos/undo/' + id)
        .then(function(data, err) {
          if(err)
            console.log(err)
          $scope.todos = data.data;
        })
    }

    $scope.deleteTodo = function(id) {
        $http.delete('/api/todos/' + id)
          .then(function(data, err) {
            if(err)
              console.log(err)
            $scope.todos = data.data;
          })
    };

})
