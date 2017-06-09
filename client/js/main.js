var app = angular.module('dailyTodo', ['720kb.datepicker']);

app.controller( 'mainController', function($scope, $http) {
    $scope.date = new Date();
    $scope.startDate =  null;
    $scope.endDate = null;
    $http.get('/api/todos')
      .then(function(data, err) {
        if(err)
          console.log(err)
        $scope.todos = data.data;
      })

    $scope.changeDate = function(e, mod) {
      // Reset Start and EndDate
      $scope.startDate = null;
      $scope.endDate = null;

      // Remove active class on all nav btns, add to the one clicked
      let sideNavBtns = document.querySelectorAll('.sidenav_btn');
      sideNavBtns.forEach(function(btn) {
        btn.classList.remove('active');
      })
      e.target.classList.add('active');

      // Update the new date
      let newDate;
      switch (mod) {
        case 'today':
          newDate = new Date();
          $scope.date.setDate(newDate.getDate());
          break;
        case 'yesterday':
          newDate = new Date();
          $scope.date.setDate(newDate.getDate() + 1);
          break;
        case 'week':
          var current = new Date();     // get current date
          var weekstart = current.getDate() - current.getDay();
          var weekend = weekstart + 6;       // end day is the first day + 6
          var sunday = new Date(current.setDate(weekstart));
          var saturday = new Date(current.setDate(weekend));
          $scope.startDate = sunday;
          $scope.endDate = saturday;
          break;
        default:
          return
      }

    }
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

    $scope.currentDateFilter = function(todo) {
      if(!todo.dueDate) {
        return;
      }
      var todoDate = new Date(todo.dueDate);
      if(todoDate.getDate() === $scope.date.getDate()) {
        return todo;
      } else {
        return;
      }
    }
    $scope.backlogFilter = function(todo) {
      if(!todo.dueDate) {
        return todo;
      }
      var todoDate = new Date(todo.dueDate);
      if(todoDate.getDate() < $scope.date.getDate()) {
        return todo;
      } else {
        return;
      }
    }
})
