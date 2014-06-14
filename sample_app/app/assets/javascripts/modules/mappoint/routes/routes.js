var mapPointRoutesModule = angular.module('app.mappoint.routes', [])
    .config(function ($routeProvider) {
        $routeProvider.when('/maproute', {
            templateUrl: '/assets/modules/mappoint/routes/routes.view.html',
            controller: 'RoutesController'
        });
    })
    .controller("RoutesController", ['$scope', '$log', '$interval', 'mapPointRoutesService', function ($scope, $log, $interval, mapPointRoutesService) {
        var centerX = 59.92;
        var centerY = 10.75;
        var radius = 0.01;
        //angular.extend($scope, mappointService.getData(centerX, centerY));
        angular.extend($scope,
            {legend: {
                position: 'bottomleft',
                colors: [ '#ff0000', '#28c9ff', '#0000ff', '#ecf386' ],
                labels: [ 'National Cycle Route', 'Regional Cycle Route', 'Local Cycle Network', 'Cycleway' ]
                },
                paths: {
                    p1: {
                        color: '#008000',
                        weight: 8,
                        latlngs: [
                            { lat: 51.50, lng: -0.082 },
                            { lat: 48.83, lng: 2.37 },
                            { lat: 41.91, lng: 12.48 }
                        ]
                    }
                },
                osloCenter: {
                    lat: 48.83,
                    lng: 2.37,
                    zoom: 4
                }
            });

//        var steps = 10, i=0;
//        function handler()
//        {
//            $log.info('Running handler');
//            var xValue = (centerX + radius * Math.cos(2 * Math.PI * i / steps));
//            var yValue = (centerY + radius * Math.sin(2 * Math.PI * i / steps));
//            angular.extend($scope, mappointService.getData(xValue, yValue));
//            i+=1;
//        }

        //$interval(handler, 1000 );
    }]);
