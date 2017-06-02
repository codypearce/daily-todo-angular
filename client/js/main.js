var app = angular.module('dailyTodo', []);

app.controller( 'mainController', function($scope, $http) {

    $http.get('/api/todos')
      .then(function(data, err) {
        if(err)
          console.log(err)
        $scope.todos = data.data;
      })

    $scope.createTodo = function(todo) {
      console.log(todo)
        $http.post('/api/todos', todo)
          .then(function(data, err) {
            if(err)
              console.log(err)
            $scope.todo = '';
            $scope.todos = data;
          })
    };

    $scope.deleteTodo = function(id) {
        $http.delete('/api/todos/' + id)
          .then(function(data, err) {
            if(err)
              console.log(err)
            $scope.todos = data;
          })
    };

})
