/* main: startup script creates the 'todo' module and adds custom Ng directives */

// 'app' is the one Angular (Ng) module in this app
// 'app' module is in global namespace
window.app = angular.module('app', [
    'ngRoute',
    'ngGrid',
    'leaflet-directive',
    'app.home',
    'app.about',
    'app.alarm',
    'app.todo',
    'app.mappoint.points',
    'app.mappoint.routes',
    'app.profile'
]);

// Add global "services" (like breeze and Q) to the Ng injector
// Learn about Angular dependency injection in this video
// http://www.youtube.com/watch?feature=player_embedded&v=1CpiB3Wk25U#t=2253s
app.value('breeze', window.breeze)
    .value('Q', window.Q);

app.factory('logger', function () {

    var logEntries = [];
    var counter = 1;
    var logger = {
        log: log,
        logEntries: logEntries
    };

    return logger;

    function log(message, type) {
        var logEntry = {
            id: counter++,
            message: message,
            type: type || "info"
        };
        logEntries.push(logEntry);
    }
});



// Configure routes
app.config(['$routeProvider', function ($routeProvider) {

}]);

//initializes js for core admin widgets
//use: <div class="row" ro-core-admin-init>
app.directive('roCoreAdminInit', function() {
    return {

        link: function($scope, element, attrs) {
            // Trigger when number of children changes,
            // including by directives like ng-repeat
            var watch = $scope.$watch(function() {
                return element.children().length;
            }, function() {
                // Wait for templates to render
                $scope.$evalAsync(function() {
                    // Finally, directives are evaluated
                    // and templates are renderer here
                    var children = element.children();
                    console.log(children);

                    //CHARTS                             //TODO! create subdirective for charts, remove document.ready call as unoptimal
                    coreAdmHorizontalBarCharts.call(this);
                    coreAdmSparklineSamples.call(this);
                    coreAdmXChartsBar.call(this);
                    coreAdmXChartLeftSine.call(this);
                    coreAdmXChartSine.call(this);

                    //CA
                    coreAdmCalendar.call(this);
                    coreAdmGeneric.call(this);
                    coreAdmGritter.call(this);
                });
            });
        }
    };
});

//#region Ng directives
/*  We extend Angular with custom data bindings written as Ng directives */
app.directive('onFocus', function () {
    return {
        restrict: 'A',
        link: function (scope, elm, attrs) {
            elm.bind('focus', function () {
                scope.$apply(attrs.onFocus);
            });
        }
    };
})
    .directive('onBlur', function () {
        return {
            restrict: 'A',
            link: function (scope, elm, attrs) {
                elm.bind('blur', function () {
                    scope.$apply(attrs.onBlur);
                });
            }
        };
    })
    .directive('onEnter', function () {
        return function (scope, element, attrs) {
            element.bind("keydown keypress", function (event) {
                if (event.which === 13) {
                    scope.$apply(function () {
                        scope.$eval(attrs.onEnter);
                    });

                    event.preventDefault();
                }
            });
        };
    })
    .directive('selectedWhen', function () {
        return function (scope, elm, attrs) {
            scope.$watch(attrs.selectedWhen, function (shouldBeSelected) {
                if (shouldBeSelected) {
                    elm.select();
                }
            });
        };
    });
if (!Modernizr.input.placeholder) {
    // this browser does not support HTML5 placeholders
    // see http://stackoverflow.com/questions/14777841/angularjs-inputplaceholder-directive-breaking-with-ng-model
    app.directive('placeholder', function () {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, element, attr, ctrl) {

                var value;

                var placeholder = function () {
                    element.val(attr.placeholder);
                };
                var unplaceholder = function () {
                    element.val('');
                };

                scope.$watch(attr.ngModel, function (val) {
                    value = val || '';
                });

                element.bind('focus', function () {
                    if (value == '') unplaceholder();
                });

                element.bind('blur', function () {
                    if (element.val() == '') placeholder();
                });

                ctrl.$formatters.unshift(function (val) {
                    if (!val) {
                        placeholder();
                        value = '';
                        return attr.placeholder;
                    }
                    return val;
                });
            }
        };
    });
}
//#endregion 