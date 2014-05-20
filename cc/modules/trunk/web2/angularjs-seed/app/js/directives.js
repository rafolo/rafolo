'use strict';

/* Directives */


angular.module('myApp.directives', []).
    directive('appVersion', ['version', function (version) {
        return function (scope, elm, attrs) {
            elm.text(version);
        };
    }]).
    directive('aGreatEye', function () {
        return {
            restrict: 'E',
            replace: true,
            template: '<h1><input type="text" ng-model="value"/> lidless, wreathed in flame, {{value}} times</h1>'
};
    }).
    directive('aGreatEye2', function () {
        return {
            restrict: 'E',
            replace: true,
            template: '<h1><input type="text" ng-model="value"/> 2lidless, wreathed in flame, {{value}} times</h1>'
        };
    });
