var alarmModule = angular.module('app.alarm', ['lib.directives'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/alarm', {
            templateUrl: '/assets/modules/alarm/alarm.view.html',
            controller: 'AlarmController'
        });
    }])
    .controller("AlarmController", ['$scope', '$log', '$interval', '$http', 'alarmService', 'StatusesConstant', function ($scope, $log, $interval, $http, mappointService, StatusesConstant) {

        //test
        //1
        $scope.persons = [];
        $scope.statuses = StatusesConstant;
        $scope.cellInputEditableTemplate = '<input ng-class="\'colt\' + col.index" ng-input="COL_FIELD" ng-model="COL_FIELD" ng-blur="updateEntity(row)" />';
        $scope.cellSelectEditableTemplate = '<select ng-class="\'colt\' + col.index" ng-input="COL_FIELD" ng-model="COL_FIELD" ng-options="id as name for (id, name) in statuses" ng-blur="updateEntity(row)" />';
        $scope.columnDefs = [
            { field: 'name', displayName: 'Name', enableCellEditOnFocus: true,
                editableCellTemplate: $scope.cellInputEditableTemplate, colFilterText: '' },
            { field: 'age', displayName: 'Age', enableCellEdit: false },
            { field: 'born', displayName: 'Born', enableCellEdit: false, cellFilter: 'datetime' },
            { field: 'status', displayName: 'Status', enableCellEditOnFocus: true,
                editableCellTemplate: $scope.cellSelectEditableTemplate,
                cellFilter: 'status'}
        ];

        //Pagination
        $scope.totalServerItems = 0;
        $scope.pagingOptions = {
            pageSizes: [5, 10, 50],
            pageSize: 10,
            currentPage: 1
        };

        $scope.$watch('pagingOptions', function (newVal, oldVal) {

            if (newVal !== oldVal && newVal.currentPage !== oldVal.currentPage) {
                $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
            }
        }, true);

        $scope.setPagingData = function (data, page, pageSize) {
            var pagedData = data.slice((page - 1) * pageSize, page * pageSize);
            $scope.persons = pagedData;
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
                    $scope.$http.get('/largeLoad.json').success(function (largeLoad) {
                        data = largeLoad.filter(function (item) {
                            return JSON.stringify(item).toLowerCase().indexOf(ft) != -1;
                        });
                        $scope.setPagingData(data, page, pageSize);
                    });
                } else {
                    $scope.$http.get('/largeLoad.json').success(function (largeLoad) {
                        $scope.setPagingData(largeLoad, page, pageSize);
                    });
                }
            }, 100);
        };

        $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);

        $scope.$watch($scope.pagingOptions, function (newVal, oldVal) {
            if (newVal !== oldVal && newVal.currentPage !== oldVal.currentPage) {
                $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
            }
        }, true);

        //Save
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

        //2
        $scope.persons2 = [
            {name: "Person2", age: 50},
            {name: "Person2", age: 43},
            {name: "Person2", age: 27},
            {name: "Person2", age: 29},
            {name: "Person2", age: 34}
        ];

        $scope.columnDefs2 = [
            {field: 'name', displayName: 'Name'},
            {field: 'age', displayName: 'Age'}
        ];


//        $scope.gridOptions = {
//            showColumnMenu : true,
//            showGroupPanel : true
//        };
        //


//        //GRID
//        //Columns
//        $scope.statuses = StatusesConstant;
//        $scope.cellInputEditableTemplate = '<input ng-class="\'colt\' + col.index" ng-input="COL_FIELD" ng-model="COL_FIELD" ng-blur="updateEntity(row)" />';
//        $scope.cellSelectEditableTemplate = '<select ng-class="\'colt\' + col.index" ng-input="COL_FIELD" ng-model="COL_FIELD" ng-options="id as name for (id, name) in statuses" ng-blur="updateEntity(row)" />';
//
//        $scope.columnDefs = [
//            { field: 'name', displayName: 'Name', enableCellEditOnFocus: true,
//                editableCellTemplate: $scope.cellInputEditableTemplate, colFilterText: '' },
//            { field: 'age', displayName: 'Age', enableCellEdit: false },
//            { field: 'born', displayName: 'Born', enableCellEdit: false, cellFilter: 'datetime' },
//            { field: 'status', displayName: 'Status', enableCellEditOnFocus: true,
//                editableCellTemplate: $scope.cellSelectEditableTemplate,
//                cellFilter: 'status'}
//        ];
//
//        //Init
//        $scope.$on('ngGridEventData', function () {
//            $scope.gridOptions.selectRow(0, true);
//        });
//        //GRID/
//
//        //COMBO
        $scope.myComboData = [
            {name: "Old", age: 50},
            {name: "Young", age: 10}
        ];
//        //COMBO/
//
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
    .filter('status', function (StatusesConstant) {
        return function (input) {
            if (StatusesConstant[input]) {
                return StatusesConstant[input];
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
    .factory('StatusesConstant', function () {
        return {
            false: 'active',
            true: 'inactive'
        };
    });
