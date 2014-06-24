var alarmModule = angular.module('app.alarm', ['lib.directives'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/alarm', {
            templateUrl: '/assets/modules/alarm/alarm.view.html',
            controller: 'AlarmController'
        });
    }])
    .controller("AlarmController", ['$scope', '$log', '$interval', '$timeout', "$resource", 'alarmService', 'statusesConstant', function ($scope, $log, $interval, $timeout, $resource, alarmService, statusesConstant) {

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
            }

        }

//Data
        $scope.persons = [];
        $scope.setPagingData = function (data, page, pageSize, count) {
            $scope.persons = data;
            $scope.gridOptions.totalServerItems = count.toString(); //ngGrid watches only string totalServerItems
            if (!$scope.$$phase) {
                $scope.$apply();
            }
        };

        alarmService.getPagedDataAsync($scope.setPagingData, $scope.gridOptions.pagingOptions.pageSize, $scope.gridOptions.pagingOptions.currentPage);
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
        //$scope.$http = $http; //TODO! remove and injext services in VGBC
        //angular.extend(this, new VasabiGridBaseController($scope));
//        //angular.extend(this, new VasabiChartBaseController($scope));
//        //angular.extend(this, new VasabiMapBaseController($scope));

    }
    ]);
