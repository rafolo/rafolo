alarmModule.filter('status', function (statusesConstant) {
    return function (input) {
        if (statusesConstant[input]) {
            return statusesConstant[input];
        } else {
            return 'unknown';
        }
    };
});