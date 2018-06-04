var locations = [];
var text = [] 



$(document).on("click", "#searchBtn", function () {
    // event.preventDefault();
    getInfo();
    $('.container').hide();
    $('#loader').show();
    setTimeout(sendtoMap, 5000);
});

function sendtoMap() {
    window.location.href = "map.html"
}


function getInfo() {
    localStorage.clear
    var searchInput = $("#searchInput").val().trim();
    var location = $("#location").val().trim();
    var radius = $("#radius").val();

    var queryURL = "https://www.eventbriteapi.com/v3/events/search/?token=NFYIPZGRL3ENLJ7TMLZJ&q=" + searchInput + "&location.address=" + location + "&location.within=" + radius;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response)


        var results = response.events;

        for (var i = 0; i < results.length; i++) {
            
            text.push("<div class='infoWindowContainer'><h1>" + response.events[i].name.text + "</h1><br><p>" + response.events[i].description.html + "</p><br><img class='infoImage' src='" + response.events[i].logo.original.url + "'><p><a href =" + response.events[i].url + "/>Event Info</p></div>");

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
                // localStorage.setItem("location" + i ,"{lat: " + latitude + ", lng: " + longitude + "}")

                // locations.push(localStorage.getItem("location" + i))
            })

            // localStorage.setItem("locations", JSON.stringify(locations));
        }
    });
}



