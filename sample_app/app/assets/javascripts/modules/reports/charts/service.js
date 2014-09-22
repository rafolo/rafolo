angular.module('app.reports.services', []).service('chartService', function() {
    this.getData1 = function() {
        var data =
        {
            "xScale": "ordinal",
            "comp": [],
            "main": [
                {
                    "className": ".main.l1",
                    "data": [
                        { "y": 15, "x": "2012-11-19T00:00:00" },
                        { "y": 11, "x": "2012-11-20T00:00:00" },
                        { "y": 8, "x": "2012-11-21T00:00:00" },
                        { "y": 10, "x": "2012-11-22T00:00:00" },
                        { "y": 1, "x": "2012-11-23T00:00:00" },
                        { "y": 6, "x": "2012-11-24T00:00:00" },
                        { "y": 8, "x": "2012-11-25T00:00:00" }
                    ]
                },
                {
                    "className": ".main.l2",
                    "data": [
                        {"y": 29, "x": "2012-11-19T00:00:00"},
                        {"y": 33, "x": "2012-11-20T00:00:00"},
                        {"y": 13, "x": "2012-11-21T00:00:00"},
                        {"y": 16, "x": "2012-11-22T00:00:00"},
                        {"y": 7, "x": "2012-11-23T00:00:00"},
                        {"y": 18, "x": "2012-11-24T00:00:00"},
                        {"y": 8, "x": "2012-11-25T00:00:00"}
                    ]
                }
            ],
            "type": "line-dotted",
            "yScale": "linear"
        };
        return data;
    }

    this.getData2 = function() {
        var data = {
            "xScale": "ordinal",
            "yScale": "linear"
        };

        data.main = []
        var devices = $(["Nexus", "i-Phone", "Samsung"]);
        $([1,2,3]).each(function(){

            var graphData = []

            devices.each(function(){
                graphData.push({
                    "x": this,
                    "y": getRandomInt(3,12)
                });
            });

            data.main.push({
                "className": ".device",
                "data": graphData
            })
        });

        return data;
    };
});