var alarmModule = angular.module('app.alarm', ['lib.directives'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/alarm', {
            templateUrl: '/assets/modules/alarm/alarm.view.html',
            controller: 'AlarmController'
        });
    }])
    .controller("AlarmController", ['$scope', '$log', '$interval', '$http', 'alarmService', 'StatusesConstant', function ($scope, $log, $interval, $http, mappointService, StatusesConstant) {

        //GRID
        //Columns
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

        //Init
        $scope.$on('ngGridEventData', function () {
            $scope.gridOptions.selectRow(0, true);
        });
        //GRID/

        //COMBO
        $scope.myComboData = [
            {name: "Old", age: 50},
            {name: "Young", age: 10}
        ];
        //COMBO/

        //Internals - do not touch
        $scope.$http = $http; //TODO! remove and injext services in VGBC
        angular.extend(this, new VasabiGridBaseController($scope));
        angular.extend(this, new VasabiChartBaseController($scope));
        angular.extend(this, new VasabiMapBaseController($scope));

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
