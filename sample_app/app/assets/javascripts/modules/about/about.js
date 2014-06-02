angular.module('app.about', [])
    .config(function ($routeProvider) {
        $routeProvider.when('/about', {
            templateUrl: 'assets/modules/about/about.html',
            controller: 'AboutCtrl'
        });
    })

    .controller('AboutCtrl', function ($scope, logger) {
        $scope.logEntries = logger.logEntries;
    });