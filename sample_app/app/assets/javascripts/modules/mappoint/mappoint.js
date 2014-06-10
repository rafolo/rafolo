var mapPointModule = angular.module('app.mappoint', [])
    .config(function ($routeProvider) {
        $routeProvider.when('/mappoint', {
            templateUrl: '/assets/modules/mappoint/mappoint.view.html',
            controller: 'LegendController'
        });


    })

    .controller("LegendController", ['$scope', 'mappointService', function ($scope, mappointService) {
        angular.extend($scope, mappointService.getData(59.92));
        //$scope.$apply();
    }]);
