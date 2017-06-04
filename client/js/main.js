var app = angular.module('dailyTodo', []);

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
          $scope.todos = data.data;
      })
    };

    $scope.deleteTodo = function(id) {
        $http.delete('/api/todos/' + id)
          .then(function(data, err) {
            if(err)
              console.log(err)
            $scope.todos = data.data;
          })
    };

})
