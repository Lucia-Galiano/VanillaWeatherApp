function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function displayForecast(response) {
  console.log(response.data.daily);
  let forecastElement = document.querySelector("#forecast");
  let days = ["Thu", "Fri", "Sat", "Sun"];
  let forecastHTML = `<div class="row">`;
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="col-2">
      <div class="forecast-date">
        ${day}
      </div>
      <img src="https://openweathermap.org/img/wn/04d@2x.png" alt="" width="42"/>
    <div class="forecast-temperatures">
<span class="forecast-temp-max">
  18°
</span>
<span class="forecast-temp-min">
  12° 
</span> 
    </div>
    </div>
  </div>`;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
  console.log(forecastHTML);
}
function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "b400ae3b711a616262d18b0ca2cbe78f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function showTemp(response) {
  let temp = Math.round(response.data.main.temp);
  let tempElement = document.querySelector("#temperature");
  tempElement.innerHTML = `${temp}`;
  let h1 = document.querySelector("#city");
  h1.innerHTML = response.data.name;
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].description;
  let windElement = document.querySelector("#windSpeed");
  windElement.innerHTML = Math.round(response.data.wind.speed);
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");

  celsiusTemperature = Math.round(response.data.main.temp);

  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}
function search(event) {
  event.preventDefault();
  let city = document.querySelector("#city");
  let input = document.querySelector("#city-input");
  city.innerHTML = input.value;
  let apiKey = "bd3bb6534458ba51b48c49f5155745b6";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=${apiKey}&units=metric`;

  axios.get(`${apiUrl}`).then(showTemp);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);
function currentPlace(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "bd3bb6534458ba51b48c49f5155745b6";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}`).then(showTemp);
}
function currentPlaceButton(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentPlace);
}

let press = document.querySelector("#currentPlace");
press.addEventListener("click", currentPlaceButton);

function convertToF(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#temperature");
  tempElement.innerHTML = `${(celsiusTemperature * 9) / 5 + 32}`;
}

function replaceToC(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#temperature");
  tempElement.innerHTML = `${celsiusTemperature}`;
}

let c = document.querySelector(".celsius");
let f = document.querySelector(".fahrenheit");
c.addEventListener("click", replaceToC);
f.addEventListener("click", convertToF);
