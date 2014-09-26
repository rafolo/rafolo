var alarmModule = angular.module('app.alarm', ['lib.directives'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/alarm', {
            templateUrl: '/assets/modules/alarm/alarm.view.html'
        })
        .when('/test', {
                templateUrl: '/assets/modules/alarm/alarm.view.html'
        });
    }]);

//TODO! LEARN jak bindowac sie do elementow
//debugger;
//$(".sparkline").css("border", "13px solid red");
//$(".sparkline").bind("DOMSubtreeModified",function(){
//    alert("changed");
//});
//
//var whatToObserve = {childList: true, attributes: true, subtree: true, attributeOldValue: true, attributeFilter: ['class', 'style']};
//var mutationObserver = new MutationObserver(function(mutationRecords) {
//    $.each(mutationRecords, function(index, mutationRecord) {
//        if (mutationRecord.type === 'childList') {
//            if (mutationRecord.addedNodes.length > 0) {
//                //DOM node added, do something
//                console.log("node added" + mutationRecord.css)
//            }
//            else if (mutationRecord.removedNodes.length > 0) {
//                //DOM node removed, do something
//                console.log("node added1" + mutationRecord.css)
//            }
//        }
//        else if (mutationRecord.type === 'attributes') {
//            if (mutationRecord.attributeName === 'class') {
//                //class changed, do something
//                console.log("node added2" + mutationRecord.css)
//            }
//        }
//    });
//});
//mutationObserver.observe(document.body, whatToObserve);
