var model = [
    {
        text:'Something you baught',
        done: true        
    },
     {
        text:'Something you still have to buy',
        done: false
    },
    
];
angular.module('myToDoApp', ['contenteditable', 'ngStorage'])
    .controller('myToDoAppController', function($scope, $localStorage) {
    // controller code goes here
    
    if($localStorage.myToDos) {
        
        $scope.model = $localStorage.myToDos;
    
    } else {
        
        $scope.model = model;
    }    
    
    $scope.markAsDone = function(index) {
        // change the done flag for the index item
        $scope.model[index].done = true;
        
        // save the new $scope model to local storage
        $localStorage.myToDos = $scope.model;
       
    }
    
    $scope.removeToDo = function(index) {
        // take out the index item from the $scope model
        $scope.model.splice(index, 1);
        
        // save the new $scope model to local storage
        $localStorage.myToDos = $scope.model;
        
    }
    $scope.addToDo = function() {
        // make a new, empty item
        var newItem = {
            text: '',
            done: false
        }
        // push the item to the $scope model list
        $scope.model.push(newItem);
        
        // save the new $scope model to local storage
        $localStorage.myToDos = $scope.model;
                
    }
});