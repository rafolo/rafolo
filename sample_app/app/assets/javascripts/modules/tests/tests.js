var alarmModule = angular.module('app.tests', ['lib.directives'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/test', {
                templateUrl: '/assets/modules/tests/tests.html'
        });
    }]);