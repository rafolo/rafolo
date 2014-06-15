var mapPointPointsModule = angular.module('app.mappoint.points', [])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/mappoint', {
            templateUrl: '/assets/modules/mappoint/mappoints/mappoints.view.html',
            controller: 'MapPointsController'
        });
    }])
    .controller("MapPointsController", ['$scope', '$log', '$interval','mappointService', function ($scope, $log, $interval, mappointService) {
        var centerX=59.92;
        var centerY = 10.75;
        var radius = 0.01;
        angular.extend($scope, mappointService.getData(centerX, centerY));

        var steps = 10, i=0;
        function handler()
        {
            $log.info('Running handler');
            var xValue = (centerX + radius * Math.cos(2 * Math.PI * i / steps));
            var yValue = (centerY + radius * Math.sin(2 * Math.PI * i / steps));
            angular.extend($scope, mappointService.getData(xValue, yValue));
            i+=1;
        }

        $interval(handler, 1000 );
    }]);
