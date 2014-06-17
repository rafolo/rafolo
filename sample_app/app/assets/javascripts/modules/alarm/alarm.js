var alarmModule = angular.module('app.alarm', ['lib.directives'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/alarm', {
            templateUrl: '/assets/modules/alarm/alarm.view.html',
            controller: 'AlarmController'
        });
    }])
    .controller("AlarmController", ['$scope', '$log', '$interval', '$http', '$timeout', 'alarmService', 'statusesConstant', function ($scope, $log, $interval, $http, $timeout, alarmService, statusesConstant) {

        //test
        //1
        $scope.persons = [];
        $scope.statuses = statusesConstant;
        $scope.cellInputEditableTemplate = '<input ng-class="\'colt\' + col.index" ng-input="COL_FIELD" ng-model="COL_FIELD" ng-blur="updateEntity(row)" />';
        $scope.cellSelectEditableTemplate = '<select ng-class="\'colt\' + col.index" ng-input="COL_FIELD" ng-model="COL_FIELD" ng-options="id as name for (id, name) in statuses" ng-blur="updateEntity(row)" />';

        var crudReadTemplate = '<input type="button" class="btn btn-default"  value="r" ng-click="crudReadHandler($index)" />';
        var crudUpdateTemplate = '<input type="button" class="btn btn-blue" value="u" ng-click="crudUpdateHandler($index)" />';
        var crudDeleteTemplate = '<input type="button" class="btn btn-red" value="d" ng-click="crudDeleteHandler($index)" />';
        $scope.columnDefs = [
            { field: 'name', displayName: 'Name', enableCellEditOnFocus: true,
                editableCellTemplate: $scope.cellInputEditableTemplate, colFilterText: '' },
            { field: 'description', displayName: '?', enableCellEdit: false },
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

        $scope.setPagingData = function (data, page, pageSize) {

            var pagedData = data.slice((page - 1) * pageSize, page * pageSize);
            $scope.persons = pagedData;
            $scope.totalServerItems = data.length;
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
            debugger;
            row.read = true;
            alarmService.updateEntity(row);
        }

        $scope.update = function (row) {
            row.update = true;
            alarmService.updateEntity(row);
        }

        $scope.delete = function (row) {
            row.delete = true;
            alarmService.updateEntity(row);

        }

        alarmService.getPagedDataAsync($http, $scope.setPagingData, $scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
        $scope.$watch($scope.pagingOptions, function (newVal, oldVal) {
            if (newVal !== oldVal && newVal.currentPage !== oldVal.currentPage) {
                alarmService.getPagedDataAsync($http, $scope.setPagingData, $scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
            }
        }, true);
        //TODO! Remove redundand
        $scope.$watch('pagingOptions', function (newVal, oldVal) {

            if (newVal !== oldVal && newVal.currentPage !== oldVal.currentPage) {
                alarmService.getPagedDataAsync($http, setPagingData, $scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
            }
        }, true);

        //MaoMapMapMapMap
        $scope.selectedItems3 = [
            {name: 'tutu'}
        ];
        angular.extend($scope, {osloCenter: {
            lat: 59.93,
            lng: 10.75,
            zoom: 12
        }});

        $scope.markers ={
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
                $scope.markers ={
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

                for(var i=0;i<10;i++)
                {
                    $scope.markers.put("mid"+i, {
                        lat: 59.91 + i/10*newVal[0].age,
                        lng: 10.75,
                        message: "End",
                        focus: true,
                        draggable: false
                    });
                }
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

    }]).directive('ngBlur', function () {
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

            var _date = $filter('date')(new Date(input),
                'MMM dd yyyy - HH:mm:ss');

            return _date.toUpperCase();

        };
    })
    .factory('statusesConstant', function () {
        return {
            false: 'inactive',
            true: 'active'
        };
    });
