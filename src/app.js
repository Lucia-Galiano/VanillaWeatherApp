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
}

let emoji = document.querySelector("#emoji");
function emojiWeather() {
  if (temp <= 10) {
    emoji.innerHTML = "☁️";
  } else {
    emoji.innerHTML = "☀️";
  }
}
