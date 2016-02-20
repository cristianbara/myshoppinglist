var model = [
    {
        text: 'Something you still have to buy',
        done: false
    },
    {
        text: 'Something you baught',
        done: true
    },

];
angular.module('myToDoApp', ['contenteditable', 'ngStorage'])
    .controller('myToDoAppController',function ($scope, $filter, $localStorage) {
        // controller code goes here

        if ($localStorage.myToDos) {

            $scope.model = $localStorage.myToDos;

        } else {

            $scope.model = model;
        }
    
        var orderBy = $filter('orderBy');
    
        $scope.orderModel = function() {
            $scope.model = orderBy($scope.model,'done',false);
            // save the new $scope model to local storage
            $localStorage.myToDos = $scope.model;
        }

        $scope.markAsDone = function (item) {
            // change the done flag for the index item
            // $scope.model[index].done = true;
            item.done = true;
            
            $scope.orderModel();

            // save the new $scope model to local storage
            $localStorage.myToDos = $scope.model;

        }

        $scope.removeToDo = function (item) {
            // take out the index item from the $scope model
            for (i = 0; i < $scope.model.length; i++) {
                if ($scope.model[i] == item) {
                    $scope.model.splice(i, 1);
                }
            }


            // save the new $scope model to local storage
            $localStorage.myToDos = $scope.model;

        }
        
        $scope.addToDo = function () {
            // make a new, empty item
            var newItem = {
                    text: '',
                    done: false
                }
            // push the item to the $scope model list
            //$scope.model.push(newItem);
            
            // add new item to the top of the list
            $scope.model.splice(0, 0, newItem);

            // save the new $scope model to local storage
            $localStorage.myToDos = $scope.model;

            //refresh $scope
            //$scope.$apply();
        }
        
        $scope.markUndone = function (item)
        {
            item.done = false;
            
            //order the list
            $scope.orderModel();

            // save the new $scope model to local storage
            $localStorage.myToDos = $scope.model;

        }
        
    });