mapPointModule.service('mappointService', function() {
    this.getData = function(lat) {
        return {
            legend: {
                position: 'bottomleft',
                colors: [ '#ff0000', '#28c9ff', '#0000ff', '#ecf386' ],
                labels: [ 'National Cycle Route', 'Regional Cycle Route', 'Local Cycle Network', 'Cycleway' ]
            },
            osloCenter: {
                lat: 59.91,
                lng: 10.75,
                zoom: 12
            },
            markers: {
                osloMarker: {
                    lat: lat,
                    lng: 10.75,
                    message: "I want to travel here1!",
                    focus: true,
                    draggable: false
                },
                osloMarker2: {
                    lat: 69.91,
                    lng: 10.75,
                    message: "I want to travel here2!",
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

