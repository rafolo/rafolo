var homeModule = angular.module('app.home', [])
    .config(function ($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'assets/modules/home/home.html',
            controller: 'HomeController'
            })
            .otherwise({ redirectTo: '/' });
        })

    .controller('HomeController', function ($scope, logger, helloWorld) {
        logger.log("creating HomeController");
        $scope.message = helloWorld.sayHello();
    });
