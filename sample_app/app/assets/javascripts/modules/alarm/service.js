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


                if (row.create) {
                    //create
                    var _row = roJson.stripForInsert(row);
                    this.responsePromise = $http.post("/api/alarms.json", _row);
                    this.responsePromise.row = row;
                }
                else if (row.read) {
                    //read
                    var link = "/api/alarms/" + row.id + ".json"; //"/api/alarms/2.json"
                    this.responsePromise = $http.get(link);
                    this.responsePromise.row = row;
                }
                else if (row.update) {
                    //update
                    var _row = roJson.stripForUpdate(row);
                    var link = "/api/alarms/" + row.id + ".json"; //"/api/alarms/2.json"
                    this.responsePromise = $http.put(link, angular.toJson(_row));
                    this.responsePromise.row = row;
                }
                //delete
                else if (row.delete) {

                    var _row = roJson.stripForUpdate(row);
                    var link = "/api/alarms/" + row.id + ".json"; //"/api/alarms/2.json"
                    this.responsePromise = $http.delete(link);
                    this.responsePromise.row = row;
                }
                else
                    throw "Unknown data type";


                this.responsePromise.success(function (data, status, headers, config) {

                    if (row.create) {
                        //debugger;
                        //create
                        this.responsePromise.row.id = data.id;
                        this.responsePromise.row.create = false;
                    }
                    else if (row.read) {
                        //read
                        //this.responsePromise.row = data;
                        angular.extend(this.responsePromise.row, data);
                        this.responsePromise.row.read = false;
                    }
                    else if (row.update) {
                        //debugger;
                        //update
                        //nop
                        this.responsePromise.row.update = false;
                    }
                    //delete
                    else if (row.delete) {
                        this.row = null;
                        this.responsePromise.row.delete = false;
                    }
                    else
                        throw "Unknown data type";

                    this.responsePromise.row.serverStatus = status;
                    this.responsePromise.row.serverErrors = undefined;

                    console.log("AJAX successed:" + data + " status:" + status);
                });
                responsePromise.error(function (data, status, headers, config) {
                    //debugger;
                    //alert("AJAX failed!" + status);
                    this.responsePromise.row.serverStatus = status;
                    this.responsePromise.row.serverErrors = data.errors;
                });

                return responsePromise;
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




