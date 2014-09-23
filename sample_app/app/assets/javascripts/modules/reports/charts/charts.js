angular.module('app.reports', ['app.reports.services'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/charts', {
            templateUrl: '/assets/modules/reports/charts/charts.html',
            controller: 'ChartsCtrl'
        });
    }])

    .controller('ChartsCtrl', ['$scope', 'chartService', function ($scope, chartService) {
        $scope.type1 = "line";
        $scope.data1 = chartService.getData1();
        $scope.opts1 = { axisPaddingTop: 5, paddingLeft: 20,
                        dataFormatX: function (x) {
                            return new Date(x);
                        },
                        tickFormatX: function (x) {
                            return d3.time.format('%a')(x);
                        }
        };

        $scope.type2 = "bar";
        $scope.data2 = chartService.getData2();
        $scope.opts2 = { axisPaddingTop: 5, paddingLeft: 20 };
        //more examples at:
        //http://tenxer.github.io/xcharts/examples/

        $scope.value1 = [5,8,10,24,14,24,23,20,9,5,10,12]; //as an array
        $scope.value2 = "30,19,10,24,24,14,23,20,9,5,10,12"; //as a string
    }]);
