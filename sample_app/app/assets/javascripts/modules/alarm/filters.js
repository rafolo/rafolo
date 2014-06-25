alarmModule.filter('status', ["statusesConstant", function (statusesConstant) {
    return function (input) {
        if (statusesConstant[input]) {
            return statusesConstant[input];
        } else {
            return 'unknown';
        }
    };
}]);