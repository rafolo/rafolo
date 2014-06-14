var alarmModule = angular.module('app.alarm', ['lib.directives'])
    .config(function ($routeProvider) {
        $routeProvider.when('/alarm', {
            templateUrl: '/assets/modules/alarm/alarm.view.html',
            controller: 'AlarmController'
        });


    })
    .controller("AlarmController", ['$scope', '$log', '$interval', 'alarmService', function ($scope, $log, $interval, mappointService) {
        //grid
        $log.error("I am inn");
        $scope.mySelections = [];
        $scope.myData = [
            {name: "Moroni", age: 50},
            {name: "Tiancum", age: 43},
            {name: "Jacob", age: 27},
            {name: "Nephi", age: 29},
            {name: "Enos", age: 34}
        ];

        $scope.gridOptions = {
            data: 'myData',
            selectedItems: $scope.mySelections,
            multiSelect: false
        };

        $scope.myCombo = [
            {v: "Young", k: 10},
            {v: "Old", k: 43}
        ];

        $scope.profileData = { "attributes": [{
            "attribute": {
                "id": 56,
                "name": "Hárlitur",
                "typeID": 5,
                "visibleToUsers": true
            },
            "type": {
                "id": 5,
                "typeName": "list"
            },
            "attributeValues": [{
                "id": 109,
                "attributeID": 56,
                "value": "Ljós",
                "chosen": true
            }, {
                "id": 110,
                "attributeID": 56,
                "value": "Dökkur",
                "chosen": false
            }],
            "valueText": null
        }]};

        $scope.changeValue = function changeValue(attribute, value) {
            $scope.mySelections[0].age = value.id;
            //alert(JSON.stringify({"attributeID":attribute.attribute.id, "type": attribute.type.typeName, "value":value.id}));
        };


        //form
        $scope.myForm = {};
        $scope.myForm.name = "Jakob Jenkov";
        $scope.myForm.car = "nissan";

        $scope.myForm.submitTheForm = function (item, event) {
            console.log("--> Submitting form");
            var dataObject = {
                name: $scope.myForm.name, car: $scope.myForm.car
            };

            var responsePromise = $http.post("/angularjs-examples/json-test-data.jsp", dataObject, {});
            responsePromise.success(function (dataFromServer, status, headers, config) {
                console.log(dataFromServer.title);
            });
            responsePromise.error(function (data, status, headers, config) {
                alert("Submitting form failed!");
            });
        };

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
    }]);
