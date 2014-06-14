mapPointRoutesModule.service('mapPointRoutesService', function() {
    this.getData = function(x, y) {
        return {
            legend: {
                position: 'bottomleft',
                colors: [ '#ff0000', '#28c9ff', '#0000ff', '#ecf386' ],
                labels: [ 'National Cycle Route', 'Regional Cycle Route', 'Local Cycle Network', 'Cycleway' ]
            },
            osloCenter: {
                lat: 59.93,
                lng: 10.75,
                zoom: 12
            },
            markers: {
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
            },
            defaults: {
                scrollWheelZoom: false
            }
        }
    };
});

