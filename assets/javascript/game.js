var geoCoordArray = [];
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
                      geoCoordArray.push([latitude , longitude]);
                      console.log(geoCoordArray);

                  })
      
              }
      
          });
      
      });


      function initMap() {
        var losAngeles = {lat: 34.0522, lng: -118.2437};
        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 10,
            center: losAngeles
        });
    
        // var contentString  = /*Insert box content*/;
          
        var infowindow = new google.maps.InfoWindow({
          // content: contentString,
          maxWidth: 350
        });
        
        var marker;
        for (var i = 0; i < geoCoordArray.length; i++) {
          marker = new google.maps.Marker({
          position: new google.maps.LatLng(geoCoordArray[i][0], geoCoordArray[i][1]),
          map: map,
          
          });
          console.log(marker)
        }
        
        // marker.addListener('mouseover', function() {
        //   infowindow.open(map, marker);
        // });
        // marker.addListener('mouseout', function() {
        //   infowindow.close();
        // });
      }