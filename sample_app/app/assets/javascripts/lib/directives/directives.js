var libDirectives = angular.module("lib.directives", [])
    .directive("myDiv", function () {
        return {
            restrict: "A",
            transclude: true,
            templateUrl: '/assets/lib/directives/base/my-div.html'
        };
    }).directive("myDivWithModel", function () {
        return {
            require: 'ng-model',
            restrict: "A",
            transclude: true,
            templateUrl: '/assets/lib/directives/base/my-div-with-model.html'
        };
    }).directive("vasabiGrid", function () {
        return {
            restrict: "A",
            transclude: true,
            templateUrl: '/assets/lib/directives/base/vasabi-grid.html'
        };
    }).directive("vasabiAlarm", function () {
        return {
            restrict: "A",
            transclude: true,
            templateUrl: '/assets/lib/directives/vasabi-alarm.html'
        };
    }).factory('bsProcessValidator', function($timeout) {
        return function(scope, element, ngClass, bsClass) {
            $timeout(function() {
                var input = element.find('input');
                if(!input.length) { input = element.find('select'); }
                if(!input.length) { input = element.find('textarea'); }
                if (input.length) {
                    scope.$watch(function() {
                        return input.hasClass(ngClass) && input.hasClass('ng-dirty');
                    }, function(isValid) {
                        element.toggleClass(bsClass, isValid);
                    });
                }
            });
        };
    })
    .directive('bsHasSuccess', function(bsProcessValidator) {
        return {
            restrict: 'A',
            link: function(scope, element) {
                bsProcessValidator(scope, element, 'ng-valid', 'has-success');
            }
        };
    })
    .directive('bsHasError', function(bsProcessValidator) {
        return {
            restrict: 'A',
            link: function(scope, element) {
                bsProcessValidator(scope, element, 'ng-invalid', 'has-error');
            }
        };
    })
    .directive('bsHas', function(bsProcessValidator) {
        return {
            restrict: 'A',
            link: function(scope, element) {
                bsProcessValidator(scope, element, 'ng-valid', 'has-success');
                bsProcessValidator(scope, element, 'ng-invalid', 'has-error');
            }
        };
    });