var map, marker;

function initMap() {
    
    var uP = localStorage.getItem("userPosition");
    var jsonUserPosition = JSON.parse(uP);
    console.log(jsonUserPosition);

    var userPosition = {
        lat: parseFloat(jsonUserPosition[0]),
        lng: parseFloat(jsonUserPosition[1])
    };

    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: userPosition,
    });

    console.log(userPosition);

    var coords = localStorage.getItem("locations");
    var json = JSON.parse(coords);
    var htmlText = localStorage.getItem("info");
    var jsonEventData =JSON.parse(htmlText);

    // function addmarker(coord) {
    //     marker = new google.maps.Marker({
    //         position: coord,
    //         map: map,2
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
                infowindow.setContent(jsonEventData[i]); // text[i] needs to be a dynamically created array from AJAX call to correspond with each coordinate we pull
                infowindow.open(map, addmarker);
            }
        })(addmarker, i));

    }
}

$(document).on('click','#searchPageButton', function() {
    window.location.href = 'index.html';
})