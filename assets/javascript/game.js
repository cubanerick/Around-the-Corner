var locations = [];
var text = [] 
var userPosition;
var addressPosition;
var geocode;
var userPositionaddress;
localStorage.clear();

function getGeolocation() {
    navigator.geolocation.getCurrentPosition(function(position) {
        userPosition = [position.coords.latitude, position.coords.longitude]
    });
}
if(!localStorage.getItem("userPosition")) {
    getGeolocation();
};



$(document).on("click", "#searchBtn", function () {
    getInfo();
    $('.container').hide();
    $('#loader').show();
    localStorage.setItem("userPosition", JSON.stringify(userPosition));
    setTimeout(sendtoMap, 5000);
});



function sendtoMap() {
    window.location.href = "map.html";
}


function getInfo() {
    // localStorage.clear();

    var searchInput = $("#searchInput").val().trim();
    var location = ($("#location").val().trim() || "undefined")
    var radius = $("#exampleFormControlSelect1").val().trim();
    var locationlat = parseFloat(userPosition[0]);
    var locationlng = parseFloat(userPosition[1]);
    var queryURL;

    var queryURL2 = "https://www.eventbriteapi.com/v3/events/search/?token=NFYIPZGRL3ENLJ7TMLZJ&q=" + searchInput + "&location.latitude=" + locationlat + "&location.longitude=" + locationlng + "&location.within=" + radius;
    
    var queryURL1 = "https://www.eventbriteapi.com/v3/events/search/?token=NFYIPZGRL3ENLJ7TMLZJ&q=" + searchInput + "&location.address=" + location + "&location.within=" + radius;

        console.log(location)
    if(location === "undefined"){
        queryURL = queryURL2;
    }else{
        queryURL = queryURL1;
    }
    console.log(queryURL)
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response)

        var results = response.events;

        addressPosition = [parseFloat(response.location.latitude), parseFloat(response.location.longitude)];

        for (var i = 0; i < results.length; i++) {
            
            text.push("<div class='infoWindowContainer'><h1>" + response.events[i].name.text + "</h1><br><p>" + response.events[i].description.html + "</p><br><img class='infoImage' src='" + response.events[i].logo.original.url + "'><br><a href =" + response.events[i].url + " target='_blank'>Event Info</a></div>");

            localStorage.setItem('info', JSON.stringify(text));
            // text.push();
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
                localStorage.setItem("locations", JSON.stringify(locations));
                localStorage.setItem("addressPosition", JSON.stringify(addressPosition));
                // localStorage.setItem("location" + i ,"{lat: " + latitude + ", lng: " + longitude + "}")

                // locations.push(localStorage.getItem("location" + i))
            })

            // localStorage.setItem("locations", JSON.stringify(locations));
        }
    });
}


