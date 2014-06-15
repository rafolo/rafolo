var alarmModule = angular.module('app.alarm', ['lib.directives'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/alarm', {
            templateUrl: '/assets/modules/alarm/alarm.view.html',
            controller: 'AlarmController'
        });
    }])
    .controller("AlarmController", ['$scope', '$log', '$interval', '$http', 'alarmService', 'StatusesConstant', function ($scope, $log, $interval, $http, mappointService, StatusesConstant) {
        $scope.myData;
        //grid
        //$log.error("I am AlarmController");
        //Data
        $scope.mySelections = [];
        $scope.myGridData = [
            {name: "Moroni", age: 50, born: new Date(79, 5, 24), status: false },
            {name: "Moroni", age: 50, born: new Date(79, 5, 24), status: false },
            {name: "Moroni", age: 50, born: new Date(79, 5, 24), status: false },
            {name: "Moroni", age: 50, born: new Date(79, 5, 24), status: false },
            {name: "Moroni", age: 50, born: new Date(79, 5, 24), status: false },
            {name: "Moroni", age: 50, born: new Date(79, 5, 24), status: false },
            {name: "Moroni", age: 50, born: new Date(79, 5, 24), status: false },
            {name: "Moroni", age: 50, born: new Date(79, 5, 24), status: false },
            {name: "Moroni", age: 50, born: new Date(79, 5, 24), status: false },
            {name: "Moroni", age: 50, born: new Date(79, 5, 24), status: false },
            {name: "Tiancum", age: 43, born: new Date(79, 5, 24), status: false},
            {name: "Tiancum", age: 43, born: new Date(79, 5, 24), status: false},
            {name: "Tiancum", age: 43, born: new Date(79, 5, 24), status: false},
            {name: "Tiancum", age: 43, born: new Date(79, 5, 24), status: false},
            {name: "Tiancum", age: 43, born: new Date(79, 5, 24), status: false},
            {name: "Tiancum", age: 43, born: new Date(79, 5, 24), status: false},
            {name: "Tiancum", age: 43, born: new Date(79, 5, 24), status: false},
            {name: "Tiancum", age: 43, born: new Date(79, 5, 24), status: false},
            {name: "Tiancum", age: 43, born: new Date(79, 5, 24), status: false},
            {name: "Tiancum", age: 43, born: new Date(79, 5, 24), status: false},
            {name: "Tiancum", age: 43, born: new Date(79, 5, 24), status: false},
            {name: "Tiancum", age: 43, born: new Date(79, 5, 24), status: false},
            {name: "Tiancum", age: 43, born: new Date(79, 5, 24), status: false},
            {name: "Tiancum", age: 43, born: new Date(79, 5, 24), status: false},
            {name: "Tiancum", age: 43, born: new Date(79, 5, 24), status: false},
            {name: "Tiancum", age: 43, born: new Date(79, 5, 24), status: false},
            {name: "Tiancum", age: 43, born: new Date(79, 5, 24), status: false},
            {name: "Jacob", age: 27, born: new Date(79, 5, 24), status: false},
            {name: "Nephi", age: 29, born: new Date(79, 5, 24), status: true},
            {name: "Enos", age: 34, born: new Date(79, 5, 24), status: false}
        ];

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

        //Filters
        $scope.$watch('gridOptions.filterOptions.filterTextProxy', function (searchText, oldsearchText) {
            if (searchText !== oldsearchText) {
                $scope.gridOptions.filterOptions.filterText = "name:" + searchText + "; ";
            }
        });
        $scope.filterOptions = { filterText: '', filterTextProxy: ''};

        //Pagination
        $scope.totalServerItems = 0;

        $scope.pagingOptions = {
            pageSizes: [5, 10, 20],
            pageSize: 5,
            currentPage: 1
        };
        $scope.setPagingData = function (data, page, pageSize) {
            var pagedData = data.slice((page - 1) * pageSize, page * pageSize);
            $scope.myData = pagedData;
            $scope.totalServerItems = data.length;
            if (!$scope.$$phase) {
                $scope.$apply();
            }
        };
        $scope.getPagedDataAsync = function (pageSize, page, searchText) {
            setTimeout(function () {
                var data;
                if (searchText) {
                    var ft = searchText.toLowerCase();
                    $http.get('/largeLoad.json').success(function (largeLoad) {
                        data = largeLoad.filter(function (item) {
                            return JSON.stringify(item).toLowerCase().indexOf(ft) != -1;
                        });
                        $scope.setPagingData(data, page, pageSize);
                    });
                } else {
                    $http.get('/largeLoad.json').success(function (largeLoad) {
                        $scope.setPagingData(largeLoad, page, pageSize);
                    });
                }
            }, 100);
        };
        //$scope.setPagingData($scope.myGridData, page, pageSize);

        $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);

        $scope.$watch('pagingOptions', function (newVal, oldVal) {
            if (newVal !== oldVal && newVal.currentPage !== oldVal.currentPage) {
                $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
            }
        }, true);

        //Self
        $scope.gridOptions = {
            data: 'myData',
            columnDefs: $scope.columnDefs,
            selectedItems: $scope.mySelections,
            filterOptions: $scope.filterOptions,
            enableRowSelection: true,
            enableCellEditOnFocus: true,
            enablePaging: true,
            showFooter: true,
            totalServerItems: 'totalServerItems', //paging
            pagingOptions: $scope.pagingOptions,
            selectWithCheckboxOnly: true,
            showSelectionCheckbox: true,
            enableHighlighting: false,
            //showGroupPanel: true,
            //enablePinning: true,
            multiSelect: false
        };


        $scope.updateEntity = function (row) {

            if (!$scope.save) {
                $scope.save = { promise: null, pending: false, row: null };
            }
            $scope.save.row = row.rowIndex;
            if (!$scope.save.pending) {
                $scope.save.pending = true;
                $scope.save.promise = $timeout(function () {
                    // $scope.list[$scope.save.row].$update();
                    console.log("Here you'd save your record to the server, we're updating row: "
                        + $scope.save.row + " to be: "
                        + $scope.myData[$scope.save.row].name + ","
                        + $scope.myData[$scope.save.row].age + ","
                        + $scope.myData[$scope.save.row].status);
                    $scope.save.pending = false;
                }, 500);
            }
        };

        //Combo
        $scope.myComboData = [
            {name: "Old", age: 50},
            {name: "Young", age: 10}
        ];

//        $scope.profileData = { "attributes": [{
//            "attribute": {
//                "id": 56,
//                "name": "Hárlitur",
//                "typeID": 5,
//                "visibleToUsers": true
//            },
//            "type": {
//                "id": 5,
//                "typeName": "list"
//            },
//            "attributeValues": [{
//                "id": 109,
//                "attributeID": 56,
//                "value": "Ljós",
//                "chosen": true
//            }, {
//                "id": 110,
//                "attributeID": 56,
//                "value": "Dökkur",
//                "chosen": false
//            }],
//            "valueText": null
//        }]};

        $scope.changeValue = function changeValue(attribute, value) {
            //$scope.mySelections[0].age = value.id;
            //alert(JSON.stringify({"attributeID":attribute.attribute.id, "type": attribute.type.typeName, "value":value.id}));
            alert(attribute.name);
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
