var libDirectives = angular.module("lib.directives", ["lib.filters"])
    .directive('vasabiGrid', ["$compile", "$timeout", function ($compile, $timeout) {

        return {
            restrict: 'E',
            require: "^ngController",
            templateUrl: '/assets/lib/directives/templates/vasabi-grid.html',
            scope: { items: '=', cols: '=', selectedItems: '=', totalServerItems: '=', customOptions: '=', pagingOptions: '=', crudCreate: '=', crudRead: '=', crudUpdate: '=', crudDelete: '=', crudReadAll: '=', crudUpdateAll: '='},
            replace: true,
            transclude: false,
            controller:  ["$scope", function($scope, $attrs) {

                $scope.selectedItems = [];

                //TODO! REmove
                $scope.hasErrors = function (row) {
                    ///debugger;

                    if (row.entity.serverErrors === undefined) {
                        return false;
                    }

                    if (row.entity.serverErrors.length == 0) {
                        return false;
                    }

                    return true;
                };

                //customOptions
                var customOptions = $scope.customOptions;

                //fixedOptions
                var fixedColumns = [
                    {field: 'U', displayName: '', width: 30, enableCellEdit: false, cellTemplate: "/assets/lib/directives/templates/cells/crudUpdateTemplate.html"},
                    {field: 'D', displayName: '', width: 30, enableCellEdit: false, cellTemplate: "/assets/lib/directives/templates/cells/crudDeleteTemplate.html"},
                    {field: 'R', displayName: '', width: 30, enableCellEdit: false, cellTemplate: "/assets/lib/directives/templates/cells/crudReadTemplate.html"}
                ];
                $scope.cols = $scope.cols.concat(fixedColumns);

                var fixedOptions = {
                    columnDefs: 'cols',
                    data: 'items'
                };

                //defaultOptions
                //debugger;
//            var pagingOptions = $scope.pagingOptions; //TODO! move to custom options
//            var enablePaging = false;
//            if (pagingOptions) {
//                enablePaging = true;
//            }
                var defaultOptions = {
                    primaryKey: "id",
                    selectedItems: $scope.selectedItems,
                    showSelectionCheckbox: true,
                    showFooter: true,
                    filterOptions: {
                        filterText: '',
                        useExternalFilter: false
                    },
                    multiSelect: false,
                    enableCellEditOnFocus: true,
                    //enablePaging: enablePaging,
                    //pagingOptions: pagingOptions,
                    showFooter: true,
                    //totalServerItems: $scope.totalServerItems, //TODO! Paging scope does not scope
                    checkboxCellTemplate: "/assets/lib/directives/templates/cells/checkboxCellTemplate.html",
                    footerTemplate: "/assets/lib/directives/templates/cells/footerTemplate.html"
                };

                $scope.options = {};
                angular.extend($scope.options, defaultOptions);
                angular.extend($scope.options, customOptions);
                angular.extend($scope.options, fixedOptions);


                $scope.$watch('search', function (value) {
                    $scope.options.filterOptions.filterText = value;
                });

                //Init
                $scope.$on('ngGridEventData', function () {
                    $scope.options.selectRow(0, true);
                });

                //Crud Handlers
                $scope.crudCreateHandler = function () {

                    if (!$scope.crudCreate) {
                        console.error('crud-create handler not provided');
                        return;
                    }

                    var row = $scope.crudCreate();
                    $scope.items.push(row);
                    $scope.options.selectRow($scope.items.length - 1, true); //TODO! select item

                    //it happens: totalServer is String to update the grid data or int to read from
                    if (typeof($scope.totalServerItems)=='string' || $scope.totalServerItems instanceof String)
                    {
                        var value = parseInt($scope.totalServerItems);
                        value+=1;
                        $scope.totalServerItems = value.toString();
                    }
                    else {
                        $scope.totalServerItems += 1;
                    }
                };

                $scope.crudReadHandler = function () {

                    if (!$scope.crudRead) {
                        console.error('crud-read handler not provided');
                        return;
                    }

                    //debugger;
                    var index = this.row.rowIndex;
                    $scope.options.selectItem(index, true);
                    $scope.crudRead($scope.items[index])
                };

                $scope.crudUpdateHandler = function () {

                    if (!$scope.crudUpdate) {
                        console.error('crud-update handler not provided');
                        return;
                    }

                    var index = this.row.rowIndex;
                    $scope.options.selectItem(index, false);
                    $scope.crudUpdate($scope.items[index]);
                };

                $scope.crudDeleteHandler = function () {

                    if (!$scope.crudDelete) {
                        console.error('crud-delete handler not provided');
                        return;
                    }

                    var index = this.row.rowIndex;
                    //TODO! Last row select does not select
                    if (0 != $scope.items.length) {
                        if (index == $scope.items.length - 1) {
                            $scope.options.selectRow(Math.max(0, index - 1 - 1), true);
                        }
                        else {
                            $scope.options.selectRow(Math.max(0, index - 1), true);
                        }
                    }

                    $scope.crudDelete($scope.items[index]);
                    $scope.totalServerItems-=1;

                };

                $scope.crudUpdateAllHandler = function () {

                    if (!$scope.crudUpdateAll) {
                        console.error('crud-update-all handler not provided');
                        return;
                    }

                    var index = this.row.rowIndex;
                    $scope.options.selectItem(index, false);
                    $scope.crudUpdateAll($scope.items[index]);
                };

                $scope.crudReadAllHandler = function () {

                    if (!$scope.crudReadAll) {
                        console.error('crud-read-all handler not provided');
                        return;
                    }

                    var index = this.row.rowIndex;
                    $scope.options.selectItem(index, false);
                    $scope.crudReadAll($scope.items[index]);
                };

            }],

            link: function (scope, elem, attrs, ngCtrl) {

                //scope.options.footerTemplate =  ngCtrl.getFooterTemplate();
            }
        };




    }])
    //TODO! Belongs sw else
    .directive("vasabiAlarm", function () {
        return {
            restrict: "A",
            transclude: true,
            templateUrl: '/assets/lib/directives/vasabi-alarm.html'
        };
    });