angular.module('lib.directives.easy-pie-chart', [])
    .directive('easyPieChart', function () {
        return {

            restrict: 'E',
            require: '^ngModel',
            template: '<div class="easy-pie-chart" data-percent="{{ngModel}}"><span>{{ngModel}}%</span></div>',
            replace: true,
            scope: {
                ngModel: '='
            },

            link: function (scope, element, attrs, ngModel) {
                scope.$watch(attrs.ngModel, function(v) {
                        return $(element).easyPieChart({
                            lineWidth: 10,
                            size: 150,
                            lineCap: "square",
                            barColor: Theme.colors[element.data("color")] || Theme.colors.red,
                            scaleColor: Theme.colors.gray,
                            animate: 1000
                        });
                }, true);
            }
        };
    });