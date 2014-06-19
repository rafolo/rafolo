var alarmModule = angular.module('app.alarm', ['lib.directives'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/alarm', {
            templateUrl: '/assets/modules/alarm/alarm.view.html',
            controller: 'AlarmController'
        });
    }])
    .controller("AlarmController", ['$scope', '$log', '$interval', '$http', '$timeout', "$resource", 'alarmService', 'statusesConstant', function ($scope, $log, $interval, $http, $timeout, $resource, alarmService, statusesConstant) {

//        debugger;
//        coreAdminInit.call(this);


//        $scope.$watchCollection( 'conferences', function( old, nuew ) {
//            if( old === nuew ) return;
//            $( '#dataTablex' ).dataTable().fnDestroy();
//            $timeout(function () {
//                $( '#dataTablex' ).dataTable();
//            });
//        });

        //test
        //1
        $scope.persons = [];
        $scope.statuses = statusesConstant;
        $scope.cellInputEditableTemplate = '<input ng-class="\'colt\' + col.index" ng-input="COL_FIELD" ng-model="COL_FIELD" ng-blur="updateEntity(row)" />';
        $scope.cellSelectEditableTemplate = '<select ng-class="\'colt\' + col.index" ng-input="COL_FIELD" ng-model="COL_FIELD" ng-options="id as name for (id, name) in statuses" ng-blur="updateEntity(row)" />';

        //$scope.footerTemplate = $resource("/libs/directives/vasabi-grid/templates/footer.html");
//        this.getFooterTemplate = function () {
//            var footerTemplate
//            $timeout(function () {
//                $http.get("/libs/directives/vasabi-grid/templates/footer.html").success(function (data) {
//                    footerTemplate = data
//                });
//            }, 500);
//
//            debugger;
//            footerTemplate = "trata";
//            return footerTemplate;
//        };

        var crudReadTemplate = "<div class=\"left-inner-addon \"> <i class=\"icon-refresh\"></i><input type=\"button\" class=\"btn btn-default\"  value=\"r\" ng-click=\"crudReadHandler($index)\" /></div>";
        var crudUpdateTemplate = "<div class=\"left-inner-addon \"> <i class=\"icon-ok\"></i><input type=\"button\" class=\"btn btn-blue\"  value=\"r\" ng-click=\"crudUpdateHandler($index)\" /></div>";
        var crudDeleteTemplate = "<div class=\"left-inner-addon \"> <i class=\"icon-remove\"></i><input type=\"button\" class=\"btn btn-red\"  value=\"r\" ng-click=\"crudDeleteHandler($index)\" /></div>";
        var chartTemplate = "<div class='easy-pie-chart-percent easyPieChart' style='display: inline-block; width: 150px; height: 150px; line-height: 150px;' data-percent='89'><span>11%</span><canvas width='150' height='150'></canvas></div>";
        $scope.columnDefs = [
            { field: 'name', displayName: 'Name', enableCellEditOnFocus: true,
                editableCellTemplate: $scope.cellInputEditableTemplate, colFilterText: '' },
            { field: 'description', displayName: '?', enableCellEdit: false, cellTemplate: chartTemplate },
            { field: 'born', displayName: 'Born', enableCellEdit: false, cellFilter: 'datetime' },
            { field: 'active', displayName: 'Active?', enableCellEditOnFocus: true,
                editableCellTemplate: $scope.cellSelectEditableTemplate,
                cellFilter: 'status'},
            {field: 'R', displayName: '', width: 30, enableCellEdit: false, cellTemplate: crudReadTemplate}
            ,
            {field: 'U', displayName: '', width: 30, enableCellEdit: false, cellTemplate: crudUpdateTemplate}
            ,
            {field: 'D', displayName: '', width: 30, enableCellEdit: false, cellTemplate: crudDeleteTemplate}

        ];

//Pagination
        $scope.totalServerItems = 0;
        $scope.pagingOptions = {
            pageSizes: [5, 10, 50],
            pageSize: 10,
            currentPage: 1
        };

        $scope.setPagingData = function (data, page, pageSize, count) {

            //TODO! Reconsile
            var pagedData = data;//data.slice((page - 1) * pageSize, page * pageSize);
            $scope.persons = pagedData;
            $scope.totalServerItems = count;
            if (!$scope.$$phase) {
                $scope.$apply();
            }
        };

//CRUD
        $scope.create = function () {
            var row = {name: "created", born: new Date(), active: true, create: true };
            alarmService.updateEntity(row);
            return row;
        }

        $scope.read = function (row) {

            row.read = true;
            alarmService.updateEntity(row);
        }

        $scope.update = function (row) {
            row.update = true;
            alarmService.updateEntity(row);
        }

        $scope.delete = function (row) {

            //TODO? Wiser method???
            for (var i = 0; i < $scope.persons.length; i++) {
                var person = $scope.persons[i];
                if (row.id = person.id) {
                    row.delete = true;
                    alarmService.updateEntity(row);
                    $scope.persons.splice(i, 1);
                }
            }

        }

        $scope.pagingOptions.currentPage = 1;
        alarmService.getPagedDataAsync($http, $scope.setPagingData, $scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
//        $scope.$watch($scope.pagingOptions, function (newVal, oldVal) {
//            if (newVal !== oldVal && newVal.currentPage !== oldVal.currentPage) {
//                alarmService.getPagedDataAsync($http, $scope.setPagingData, $scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
//            }
//        }, true);
//TODO! Remove redundand
        $scope.$watch('pagingOptions', function (newVal, oldVal) {

//            if (newVal !== oldVal && newVal.currentPage !== oldVal.currentPage) {
            alarmService.getPagedDataAsync($http, $scope.setPagingData, $scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
//            }
        }, true);

//        $scope.$watch('pagingOptions.pageSize', function (newVal, oldVal) {
//
//            alert("ddd");
//            if (newVal !== oldVal && newVal.currentPage !== oldVal.currentPage) {
//                alarmService.getPagedDataAsync($http, $scope.setPagingData, $scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
//            }
//        }, true);

//MaoMapMapMapMap
        $scope.selectedItems3 = [
            {name: 'tutu'}
        ];
        angular.extend($scope, {osloCenter: {
            lat: 59.93,
            lng: 10.75,
            zoom: 12
        }});

        $scope.markers = {
            start: {
                lat: 59.93, //newVal[0].age,
                lng: 12.75,
                message: "Start ",// + x.toString().substr(4) + " " + y.toString().substr(4),
                focus: true,
                draggable: false
            },
            end: {
                lat: 59.91,
                lng: 10.75,
                message: "End",
                focus: true,
                draggable: false
            }
        };

        $scope.$watch('selectedItems3', function (newVal, oldVal) {
            if (newVal !== oldVal && newVal[0].age !== oldVal[0].age) {
//                angular.extend($scope, {osloCenter: {
//                    lat: newVal[0].age,
//                    lng: 12.75,
//                    zoom: 12
//                }});
                $scope.markers = {
                    start: {
                        lat: newVal[0].age, //newVal[0].age,
                        lng: 12.75,
                        message: "End ",// + x.toString().substr(4) + " " + y.toString().substr(4),
                        focus: true,
                        draggable: false
                    },
                    end: {
                        lat: 59.91,
                        lng: 10.75,
                        message: "Start",
                        focus: true,
                        draggable: false
                    }
                };

//                for(var i=0;i<10;i++)
//                {
////                    $scope.markers.put("mid"+i, {
////                        lat: 59.91 + i/10*newVal[0].age,
////                        lng: 10.75,
////                        message: "End",
////                        focus: true,
////                        draggable: false
////                    });
//                }
            }
        }, true);

//222222222222222222222222222222222222222222222222222
        $scope.persons2 = [
            {name: "Person1", age: 59.93},
            {name: "Person2", age: 59.83},
            {name: "Person3", age: 59.73},
            {name: "Person4", age: 59.63},
            {name: "Person5", age: 59.53}
        ];

        $scope.columnDefs2 = [
            {field: 'name', displayName: 'Name'},
            {field: 'age', displayName: 'Age'}
        ];


//        //COMBO
        $scope.activeComboData = [
            {name: "Active", active: true},
            {name: "Inactive", active: false}
        ];
        $scope.myComboData = [
            {name: "Old", age: 50},
            {name: "Young", age: 10}
        ];
//        //COMBO/

//        //Internals - do not touch
        $scope.$http = $http; //TODO! remove and injext services in VGBC
        angular.extend(this, new VasabiGridBaseController($scope));
//        //angular.extend(this, new VasabiChartBaseController($scope));
//        //angular.extend(this, new VasabiMapBaseController($scope));

    }
    ]).
    directive('ngBlur', function () {
        return function (scope, elem, attrs) {
            elem.bind('blur', function () {
                scope.$apply(attrs.ngBlur);
            });
        };
    })
    .filter('status', function (statusesConstant) {
        return function (input) {
            if (statusesConstant[input]) {
                return statusesConstant[input];
            } else {
                return 'unknown';
            }
        };
    })
    .filter('datetime', function ($filter) {
        return function (input) {
            if (input == null) {
                return "";
            }

            var _date = $filter('date')(new Date(input), //use other filter & modify it
                'MMM dd yyyy - HH:mm:ss');

            return '(' + _date + ')';

        };
    }).filter('chart', function ($filter) {
        return function (input) {
            if (input == null) {
                return "";
            }

            var _chart = input + "<div class='easyPieChart' style='display: inline-block; width: 150px; height: 150px; line-height: 150px;' data-percent='89'></div>";

            _chart = "<p ng-bind-html=\"" + _chart + "\"></p>";
            return _chart;

        };
    })
    .factory('statusesConstant', function () {
        return {
            false: 'inactive',
            true: 'active'
        };
    });
