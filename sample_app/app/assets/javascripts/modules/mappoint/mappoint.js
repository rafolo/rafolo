var mapPointModule = angular.module('app.mappoint', [])
    .config(function ($routeProvider) {
        $routeProvider.when('/mappoint', {
            templateUrl: '/assets/modules/mappoint/mappoint.view.html',
            controller: 'LegendController'
        });
    })
    .controller("LegendController", ['$scope', '$log', function ($scope, $log) {
        //$log.error('Halo2');
        angular.extend($scope, {
            amsterdam: {
                lat: 52.35,
                lng: 4.91,
                zoom: 12
            },
            legend: {
                position: 'bottomleft',
                colors: [ '#ff0000', '#28c9ff', '#0000ff', '#ecf386' ],
                labels: [ 'National Cycle Route', 'Regional Cycle Route', 'Local Cycle Network', 'Cycleway' ]
            },
            defaults: {
                tileLayer: "http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png",
                scrollWheelZoom: false
            }
        });

        angular.extend($scope, {
            osloCenter: {
                lat: 59.91,
                lng: 10.75,
                zoom: 12
            },
            markers: {
                osloMarker: {
                    lat: 59.91,
                    lng: 10.75,
                    message: "I want to travel here!",
                    focus: true,
                    draggable: false
                },
                osloMarker2: {
                    lat: 69.91,
                    lng: 10.75,
                    message: "I want to travel here!",
                    focus: true,
                    draggable: false
                }
            },
            defaults: {
                scrollWheelZoom: false
            }
        });

    }]);
