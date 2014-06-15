var profileModule = angular.module('app.profile', [])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/alarms', {
            templateUrl: '/assets/modules/profile/alarms.view.html', controller: 'ProfileController'
        }).when('/devices', {
            templateUrl: '/assets/modules/profile/devices.view.html', controller: 'ProfileController'
        }).when('/profile', {
            templateUrl: '/assets/modules/profile/profile.view.html', controller: 'ProfileController'
        }).when('/messages', {
            templateUrl: '/assets/modules/profile/messages.view.html', controller: 'MessageController'
        });
    }])
    .controller("ProfileController", ['$scope', '$log', '$interval', 'profileService', function ($scope, $log, $interval, profileService) {
        $log.info("OK, I'm in, inn keeper");
        angular.extend($scope, profileService.getData());
    }])
    .controller("MessageController", ['$scope', '$log', '$interval', 'profileService', function ($scope, $log, $interval, profileService) {
        $log.info("OK, I'm in, inn keeper");
        angular.extend($scope, profileService.getData());
    }]);
