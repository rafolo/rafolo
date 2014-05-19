'use strict';

/* Controllers */

angular.module('myApp.controllers4', [])
    .controller("MyCtrl4", [ '$scope', function($scope) {
        $scope.message = "Bye4";
        angular.extend($scope, {
            center: {
                lat: 40.095,
                lng: -3.823,
                zoom: 4
            },
            defaults: {
                scrollWheelZoom: false
            }
        });
    }]);

