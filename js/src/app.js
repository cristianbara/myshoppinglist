/* 
 * (c) 2016 Cristian-Dan Bara, http://cristianbara.github.io/
 * License: CC BY-NC-ND 3.0, http://creativecommons.org/licenses/by-nc-nd/3.0/
 */


/*
 * The starter model for the application. 
 * It contains a set of list items, se second one is marked as done
 * @property {object} model[@index {number}] 
 * @property {string} model[@index {number}].text - the text information of each list item
 * @property {boolean} model[@index {number}].done - marks wwther the item is done (true), or not (false)
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

/*
 * Function which opens a url.
 * @param {string} url - the URL string
 * @return {undefined}
 */
var openURL = function (url) {
    if (device.platform === 'Android') {
        navigator.app.loadUrl(url, {
            openExternal: true
        });
    } else {
        window.open(url, '_system');
    }
};

/*
 * @module myToDoApp 
 */
angular.module('myToDoApp', ['contenteditable', 'ngStorage', 'ngAnimate'])
    .controller('myToDoAppController', function ($scope, $filter, $localStorage, $timeout) {
        /*
         * Loads data model from local storage is it exisits. 
         */

        if ($localStorage.myToDos) {

            $scope.model = $localStorage.myToDos;

        } else {

            $scope.model = model;
        };


        /*
         * orderBy is a function reference to the $filter service. 
         */
        var orderBy = $filter('orderBy');


        /*
         * @param {boolean} $scope.showMenu - flag which trigger the display/hiding of the left hand side menu
         */
        $scope.showMenu = false;



        /*
         * Function which orders a data @model according to the @done parameter and then save the result in the local storage.
         * @return {undefined}
         */
        $scope.orderModel = function () {
            $scope.model = orderBy($scope.model, 'done', false);
            // save the new $scope model to local storage
            $localStorage.myToDos = $scope.model;
        };



        /*
         * Item functions
         */

        /*
         * Function which marks an item as done.
         * @param {object} item - a @model item
         * @return {undefined}
         */
        $scope.markAsDone = function (item) {
            // change the done flag for the index item            
            item.done = true;
            // wait for 500ms, then order the model - move the done item in the lower part of the model
            $timeout(function () {
                $scope.orderModel();
            }, 500);

        };



        /*
         * Function which removes an item from the @model.
         * @param {object} item - a @model item
         * @return {undefined}
         */
        $scope.removeToDo = function (item) {
            // take out the index item from the $scope model
            for (i = 0; i < $scope.model.length; i++) {
                if ($scope.model[i] == item) {
                    $scope.model.splice(i, 1);
                }
            };

            // save the new $scope model to local storage
            $localStorage.myToDos = $scope.model;

        };


        /*
         * Function which adds a default item to the @model.
         * @return {undefined}
         */
        $scope.addToDo = function () {
            // make a new, empty item
            var newItem = {
                text: '',
                done: false
            };

            // add new item to the top of the list
            $scope.model.splice(0, 0, newItem);

            // save the new $scope model to local storage
            $localStorage.myToDos = $scope.model;

            // hide menu
            $scope.showMenu = false;

            //refresh $scope
            //$scope.$apply();
        };



        /*
         * Function which marks an item as not done.
         * @param {object} item - a @model item
         * @return {undefined}
         */
        $scope.markUndone = function (item) {
            item.done = false;

            //order the list
            $scope.orderModel();

            // save the new $scope model to local storage
            $localStorage.myToDos = $scope.model;

        };




        /*
         *Left hand side menu functions
         */


        /*
         * Function which toggles the left hand side menu.
         * @return {undefined}
         */
        $scope.toggleMenu = function () {
            $scope.showMenu = !$scope.showMenu;
        };



        /*
         * Function which resets the @model, turning all items to done = false.
         * @return {undefined}
         */
        $scope.resetList = function () {
            // reset all the existing items in the model
            for (i = 0; i < $scope.model.length; i++) {
                $scope.model[i].done = false;
            }
            // save change in local storage
            $localStorage.myToDos = $scope.model;

            //toggle the menu
            $scope.toggleMenu();

        };



        /*
         * Function which deletes all items in the @model
         * @return {undefined}
         */
        $scope.deleteList = function () {
            // delete the entire list
            $scope.model = [];

            // save change in local storage
            $localStorage.myToDos = $scope.model;

            //toggle the menu
            $scope.toggleMenu();
        };

    });