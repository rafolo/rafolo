alarmModule.controller("Alarm2Controller", ['$scope', '$log', '$interval', '$timeout', "$resource", 'alarmService', 'statusesConstant', function ($scope, $log, $interval, $timeout, $resource, alarmService, statusesConstant) {

//Columns
    $scope.statuses = statusesConstant;
    $scope.cellSelectEditableTemplate = '<select ng-class="\'colt\' + col.index" ng-input="COL_FIELD" ng-model="COL_FIELD" ng-options="id as name for (id, name) in statuses" ng-blur="updateEntity(row)" />';
    $scope.columnDefs = [
        { field: 'id', displayName: 'id', enableCellEdit: false},
        { field: 'name', displayName: 'Name', enableCellEditOnFocus: true,
            editableCellTemplate: "/assets/lib/directives/templates/cells/inputCellEditableTemplate.html", colFilterText: '' },
        { field: 'description', displayName: '?', enableCellEdit: false},
        { field: 'born', displayName: 'Born', enableCellEdit: false, cellFilter: 'datetime' },
        { field: 'active', displayName: 'Active?', enableCellEditOnFocus: true,
            editableCellTemplate: $scope.cellSelectEditableTemplate,
            cellFilter: 'status'}
    ];

    $scope.selectedItems2 = [
        {name: 'tutu'}
    ];

//Options
    $scope.gridOptions = {
        enablePaging: true,
        pagingOptions: {
            pageSizes: [5, 10, 15],
            pageSize: 10,
            currentPage: 1
            //totalServerItems: 5000
        }

    };

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


   //combo
    angular.extend(this, new AlarmCombo($scope))

}
]);
