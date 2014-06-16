var libDirectives = angular.module("lib.directives", [])
    .directive('vasabiGrid', function ($compile) {

        return {
            restrict: 'E',
            templateUrl: '/assets/lib/directives/templates/grid.html',
            scope: { items: '=', cols: '=', selectedItems: '=', customOptions: '=', pagingOptions: '='},
            replace: true,
            transclude: false,
            controller: controller
        };

        function controller($scope, $attrs) {
            $scope.selectedItems = [];

            var customOptions = $scope.customOptions;

            var fixedOptions = {
                columnDefs: 'cols',
                data: 'items'
            };

            //defaultOptions
            var pagingOptions = $scope.pagingOptions; //TODO! move to custom options
            var enablePaging = false;
            if (pagingOptions) {
                enablePaging = true;
            }
            var defaultOptions = {
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
                totalServerItems: 'totalServerItems'

            };

            $scope.options = {};

            angular.extend($scope.options, defaultOptions);
            angular.extend($scope.options, customOptions);
            angular.extend($scope.options, fixedOptions);

            $scope.$watch('search', function (value) {
                $scope.options.filterOptions.filterText = value;
            });

            //TODO! Init
//            $scope.$on('ngGridEventData', function () {
//                $scope.gridOptions.selectRow(0, true);
//            });


        }
    })
//    .directive("vasabiGrid", function () {
//        return {
//            restrict: "E",
//            templateUrl: '/assets/lib/directives/base/vasabi-grid.html',
//            scope: { items: '=', cols: '=', selectedItems: '=', customOptions: '='},
//            replace: true,
//            transclude: true,
//            controller: controller
//        };
//
//        function controller($scope, $attrs) {
//            $scope.selectedItems = [];
//
//
//
//            var customOptions = $scope.customOptions;
//
//            var fixedOptions = {
//                columnDefs: 'cols',
//                data: 'items'
//            };
//
//            var defaultOptions = {
//                selectedItems: $scope.selectedItems,
//                showSelectionCheckbox: true,
//                showFooter: true,
//                filterOptions: {
//                    filterText: '',
//                    useExternalFilter: false
//                }
//            };
//
//            $scope.options = {};
//            angular.extend($scope.options, defaultOptions);
//            angular.extend($scope.options, customOptions);
//            angular.extend($scope.options, fixedOptions);
//
//            $scope.$watch('search', function (value) {
//                $scope.options.filterOptions.filterText = value;
//            });
//        }
//    })
    .directive("vasabiAlarm", function () {
        return {
            restrict: "A",
            transclude: true,
            templateUrl: '/assets/lib/directives/vasabi-alarm.html'
        };
    });