alarmModule.service('alarmService', ['rafolo.Json', function (rafoloJson) {

    //Grid
    //Load
    this.getPagedDataAsync = function (http, setPagingData, pageSize, page, searchText) {
        setTimeout(function () {
            var data;
            if (searchText) {
                var ft = searchText.toLowerCase();
//                    $scope.$http.get('/largeLoad.json').success(function (largeLoad) {
                http.get('/api/alarms.json').success(function (largeLoad) {
                    data = largeLoad.filter(function (item) {
                        return JSON.stringify(item).toLowerCase().indexOf(ft) != -1;
                    });
                    setPagingData(data, page, pageSize);
                });
            } else {
//                    $scope.$http.get('/largeLoad.json').success(function (largeLoad) {
                http.get('/api/alarms.json').success(function (largeLoad) {
                    setPagingData(largeLoad, page, pageSize);
                });
            }
        }, 100);
    };

    //Save
    this.updateEntity = function (row) {
        debugger;
        if (!this.save) {
            this.save = { promise: null, pending: false, row: null };
        }
        this.save.row = row;
        if (!this.save.pending) {
            this.save.pending = true;
            this.save.promise = $timeout(function () {

                if (row.id){
                //create
                    var _row = rafoloJson.stripForInsert(row);
                    var responsePromise = $http.put("/alarms.json", _row);
                }
                else
                {
                 //update
                    var _row = rafoloJson.stripForUpdate(row);
                    var link = ["/api/alarms/", row.id, "2.json"].join(); //"/api/alarms/2.json"
                    var responsePromise = $http.put(link, angular.toJson(_row));
                }

                responsePromise.success(function(data, status, headers, config) {
                    console.log(status);
                });
                responsePromise.error(function(data, status, headers, config) {
                    alert("AJAX failed!");
                });

                this.save.pending = false;
            }, 500);
        }
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




