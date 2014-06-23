var libDirectives = angular.module("lib.directives", [])
    .directive('vasabiGrid', function ($compile, $timeout) {

        return {
            restrict: 'E',
            require: "^ngController",
            templateUrl: '/assets/lib/directives/templates/vasabi-grid.html',
            scope: { items: '=', cols: '=', selectedItems: '=', customOptions: '=', pagingOptions: '=', crudCreate: '=', crudRead: '=', crudUpdate: '=', crudDelete: '='},
            replace: true,
            transclude: false,
            controller: controller,
            link: link
        };

        function link(scope, elem, attrs, ngCtrl) {

            //scope.options.footerTemplate =  ngCtrl.getFooterTemplate();
        }

        function controller($scope, $attrs) {

            $scope.selectedItems = [];

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

            var customOptions = $scope.customOptions;

            var fixedOptions = {
                columnDefs: 'cols',
                data: 'items'
            };

//         fixedOptions.columnDefs.push({ "field": 'name', "displayName": 'Name2' });
//            fixedOptions.columnDefs = [
//                { field: 'name', displayName: 'Name' },
//                { field: 'description', displayName: '?'},
//                { field: 'born', displayName: 'Born'},
//                { field: 'active', displayName: 'Active?'},
//
//
//            ];

//

            //crud columns TODO! reconsile with contrller
//            debugger;
//            $scope.crudReadTemplate = "<div class=\"left-inner-addon \"> <i class=\"icon-refresh\"></i><input type=\"button\" class=\"btn btn-default\"  value=\"r\" ng-click=\"crudReadHandler($index)\" /></div>";
//            $scope.crudUpdateTemplate = "<div class=\"left-inner-addon \"> <i class=\"icon-ok\"></i><input type=\"button\" class=\"btn btn-blue\"  value=\"r\" ng-click=\"crudUpdateHandler($index)\" /></div>";
//            $scope.crudDeleteTemplate = "<div class=\"left-inner-addon \"> <i class=\"icon-remove\"></i><input type=\"button\" class=\"btn btn-red\"  value=\"r\" ng-click=\"crudDeleteHandler($index)\" /></div>";
//
//            fixedOptions.columnDefs.push({field: 'R', displayName: '', enableCellEdit: false, cellTemplate: $scope.crudReadTemplate});
//            fixedOptions.columnDefs.push({field: 'U', displayName: '', enableCellEdit: false, cellTemplate: $scope.crudUpdateTemplate});
//            fixedOptions.columnDefs.push({field: 'D', displayName: '', enableCellEdit: false, cellTemplate: $scope.crudDeleteTemplate});

            //defaultOptions
            //debugger;
            var pagingOptions = $scope.pagingOptions; //TODO! move to custom options
            var enablePaging = false;
            if (pagingOptions) {
                enablePaging = true;
            }
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
                enablePaging: enablePaging,
                pagingOptions: pagingOptions,
                showFooter: true,
                totalServerItems: $scope.totalServerItems, //TODO! Paging scope does not scope
                checkboxCellTemplate: "/assets/lib/directives/templates/cells/checkboxCellTemplate.html"
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
                $scope.options.selectItem(index, false);
                $scope.crudDelete($scope.items[index]);

            };

        }
    })
    .directive("vasabiAlarm", function () {
        return {
            restrict: "A",
            transclude: true,
            templateUrl: '/assets/lib/directives/vasabi-alarm.html'
        };
    });