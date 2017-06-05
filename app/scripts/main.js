(function getWeather() {
  var latitude,
    longitude,
    city,
    stateCode,
    country,
    request,
    requestWeather,
    weather,
    temp,
    tempCels,
    weatherIDCode,
    changeWeather = document.getElementById('change-weather'),
    dispWeather = document.getElementById('weather'),
    dispTemp = document.getElementById('temp'),
    dispLocation = document.getElementById('location');

  //Get user's location using IP-API
  request = new XMLHttpRequest();
  request.open('GET', 'https://ipapi.co/json/', true);
  request.onload = function () {
    if (request.status >= 200 && request.status < 400) {
      //TO DO: Add error handling
      var location = JSON.parse(request.responseText);
      latitude = location.latitude;
      longitude = location.longitude;
      city = location.city;
      stateCode = location.region;
      country = location.country;
      dispLocation.innerHTML = city + '<br/>' + country;

      //Request to OpenWeather API to get data
      requestWeather = new XMLHttpRequest();
      requestWeather.open('GET', 'http://api.openweathermap.org/data/2.5/weather?lat=' + latitude +
        '&lon=' + longitude + '&appid=9b37eb46932ca27fa0c98ed1aec271b9', true);
      requestWeather.onload = function () {
        if (requestWeather.status >= 200 && requestWeather.status < 400) {
          //TO DO: Add error handling
          var response = JSON.parse(requestWeather.responseText);
          weather = response.weather[0].main;
          temp = response.main.temp;
          tempCels = Math.round(temp) - 273;
          weatherIDCode = response.weather[0].id;
          if (weatherIDCode <= 232) {
            setThunderstormIcon();
          } else if (weatherIDCode >= 300 && weatherIDCode < 600) {
            setRainIcon();
          } else if (weatherIDCode >= 600 && weatherIDCode < 700) {
            setSnowIcon();
          } else if (weatherIDCode === 800) {
            setClearIcon();
          } else if (weatherIDCode > 800 && weatherIDCode < 900) {
            setCloudIcon();
          } else {
            setClearIcon();
          }
          dispWeather.innerHTML = weather;
          dispTemp.innerHTML = Math.round(tempCels) + '&#176C';

          //Convert between Fahernheit and Celsius on click of button
          changeWeather.onclick = function (e) {
            if (dispTemp.className === 'temp-c') {
              changeWeather.innerHTML = '&#176C';
              dispTemp.innerHTML = Math.round(tempCels * (9 / 5) + 32) + '&#176F';
              dispTemp.className = 'temp-f';
            } else {
              changeWeather.innerHTML = '&#176F';
              dispTemp.innerHTML = tempCels + '&#176C';
              dispTemp.className = 'temp-c';

            }
          }

        }
      }
      requestWeather.send();
    }
  }
  request.send();
})();
/*
Following functions set the animated icon
based on the weather code received from the OpenWeather API
*/

function setCloudIcon() {
  var element = document.getElementById('weather-icon');
  var parentDiv = document.createElement('div');
  parentDiv.className = 'icon cloudy';

  for (var i = 0; i < 2; i++) {
    parentDiv.innerHTML += '<div class="cloud"></div>';
  }
  element.appendChild(parentDiv);
}

function setClearIcon() {
  var element = document.getElementById('weather-icon');
  var parentDiv = document.createElement('div');
  var childDiv = document.createElement('div');
  parentDiv.className = 'icon sunny';
  childDiv.className = 'sun';
  childDiv.innerHTML += '<div class="rays"></div>';
  parentDiv.appendChild(childDiv);
  element.appendChild(parentDiv);

}

function setRainIcon() {
  var element = document.getElementById('weather-icon');
  var parentDiv = document.createElement('div');
  var childDiv = document.createElement('div');
  parentDiv.className = 'icon rainy';
  childDiv.className = 'cloud';
  childDiv.innerHTML += '<div class="rain"></div>';
  parentDiv.appendChild(childDiv);
  element.appendChild(parentDiv);
}

function setSnowIcon() {
  var element = document.getElementById('weather-icon');
  var parentDiv = document.createElement('div');
  var firstChildDiv = document.createElement('div');
  var secondChildDiv = document.createElement('div');
  parentDiv.className = 'icon flurries';
  firstChildDiv.className = 'cloud';
  secondChildDiv.className = 'snow';

  for (var i = 0; i < 2; i++) {
    secondChildDiv.innerHTML += '<div class="flake"></div>';
  }
  firstChildDiv.appendChild(secondChildDiv);
  parentDiv.appendChild(firstChildDiv);
  element.appendChild(parentDiv);

}

function setThunderstormIcon() {
  var element = document.getElementById('weather-icon');
  var parentDiv = document.createElement('div');
  var firstChildDiv = document.createElement('div');
  var secondChildDiv = document.createElement('div');
  parentDiv.className = 'icon thunder-storm';
  firstChildDiv.className = 'cloud';
  secondChildDiv.className = 'lightning';

  for (var i = 0; i < 2; i++) {
    secondChildDiv.innerHTML += '<div class="bolt"></div>';
  }
  firstChildDiv.appendChild(secondChildDiv);
  parentDiv.appendChild(firstChildDiv);
  element.appendChild(parentDiv);

}

