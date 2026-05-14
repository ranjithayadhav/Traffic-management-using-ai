let map;

function initMap(){

    map = new google.maps.Map(document.getElementById("map"), {

        center: { lat: 12.9716, lng: 77.5946 },

        zoom: 14,
    });
}

window.initMap = initMap;

function calculateRoute(){

    const routeCoordinates = [

        { lat: 12.9716, lng: 77.5946 },

        { lat: 12.9720, lng: 77.5955 },

        { lat: 12.9728, lng: 77.5968 },

        { lat: 12.9737, lng: 77.5980 },

        { lat: 12.9745, lng: 77.5992 },

        { lat: 12.9752, lng: 77.6005 },

        { lat: 12.9760, lng: 77.6018 }
    ];

    const routePath = new google.maps.Polyline({

        path: routeCoordinates,

        geodesic: true,

        strokeColor: "#0000FF",

        strokeOpacity: 1.0,

        strokeWeight: 5,
    });

    routePath.setMap(map);

    simulateAmbulance(routeCoordinates);
}

function simulateAmbulance(path){

    let index = 0;

    const ambulanceMarker = new google.maps.Marker({

        position: path[0],

        map: map,

        icon: {
            url: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",

            scaledSize: new google.maps.Size(40, 40)
        }   
    });

    const moveInterval = setInterval(() => {

        if(index < path.length){

            ambulanceMarker.setPosition(path[index]);

            checkSignals(index);

            index++;

        } else {

            clearInterval(moveInterval);
        }

    }, 1000);
}

function checkSignals(index){

    if(index % 1 === 0){

        activateGreen("signal1");
    }

    if(index % 2 === 0){

        activateGreen("signal2");
    }

    if(index % 3 === 0){

        activateGreen("signal3");
    }
}

function activateGreen(signalId){

    const signal = document.getElementById(signalId);

    const red = signal.querySelector(".red");

    const green = signal.querySelector(".green");

    red.classList.remove("active");

    green.classList.add("active");

    setTimeout(() => {

        green.classList.remove("active");

        red.classList.add("active");

    }, 4000);
}