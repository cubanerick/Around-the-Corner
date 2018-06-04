var locations = [];
var map, marker;
// var coords = [];
// for (var i = 0; i < locations.length;i++) {
// coords = localStorage.getItem("locations");
// }

function initMap() {
    var text = ['1', '2', '3', '4', '5', '6', '7', '8'] // this needs to be changed to be dynamically filled from AJAX calls
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
    var infowindow = new google.maps.InfoWindow({
        content: contentString
    });
    var contentString = '<div id = "box">' + '<p>' + 'Test test TEST' + '</p>' + '</div>';

    for (var i = 0; i < json.length; i++) {
        var addmarker = new google.maps.Marker({
            position: new google.maps.LatLng(
                parseFloat(json[i][0]),
                parseFloat(json[i][1])
            ),
            map: map

        });

        google.maps.event.addListener(addmarker, 'click', (function (addmarker, i) {
            return function () {
                infowindow.setContent(text[i]); // text[i] needs to be a dynamically created array from AJAX call to correspond with each coordinate we pull
                infowindow.open(map, addmarker);
            }
        })(addmarker, i));

    }
}


$(document).on("click", "#searchBtn", function () {
    // event.preventDefault();
    localStorage.clear
    var searchInput = $("#searchInput").val().trim();
    var location = $("#location").val().trim();
    var radius = $("#radius").val().trim();

    var queryURL = "https://www.eventbriteapi.com/v3/events/search/?token=NFYIPZGRL3ENLJ7TMLZJ&q=" + searchInput + "&location.address=" + location + "&location.within=" + radius;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        // console.log(response)


        var results = response.events;

        for (var i = 0; i < results.length; i++) {

            // $("#object").append(response.events[i].venue_id);
            // $("#object").append(response.events[i].description.text);
            // $("#object").append(response.events[i].url);

            var venueID = response.events[i].venue_id;
            var venuesQueryURL = 'https://www.eventbriteapi.com/v3/venues/' + venueID + '/?token=NFYIPZGRL3ENLJ7TMLZJ';

            $.ajax({
                url: venuesQueryURL,
                method: 'GET'
            }).then(function (response) {

                var venueAddress = response.address.localized_address_display;
                var latitude = response.address.latitude;
                var longitude = response.address.longitude;

                // $("#addresses").append(venueAddress);
                // locations.empty();
                locations.push([parseFloat(latitude), parseFloat(longitude)]);
                // localStorage.setItem("location" + i ,"{lat: " + latitude + ", lng: " + longitude + "}")

                // locations.push(localStorage.getItem("location" + i))
            })

            localStorage.setItem("locations", JSON.stringify(locations));
        }
    });
    // console.log(locations); 
});