alarmModule.controller("Alarm1Controller", ['$scope', '$log', '$interval', '$timeout', "$resource", 'alarmService', 'statusesConstant', function ($scope, $log, $interval, $timeout, $resource, alarmService, statusesConstant) {

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

//Options
        $scope.gridOptions = {
            enablePaging: true,
            pagingOptions: {
                pageSizes: [5, 10, 15],
                pageSize: 10,
                currentPage: 1,
                //totalServerItems: 5000
            },
            totalServerItems: 'totalServerItems'

        };

    $scope.totalServerItems = 1;

//Data
        $scope.persons = [];
        $scope.setPagingData = function (data, page, pageSize, count) {
            $scope.persons = data;
            $scope.totalServerItems = count.toString(); //ngGrid watches only string totalServerItems
            if (!$scope.$$phase) {
                $scope.$apply();
            }
        };

        //alarmService.getPagedDataAsync($scope.setPagingData, $scope.gridOptions.pagingOptions.pageSize, $scope.gridOptions.pagingOptions.currentPage);
        $scope.$watch('gridOptions.pagingOptions', function (newVal, oldVal) {
            alarmService.getPagedDataAsync($scope.setPagingData, $scope.gridOptions.pagingOptions.pageSize, $scope.gridOptions.pagingOptions.currentPage);
        }, true);

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
        };

        $scope.delete = function (row) {
            var index = -1;
            for (var i = 0; i < $scope.persons.length; i++) {
                var person = $scope.persons[i];
                if (row.id === person.id) {
                    row.delete = true;
                    alarmService.updateEntity(row);
                    $scope.persons.splice(i, 1);
                    index = i;
                    return;
                }
            }

        };

        $scope.updateAll = function (row) {

            for (var i = 0; i < $scope.persons.length; i++) {
                try {
                    var row = $scope.persons[i];
                    if (angular.isDefined(row.create)
                        || angular.isDefined(row.update)) {
                        alarmService.updateEntity(row);
                    }

                } catch (e) {
                    console.log(e.message)
                }
            }
        };

        $scope.readAll = function (row) {
            alarmService.getPagedDataAsync($scope.setPagingData, $scope.gridOptions.pagingOptions.pageSize, $scope.gridOptions.pagingOptions.currentPage);
        };


//        //COMBO
//        $scope.activeComboData = [
//            {name: "Active", active: true},
//            {name: "Inactive", active: false}
//        ];
//        $scope.myComboData = [
//            {name: "Old", age: 50},
//            {name: "Young", age: 10}
//        ];
        angular.extend(this, new AlarmCombo($scope));

        //Internals - do not touch
        //$scope.$http = $http; //TODO! remove and injext services in VGBC
        //angular.extend(this, new VasabiGridBaseController($scope));
        //angular.extend(this, new VasabiChartBaseController($scope));
       ///angular.extend(this, new VasabiMapBaseController($scope));

    }
    ]);
