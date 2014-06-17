app.service('roJson', ['$window', function (win) {

    //notify TODO! Move to notify service
//        this.msgs = [];
//        this.notify = function (msg) {
//            msgs.push(msg);
//            if (msgs.length == 3) {
//                win.alert(msgs.join("\n"));
//                msgs = [];
//            }
//        }

    //stripForUpdate
    this.stripForUpdate = function (row) {
        var _row = angular.copy(row);
        delete _row.created_at;
        delete _row.updated_at;
        return _row;
    }

    //stripForInsert
    this.stripForInsert = function (row) {
        var _row = this.stripForUpdate(row);
        delete _row.id;
        return _row;
    }

}])
;





