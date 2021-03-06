angular.module('backlogFilter', []).filter('backlogFilter', function() {
  return function(todos, scope) {
    if(!todos) {return}
    var filtered = [];
    todos.forEach(function(todo) {
      // If all are selcted none should be in backlog
      if(scope.selectedAll) {
        return;
      }
      // If it doesn't have a due date it should default to backlog
      if(!todo.dueDate) {
        return filtered.push(todo);
      }
    
      var todoDate = new Date(todo.dueDate);
      if(scope.startDate) {
        if(scope.startDate.setHours(0,0,0, 0) > todoDate.setHours(0,0,0, 0) ) {
          return filtered.push(todo);
        } else {
          return;
        }
      } else if(todoDate.getDate() === scope.date.getDate()){
        return;
      } else if(todoDate.getTime() < scope.date.getTime()) {
        return filtered.push(todo);
      }
    })
    return filtered;
  }

})
