app.factory('rafolo.Json', ['$window', function (win) {

    //notify TODO! Move to notify service
    return {
        msgs: [],
        notify: function (msg) {
            msgs.push(msg);
            if (msgs.length == 3) {
                win.alert(msgs.join("\n"));
                msgs = [];
            }
        },

        //stripForUpdate
        stripForUpdate: function (row) {
            var _row = angular.copy(row);
            delete _row.created_at;
            delete _row.updated_at;
            return _row;
        },

        //stripForInsert
        stripForInsert: function (row) {
            var _row = stripForUpdate(row);
            delete _row.id;
            return _row;
        }
    }
}]);





