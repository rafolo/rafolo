alarmModule.controller("AlarmMapController", ['$scope', '$log', '$interval', '$timeout', "$resource", 'alarmService', 'statusesConstant', function ($scope, $log, $interval, $timeout, $resource, alarmService, statusesConstant) {

//Columns
    $scope.statuses = statusesConstant;
    $scope.cellSelectEditableTemplate = '<select ng-class="\'colt\' + col.index" ng-input="COL_FIELD" ng-model="COL_FIELD" ng-options="id as name for (id, name) in statuses" ng-blur="updateEntity(row)" />';
    $scope.columnDefs2 = [
        { field: 'id', displayName: 'id', enableCellEdit: false},
        { field: 'name', displayName: 'Name', enableCellEditOnFocus: true,
            editableCellTemplate: "/assets/lib/directives/templates/cells/inputCellEditableTemplate.html", colFilterText: '' },
        { field: 'description', displayName: '?', enableCellEdit: false},
        { field: 'born', displayName: 'Born', enableCellEdit: false, cellFilter: 'datetime' },
        { field: 'active', displayName: 'Active?', enableCellEditOnFocus: true,
            editableCellTemplate: $scope.cellSelectEditableTemplate,
            cellFilter: 'status'}
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
        if (newVal[0] == undefined) {
            return;
        }

        //if (newVal !== oldVal && newVal[0].age !== oldVal[0].age) {
        if (newVal !== oldVal) {
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


}
]);
