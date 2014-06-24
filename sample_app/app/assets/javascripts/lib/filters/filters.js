var libFilters = angular.module("lib.filters", [])
    .filter('datetime', function ($filter) {
        return function (input) {
            if (input == null) {
                return "";
            }

            var _date = $filter('date')(new Date(input), //use other filter & modify it
                'MMM dd yyyy - HH:mm:ss');

            return '(' + _date + ')';

        };
    }).filter('chart', function ($filter) {
        return function (input) {
            if (input == null) {
                return "";
            }

            var _chart = input + "<div class='easyPieChart' style='display: inline-block; width: 150px; height: 150px; line-height: 150px;' data-percent='89'></div>";

            _chart = "<p ng-bind-html=\"" + _chart + "\"></p>";
            return _chart;

        };
    })
    //TODO! Add filtering by field name
    .filter('error', function ($filter) {
        return function (input, field) {

            if (input == null) {
                return "";
            }

            var _error = input[0];
            if (input.length > 1) {
                _error += "...";
            }

            return field + ":" + _error;
        };
    });
