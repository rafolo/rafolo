var alarmModule = angular.module('app.alarm', ['lib.directives'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/alarm', {
            templateUrl: '/assets/modules/alarm/alarm.view.html',
            controller: 'AlarmController'
        });
    }])
    .controller("AlarmController", ['$scope', '$log', '$interval', '$http', 'alarmService', 'StatusesConstant', function ($scope, $log, $interval, $http, mappointService, StatusesConstant) {

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
