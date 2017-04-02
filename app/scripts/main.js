//console.log('\'Allo \'Allo!');
/*var x = document.getElementById("demo");

//Get user's current latitude and longitude 
function getLocation() {
    if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition); 
    }
    else {
        x.innerHTML = "Geolocation is not supported by this browser";
    }

}
function showPosition(position) {
    x.innerHTML = "Latitude: " + position.coords.latitude + "<br>Longitude: " + position.coords.longitude;
}
getLocation(); */

var latitude,
    longitude,
    request,
    requestWeather,
    weather,
    domWeather = document.getElementById("weather");

function getWeather() {
    //Get user's location using IP-API
    request = new XMLHttpRequest();
    request.open("GET", "http://ip-api.com/json", true);
    request.onload = function() {
        if (request.status >= 200 && request.status < 400) {
            var location = JSON.parse(request.responseText);
            latitude = location.lat;
            longitude = location.lon;
            
            //Request to OpenWeather API to get data
            requestWeather = new XMLHttpRequest();
            requestWeather.open("GET", "http://api.openweathermap.org/data/2.5/weather?lat=" + latitude
             + "&lon=" + longitude + "&appid=9b37eb46932ca27fa0c98ed1aec271b9", true);
            requestWeather.onload = function() {
                if (requestWeather.status >= 200 && requestWeather.status < 400) {
                    var response = JSON.parse(requestWeather.responseText);
                    weather = response.weather[0].main;
                }
            }
            requestWeather.send();

        }
    }
    request.send();
}
getWeather();



