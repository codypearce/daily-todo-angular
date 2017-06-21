angular.module('currentDateFilter', []).filter('currentDateFilter', function() {
  return function(todos, scope) {
    if(!todos) {return}
    var filtered = [];
    
    todos.forEach(function(todo) {
      if(!todo.dueDate) {
        return;
      }
      if(scope.selectedAll) {
        return filtered.push(todo);
      }

      var todoDate = new Date(todo.dueDate);
      // If it's a range then check for date in that range;
      if(scope.startDate) {
        if(scope.startDate.setHours(0,0,0, 0)<= todoDate.setHours(0,0,0, 0)&& todoDate.setHours(0,0,0, 0) <= scope.endDate.setHours(0,0,0, 0)) {
          return filtered.push(todo);
        } else {
          return;
        }
      } else if(todoDate.getDate() === scope.date.getDate()){
        return filtered.push(todo);
      } else {
        return;
      }
    })
    return filtered;
  }

})
