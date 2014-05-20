'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
    controller('MyCtrl1', ["$scope", function ($scope) {
    $scope.message = "halo43";
    }]).
    controller('MyCtrl2', [function () {

    }]).
    controller('MyCtrl3', [function ($scope) {
    }]);