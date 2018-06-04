var locations = [];
var map, marker, venueAddress, latitude, longitude;

function initMap() {
    var losAngeles = {lat: 34.0522, lng: -118.2437};
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: losAngeles,
    });

    var coords = localStorage.getItem("locations"); 
    var json = JSON.parse(coords);

    function addmarker(coord) {
        marker = new google.maps.Marker({
            position: coord,
            map: map
        });
    }

    for (var i = 0; i < json.length; i++) {
        addmarker({lat:parseFloat(json[i][0]),lng:parseFloat(json[i][1])});
    }
    console.log(json);
}

$(document).on("click","#searchBtn", function() {
    // event.preventDefault();
      
    var searchInput = $("#searchInput").val().trim();
    var location = $("#location").val().trim();
    var radius = $("#radius").val().trim();
      
    var queryURL = "https://www.eventbriteapi.com/v3/events/search/?token=NFYIPZGRL3ENLJ7TMLZJ&q=" + searchInput + "&location.address=" + location + "&location.within=" + radius;
      
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        // console.log(response)
              
        var results = response.events;
              
        for (var i = 0; i < results.length; i++) {
      
            var venueID = response.events[i].venue_id;
            var venuesQueryURL = 'https://www.eventbriteapi.com/v3/venues/' + venueID + '/?token=NFYIPZGRL3ENLJ7TMLZJ';
                  
            $.ajax({
                url: venuesQueryURL,
                method : 'GET'
            }).then(function(response) {
                      
                venueAddress = response.address.localized_address_display;
                latitude = response.address.latitude;
                longitude = response.address.longitude;
      
                locations.push([parseFloat(latitude),parseFloat(longitude)]);
            })

            if(i === (results.length - 1)){
                localStorage.setItem("locations", JSON.stringify(locations));
            }
        }   
    });
});
