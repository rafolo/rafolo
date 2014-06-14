//https://docs.angularjs.org/tutorial/step_05#controller_a-note-on-minification
var homeModule = angular.module('app.home', [])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: '/assets/modules/home/home.html',
            controller: 'HomeController'
            })
            .otherwise({ redirectTo: '/' });
        }])

    .controller('HomeController', ['$scope', 'logger', 'helloWorldService', function ($scope, logger, helloWorldService) {
        logger.log("creating HomeController");
        $scope.message = helloWorldService.sayHello();
    }]);