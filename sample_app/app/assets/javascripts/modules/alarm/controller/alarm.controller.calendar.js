alarmModule.controller("AlarmCalendarController", ['$scope', '$log', '$interval', '$timeout', "$resource", 'alarmService', 'statusesConstant', function ($scope, $log, $interval, $timeout, $resource, alarmService, statusesConstant) {


    /* config object */
    $scope.uiConfig = {
        calendar:{
            height: 450,
            editable: true,
            header:{
                left: 'month basicWeek basicDay agendaWeek agendaDay',
                center: 'title',
                right: 'today prev,next'
            },
            dayClick: $scope.alertEventOnClick,
            eventDrop: $scope.alertOnDrop,
            eventResize: $scope.alertOnResize
        }
    };

    $scope.eventSources = [];

}
]);
