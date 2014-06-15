var alarmModule = angular.module('app.alarm', ['lib.directives'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/alarm', {
            templateUrl: '/assets/modules/alarm/alarm.view.html',
            controller: 'AlarmController'
        });
    }])
    .controller("AlarmController", ['$scope', '$log', '$interval', '$http', 'alarmService', 'StatusesConstant', function ($scope, $log, $interval, $http, mappointService, StatusesConstant) {

        $scope.$http = $http;
        angular.extend(this, new VasabiGridBaseController($scope));

        //Columns
        $scope.statuses = StatusesConstant;
        $scope.cellInputEditableTemplate = '<input ng-class="\'colt\' + col.index" ng-input="COL_FIELD" ng-model="COL_FIELD" ng-blur="updateEntity(row)" />';
        $scope.cellSelectEditableTemplate = '<select ng-class="\'colt\' + col.index" ng-input="COL_FIELD" ng-model="COL_FIELD" ng-options="id as name for (id, name) in statuses" ng-blur="updateEntity(row)" />';

        $scope.columnDefs = [
            { field: 'name', displayName: 'Name', enableCellEditOnFocus: true,
                editableCellTemplate: $scope.cellInputEditableTemplate, colFilterText: '' },
            { field: 'age', displayName: 'Age', enableCellEdit: false },
            { field: 'born', displayName: 'Born', enableCellEdit: false },
            { field: 'status', displayName: 'Status', enableCellEditOnFocus: true,
                editableCellTemplate: $scope.cellSelectEditableTemplate,
                cellFilter: 'mapStatus'}
        ];

        //Combo
        $scope.myComboData = [
            {name: "Old", age: 50},
            {name: "Young", age: 10}
        ];





        //chart
        var data = [
            {
                "xScale": "ordinal",
                "comp": [],
                "main": [
                    {
                        "className": ".main.l1",
                        "data": [
                            { "y": 15, "x": "2012-11-19T00:00:00" },
                            { "y": 11, "x": "2012-11-20T00:00:00" },
                            { "y": 8, "x": "2012-11-21T00:00:00" },
                            { "y": 10, "x": "2012-11-22T00:00:00" },
                            { "y": 1, "x": "2012-11-23T00:00:00" },
                            { "y": 6, "x": "2012-11-24T00:00:00" },
                            { "y": 8, "x": "2012-11-25T00:00:00" }
                        ]
                    },
                    {
                        "className": ".main.l2",
                        "data": [
                            {"y": 29, "x": "2012-11-19T00:00:00"},
                            {"y": 33, "x": "2012-11-20T00:00:00"},
                            {"y": 13, "x": "2012-11-21T00:00:00"},
                            {"y": 16, "x": "2012-11-22T00:00:00"},
                            {"y": 7, "x": "2012-11-23T00:00:00"},
                            {"y": 18, "x": "2012-11-24T00:00:00"},
                            {"y": 8, "x": "2012-11-25T00:00:00"}
                        ]
                    }
                ],
                "type": "line-dotted",
                "yScale": "linear"
            },
            {
                "xScale": "ordinal",
                "comp": [],
                "main": [
                    {
                        "className": ".main.l1",
                        "data": [
                            {"y": 12, "x": "2012-11-19T00:00:00"},
                            {"y": 18, "x": "2012-11-20T00:00:00"},
                            {"y": 8, "x": "2012-11-21T00:00:00"},
                            {"y": 7, "x": "2012-11-22T00:00:00"},
                            {"y": 6, "x": "2012-11-23T00:00:00"},
                            {"y": 12, "x": "2012-11-24T00:00:00"},
                            {"y": 8, "x": "2012-11-25T00:00:00"}
                        ]
                    },
                    {
                        "className": ".main.l2",
                        "data": [
                            {"y": 29, "x": "2012-11-19T00:00:00"},
                            {"y": 33, "x": "2012-11-20T00:00:00"},
                            {"y": 13, "x": "2012-11-21T00:00:00"},
                            {"y": 16, "x": "2012-11-22T00:00:00"},
                            {"y": 7, "x": "2012-11-23T00:00:00"},
                            {"y": 18, "x": "2012-11-24T00:00:00"},
                            {"y": 8, "x": "2012-11-25T00:00:00"}
                        ]
                    }
                ],
                "type": "cumulative",
                "yScale": "linear"
            },
            {
                "xScale": "ordinal",
                "comp": [],
                "main": [
                    {
                        "className": ".main.l1",
                        "data": [
                            {"y": 12, "x": "2012-11-19T00:00:00"},
                            {"y": 18, "x": "2012-11-20T00:00:00"},
                            {"y": 8, "x": "2012-11-21T00:00:00"},
                            {"y": 7, "x": "2012-11-22T00:00:00"},
                            {"y": 6, "x": "2012-11-23T00:00:00"},
                            {"y": 12, "x": "2012-11-24T00:00:00"},
                            {"y": 8, "x": "2012-11-25T00:00:00"}
                        ]
                    },
                    {
                        "className": ".main.l2",
                        "data": [
                            {"y": 29, "x": "2012-11-19T00:00:00"},
                            {"y": 33, "x": "2012-11-20T00:00:00"},
                            {"y": 13, "x": "2012-11-21T00:00:00"},
                            {"y": 16, "x": "2012-11-22T00:00:00"},
                            {"y": 7, "x": "2012-11-23T00:00:00"},
                            {"y": 18, "x": "2012-11-24T00:00:00"},
                            {"y": 8, "x": "2012-11-25T00:00:00"}
                        ]
                    }
                ],
                "type": "bar",
                "yScale": "linear"
            }
        ];

        var order = [0, 1, 0, 2],
            i = 0,
            xFormat = d3.time.format('%A'),
            rotateTimer,
            chart,
            t = 3500;

        if ($("#xchart-sine2").length > 0) {
            chart = new xChart('bar', data[order[i]], '#xchart-sine2', {
                axisPaddingTop: 5,
                paddingLeft: 30,
                dataFormatX: function (x) {
                    return new Date(x);
                },
                tickFormatX: function (x) {
                    return d3.time.format('%a')(x);
                }
            });

            rotateTimer = setTimeout(rotateChart, t);
        }

        function updateChart(i) {
            chart.setData(data[i]);
        }

        function rotateChart() {
            i += 1;
            i = (i >= order.length) ? 0 : i;
            updateChart(order[i]);
            rotateTimer = setTimeout(rotateChart, t);
        }


//        var centerX=59.92;
//        var centerY = 10.75;
//        var radius = 0.01;
//        angular.extend($scope, mappointService.getData(centerX, centerY));
//
//        var steps = 10, i=0;
//        function handler()
//        {
//            $log.info('Running handler');
//            var xValue = (centerX + radius * Math.cos(2 * Math.PI * i / steps));
//            var yValue = (centerY + radius * Math.sin(2 * Math.PI * i / steps));
//            angular.extend($scope, mappointService.getData(xValue, yValue));
//            i+=1;
//        }
//
//        $interval(handler, 1000 );
    }]).directive('ngBlur', function () {
        return function (scope, elem, attrs) {
            elem.bind('blur', function () {

                scope.$apply(attrs.ngBlur);
            });
        };
    })
    .filter('mapStatus', function (StatusesConstant) {
        return function (input) {
            if (StatusesConstant[input]) {
                return StatusesConstant[input];
            } else {
                return 'unknown';
            }
        };
    })
    .factory('StatusesConstant', function () {
        return {
            false: 'active',
            true: 'inactive'
        };
    });
