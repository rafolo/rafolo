var libDirectives = angular.module("lib.directives", [])
    .directive("myDiv", function () {
        return {
            restrict: "A",
            transclude: true,
            templateUrl: '/assets/lib/directives/base/my-div.html'
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
    });