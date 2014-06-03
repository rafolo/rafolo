'use strict';

/* Controllers */

angular.module('myApp.controllers6', []).
    controller('MyCtrl6', ['$scope', function ($scope) {
        $scope.products = [
            {  // populate the "products" array
                name: "product1",
                brand: "brand1"
            },
            {
                name: "product2",
                brand: "brand2"
            }
        ];

        //$scope.products = $resource("/app/Data/Products.json");

    }]);

