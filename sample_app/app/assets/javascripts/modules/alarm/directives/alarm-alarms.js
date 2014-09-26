alarmModule.directive("alarmAlarms", function () {
        return {
            restrict: "A",
            transclude: true,
            templateUrl: '/assets/modules/alarm/directives/alarm-alarms.html'
        };
    });