let date = document.querySelector("#date");
let currentTime = new Date();
let hours = currentTime.getHours();
let minutes = currentTime.getMinutes();
let dayIndex = currentTime.getDay();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let day = days[dayIndex];

date.innerHTML = `${day} ${hours}:${minutes}`;

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
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute("src", ) = `https://openweathermap.org/img/wn/${response.data.weather[0].icon}2x.png`;

  celsiusTemperature = response.data.main.temp;

}
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





function replaceToC(event) {
  event.preventDefault();
   alert ("Hola");
  let tempElement = document.querySelector("#temperature");
  tempElement.innerHTML = `celsiusTemperature`;
}

function convertToF(event) {
  event.preventDefault();
  alert ("Hola");
  let tempElement = document.querySelector("#temperature");
  tempElement.innerHTML = `(celsiusTemperature *9)/5+32`;
}

let celsiusTemperature = null;


let c = document.querySelector("#celsius");
let f = document.querySelector("#fahrenheit");

c.addEventListener("click", replaceToC());
f.addEventListener("click", convertToF());

