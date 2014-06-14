var libDirectives = angular.module("lib.directives", [])
    .directive("vasabiGrid", function () {
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
    });