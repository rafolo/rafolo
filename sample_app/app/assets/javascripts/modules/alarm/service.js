alarmModule.service('alarmService', function () {
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
    }
);

