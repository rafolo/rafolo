var alarmModule = angular.module('app.alarm', ['lib.directives'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/alarm', {
            templateUrl: '/assets/modules/alarm/alarm.view.html'
        });
    }]);

//TODO! LEARN jak bindowac sie do elementow
//debugger;
$( "div" ).css( "border", "13px solid red" );
$("div").bind("DOMSubtreeModified",function(){
    allert("changed");
});

