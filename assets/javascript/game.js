var locations = [{lat: 34.1425, lng: -118.2551},{lat: 34.1808, lng: -118.3090},{lat: 34.1478, lng: -118.1445}];
var map;

function initMap() {
    var losAngeles = {lat: 34.0522, lng: -118.2437};
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: losAngeles,
    });

    
    for (var i = 0; i < locations.length; i++) {
        var marker = new google.maps.Marker({
            position: locations[i],
            map: map
        });
    }   
}

$(document).on("click","#searchBtn", function() {
    event.preventDefault();
      
    var searchInput = $("#searchInput").val().trim();
    var location = $("#location").val().trim();
    var radius = $("#radius").val().trim();
      
    var queryURL = "https://www.eventbriteapi.com/v3/events/search/?token=NFYIPZGRL3ENLJ7TMLZJ&q=" + searchInput + "&location.address=" + location + "&location.within=" + radius;
      
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response)
              
              
        var results = response.events;
              
        for (var i = 0; i < results.length; i++) {
      
            // $("#object").append(response.events[i].venue_id);
            // $("#object").append(response.events[i].description.text);
            // $("#object").append(response.events[i].url);
      
            var venueID = response.events[i].venue_id;
            var venuesQueryURL = 'https://www.eventbriteapi.com/v3/venues/' + venueID + '/?token=NFYIPZGRL3ENLJ7TMLZJ';
                  
            $.ajax({
                url: venuesQueryURL,
                method : 'GET'
            }).then(function(response) {
                      
                var venueAddress = response.address.localized_address_display;
                var latitude = response.address.latitude;
                var longitude = response.address.longitude;
      
                // $("#addresses").append(venueAddress);
                // locations.empty();
                locations.push({lat: parseFloat(latitude), lng: parseFloat(longitude)});
            })
      
        } 
        
        window.eqfeed_callback = function(results) {

            for (var i = 0; i < locations.length; i++) {
               var marker = new google.maps.Marker({
                   position: locations[i],
                   map: map
                });
            }
        }
        
    }); 
    console.log(locations); 
});
