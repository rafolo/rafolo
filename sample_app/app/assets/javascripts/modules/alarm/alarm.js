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
            {field: 'R', displayName:'', width: 30, enableCellEdit: false, cellTemplate: crudReadTemplate}
            ,
            {field: 'U', displayName:'', width: 30, enableCellEdit: false, cellTemplate: crudUpdateTemplate}
            ,
            {field: 'D', displayName:'', width: 30, enableCellEdit: false, cellTemplate: crudDeleteTemplate}

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
        $scope.create = function(){
            var row =  {name: "created", born: new Date(), active:true, create:true };
            alarmService.updateEntity(row);
            return row;
        }

        $scope.read = function(row){
            debugger;
            row.read = true;
            alarmService.updateEntity(row);
        }

        $scope.update = function(row){
            row.update = true;
            alarmService.updateEntity(row);
        }

        $scope.delete = function(row){
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
//        $scope.statuses = statusesConstant;
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
        $scope.activeComboData = [
            {name: "Active", active: true},
            {name: "Inactive", active: false}
        ];
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
