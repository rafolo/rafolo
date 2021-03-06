var libDirectives = angular.module("lib.directives", [])
    .directive("myDiv", function () {
        return {
            restrict: "A",
            transclude: true,
            templateUrl: '/assets/lib/directives/templates/my-div.html'
        };
    }).directive("myDivWithModel", function () {
        return {
            require: 'ng-model',
            restrict: "A",
            transclude: true,
            templateUrl: '/assets/lib/directives/templates/my-div-with-model.html'
        };
    }).directive('ngBlur', function () {
        return function (scope, elem, attrs) {
            elem.bind('blur', function () {
                scope.$apply(attrs.ngBlur);
            });
        };
    });