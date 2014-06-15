angular.module('app.about', [])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/about', {
            templateUrl: 'assets/modules/about/about.html',
            controller: 'AboutCtrl'
        });
    }])

    .controller('AboutCtrl', ['$scope', 'logger', function ($scope, logger) {
        $scope.logEntries = logger.logEntries;
    }]);