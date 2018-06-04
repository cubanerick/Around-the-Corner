var map, marker;

function initMap() {

    var losAngeles = {
        lat: 34.0522,
        lng: -118.2437
    };
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: losAngeles,
    });

    var coords = localStorage.getItem("locations");
    var json = JSON.parse(coords);

    // function addmarker(coord) {
    //     marker = new google.maps.Marker({
    //         position: coord,
    //         map: map,
    //     });
    // }
    var infowindow = new google.maps.InfoWindow();

    for (var i = 0; i < json.length; i++) {
        var addmarker = new google.maps.Marker({
            position: new google.maps.LatLng(
                parseFloat(json[i][0]),
                parseFloat(json[i][1])
            ),
            map: map,
            
        });

        google.maps.event.addListener(addmarker, 'click', (function (addmarker, i) {
            return function () {
                infowindow.setContent(text[i]); // text[i] needs to be a dynamically created array from AJAX call to correspond with each coordinate we pull
                infowindow.open(map, addmarker);
            }
        })(addmarker, i));

    }
}