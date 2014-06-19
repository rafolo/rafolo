alarmModule.service('alarmService', ['$timeout', '$http', 'roJson', function ($timeout, $http, roJson) {

    //Grid
    //Load
    this.getPagedDataAsync = function (http, setPagingData, pageSize, page, searchText) {
        setTimeout(function () {
            var data;
            var link = '/api/alarms.json?page=' + page.toString() + '&per_page=' + pageSize.toString();
            //debugger;//TODO! Cleanup debugger
            if (searchText) {
                var ft = searchText.toLowerCase();
                //TODO! Remove comments
//                    $scope.$http.get('/largeLoad.json').success(function (largeLoad) {
                http.get(link).success(function (largeLoad) {
                    data = largeLoad.filter(function (item) {
                        return JSON.stringify(item).toLowerCase().indexOf(ft) != -1;
                    });
                    setPagingData(data, page, pageSize, largeLoad.count);
                });
            } else {
//                    $scope.$http.get('/largeLoad.json').success(function (largeLoad) {
                http.get(link).success(function (largeLoad) {
                    setPagingData(largeLoad.data, page, pageSize, largeLoad.count);
                });
            }
        }, 100);
    };

    //Save
    this.updateEntity = function (row) {

        if (!this.save) {
            this.save = { promise: null, pending: false, row: null };
        }
        this.save.row = row;
        if (!this.save.pending) {
            this.save.pending = true;
            this.save.promise = $timeout(function () {

                var responsePromise;
                if (row.read) {

                    var link = "/api/alarms/" + row.id + ".json"; //"/api/alarms/2.json"
                    responsePromise = $http.get(link);
                    return;
                }

                //delete
                if (row.delete) {

                    var _row = roJson.stripForUpdate(row);
                    var link = "/api/alarms/" + row.id + ".json"; //"/api/alarms/2.json"
                    responsePromise = $http.delete(link);
                    return;
                }

                if (row.create) {
                    //create
                    var _row = roJson.stripForInsert(row);
                    responsePromise = $http.post("/api/alarms.json", _row);
                    return;
                }

                if (row.update) {

                    var _row = roJson.stripForUpdate(row);
                    var link = "/api/alarms/" + row.id + ".json"; //"/api/alarms/2.json"
                    responsePromise = $http.put(link, angular.toJson(_row));
                }

                responsePromise.success(function (data, status, headers, config) {
                    console.log("AJAX successed:" + data + " status" + status);
                });
                responsePromise.error(function (data, status, headers, config) {
                    alert("AJAX failed!" + status);
                });


            }, 500);
        }
        this.save.pending = false;
    };


    //Map
    this.getData = function (x, y) {
        return {markers: {
            osloMarker: {
                lat: x,
                lng: y,
                message: "I want to travel here " + x.toString().substr(4) + " " + y.toString().substr(4),
                focus: true,
                draggable: false
            },
            osloMarker2: {
                lat: 59.91,
                lng: 10.75,
                message: "I want to travel here!",
                focus: true,
                draggable: false
            }
        }
        };
    };

    this.getLoad = function (item, event) {

        //http://angular-ui.github.io/ng-grid/jsonFiles/largeLoad.json
        var responsePromise = $http.get("/angularjs-examples/json-test-data.jsp");

        responsePromise.success(function (data, status, headers, config) {
            $scope.myData.fromServer = data.title;
        });
        responsePromise.error(function (data, status, headers, config) {
            alert("AJAX failed!");
        });
    }

}]);




