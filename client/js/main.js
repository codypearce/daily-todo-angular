var app = angular.module('dailyTodo', []);

app.controller( 'mainController', function($scope, $http) {
    $scope.formData = {};

    $http.get('/api/todos')
      .then(function(data, err) {
        if(err)
          console.log(err)
        $scope.todos = data;
      })

    $scope.createTodo = function() {
        $http.post('/api/todos', $scope.formData)
          .then(function(data, err) {
            if(err)
              console.log(err)
            $scope.formData = {};
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
