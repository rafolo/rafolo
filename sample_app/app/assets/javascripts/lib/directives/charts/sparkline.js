angular.module('lib.directives.sparkline', [])
    .directive('sparkline', function () {
        return {
            restrict: 'E',
            require: '^ngModel',
            //template: '<div class="sparkline big">{{ngModel}}</div>',
            template: '<div class="sparkline big"></div>',
            replace: true,
            scope: {
                ngModel: '='
            },

            link: function (scope, elem, attrs, ngModel) {
                scope.$watch(attrs.ngModel, function(v) {
                    var model;

                    // Trim trailing comma if we are a string
                    angular.isString(ngModel.$viewValue) ? model = ngModel.$viewValue.replace(/(^,)|(,$)/g, "") : model = ngModel.$viewValue;
                    var data;
                    // Make sure we have an array of numbers
                    angular.isArray(model) ? data = model : data = model.split(',');

                    var barSpacing, barWidth, color, height;
                    color = $(elem).attr("data-color") || "red";
                    height = "18px";
                    if ($(elem).hasClass("big")) {
                        barWidth = "5px";
                        barSpacing = "2px";
                        height = "30px";
                    }
                    return $(elem).sparkline(data, {
                        type: "bar",
                        barColor: Theme.colors[color],
                        height: height,
                        barWidth: barWidth,
                        barSpacing: barSpacing,
                        zeroAxis: false
                    });

                }, true);
            }
        };
    });