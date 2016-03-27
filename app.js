/* 
 * (c) 2016 Cristian-Dan Bara, http://cristianbara.github.io/
 * License: CC BY-NC-ND 3.0, http://creativecommons.org/licenses/by-nc-nd/3.0/
*/
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

var openURL = function (url) {
    if (device.platform === 'Android') {
        navigator.app.loadUrl(url, {
            openExternal: true
        });
    } else {
        window.open(url, '_system');
    }
};

angular.module('myToDoApp', ['contenteditable', 'ngStorage', 'ngAnimate'])
    .controller('myToDoAppController', function ($scope, $filter, $localStorage, $timeout) {
        // controller code goes here

        if ($localStorage.myToDos) {

            $scope.model = $localStorage.myToDos;

        } else {

            $scope.model = model;
        }

        var orderBy = $filter('orderBy');
        $scope.showMenu = false;

        $scope.orderModel = function () {
            $scope.model = orderBy($scope.model, 'done', false);
            // save the new $scope model to local storage
            $localStorage.myToDos = $scope.model;
        }

        $scope.markAsDone = function (item) {
            // change the done flag for the index item            
            item.done = true;

            /* var tempItem = item;
             
             // remove item from the list
             // take out the index item from the $scope model
             for (i = 0; i < $scope.model.length; i++) {
                 if ($scope.model[i] == item) {
                     $scope.model.splice(i, 1);
                 }
             }
             
             // add tempItem to the bottom of the list      
             
             $timeout(function () {
                 $scope.model.splice($scope.model.length, 0, tempItem);
             }, 300);
             
             // save the new $scope model to local storage
             $localStorage.myToDos = $scope.model;
             */
            $timeout(function () {
                $scope.orderModel();
            }, 500);

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
            
            // hide menu
            $scope.showMenu = false;

            //refresh $scope
            //$scope.$apply();
        }

        $scope.markUndone = function (item) {
            item.done = false;

            //order the list
            $scope.orderModel();

            // save the new $scope model to local storage
            $localStorage.myToDos = $scope.model;

        }

        $scope.toggleMenu = function () {
            $scope.showMenu = !$scope.showMenu;
        }

        $scope.resetList = function () {
            // reset all the existing items in the model
            for (i = 0; i < $scope.model.length; i++) {
                $scope.model[i].done = false;
            }
            // save change in local storage
            $localStorage.myToDos = $scope.model;
            
            //toggle the menu
            $scope.toggleMenu();

        }

        $scope.deleteList = function () {
            // delete the entire list
            $scope.model = [];
            
            // save change in local storage
            $localStorage.myToDos = $scope.model;
            
            //toggle the menu
            $scope.toggleMenu();
        }

    });