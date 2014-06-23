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

                //TODO! Last row select does not select
                if (0 != $scope.options.items.length) {
                    $scope.options.selectRow(Math.max(0, index - 1), true);
                }
            };

        }
    })
    //TODO! Belongs sw else
    .directive("vasabiAlarm", function () {
        return {
            restrict: "A",
            transclude: true,
            templateUrl: '/assets/lib/directives/vasabi-alarm.html'
        };
    });