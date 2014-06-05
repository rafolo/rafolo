var mapPointModule = angular.module('app.mappoint', [])
    .config(function ($routeProvider) {
        $routeProvider.when('/mappoint', {
            templateUrl: '/assets/modules/mappoint/mappoint.view.html',
            controller: 'LegendController'
        });
    })
    .controller("LegendController", ['$scope', '$log', 'mappointService', function ($scope, $log, mappointService) {
        angular.extend($scope, mappointService.getData());
    }]);
