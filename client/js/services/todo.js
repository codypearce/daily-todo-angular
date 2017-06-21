angular.module('todoService', [])
    .factory('Todos', function($http) {
        return {
            get : function() {
                return $http.get('/api/todos');
            },
            create : function(todoData) {
                return $http.post('/api/todos', todoData);
            },
            finish: function(id) {
              return $http.put('/api/todos/done/' + id);
            },
            undo: function(id) {
              return $http.put('/api/todos/undo/' + id);
            },
            delete : function(id) {
                return $http.delete('/api/todos/' + id);
            }
        }
});
