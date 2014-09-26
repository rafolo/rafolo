angular.module("lib.directives.examples", ["lib.filters"])
    .directive("exampleUsercontrol1", function () {
        return {
            restrict: "A",
            transclude: true,
            templateUrl: '/assets/lib/directives/example/example-usercontrol1.html'
        };
    });