var map, marker;

function initMap() {

    var userPosition;
    if (localStorage.getItem("userPosition") !== "undefined") {
        var uP = localStorage.getItem("userPosition");
        var jsonUserPosition = JSON.parse(uP);
        // console.log(jsonUserPosition);
        userPosition = {
            lat: parseFloat(jsonUserPosition[0]),
            lng: parseFloat(jsonUserPosition[1])
        };
    }

    var aP = localStorage.getItem("addressPosition");
    var jsonaddressPosition = JSON.parse(aP);

    // var userPosition = {
    //     lat: parseFloat(jsonUserPosition[0]),
    //     lng: parseFloat(jsonUserPosition[1])
    // };


    // if (localStorage.getItem("userPosition") === "undefined" || (localStorage.getItem("userPosition") === "undefined" && localStorage.getItem("addressPosition") )) {
        var addressPosition = {
            lat: parseFloat(jsonaddressPosition[0]),
            lng: parseFloat(jsonaddressPosition[1])
        }
    // }

    var usedposition = {};
    if (localStorage.getItem("userPosition") !== "undefined") {
        usedposition = addressPosition;
    } else if(localStorage.getItem("userPosition") === "undefined") {
        usedposition = userPosition;
    }

    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: usedposition,
    });

    // console.log(userPosition);

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

$(document).on('click', '#searchPageButton', function () {
    localStorage.clear();

    window.location.href = 'index.html';
})

function w3_open() {
    document.getElementById("main").style.marginLeft = "25%";
    document.getElementById("mySidebar").style.width = "25%";
    document.getElementById("mySidebar").style.display = "block";
    document.getElementById("openNav").style.display = 'none';
}

function w3_close() {
    document.getElementById("main").style.marginLeft = "0%";
    document.getElementById("mySidebar").style.display = "none";
    document.getElementById("openNav").style.display = "inline-block";
}