let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[new Date().getDay()];
let hours = new Date().getHours();
let mins = new Date().getMinutes();

function weatherInfo(response) {
  console.log(response.data.temperature.current);
  let currentTemp = document.querySelector("#current-temp");
  currentTemp.innerHTML = Math.round(response.data.temperature.current);
}

function searchCity(event) {
  event.preventDefault();
  let input = document.querySelector("#search-input");
  let newCity = document.querySelector(".city");
 newCity.innerHTML =
   input.value.trim().charAt(0).toUpperCase() +
   input.value.trim().slice(1).toLowerCase();


  //api calls and info and instruction
  let apiKey = `b4b16ao0bed60a37cdt0a5dcdf865c3b`;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${input.value}&key=${apiKey}`;

  axios.get(apiUrl).then(weatherInfo);
}

let form = document.querySelector("form");
form.addEventListener("submit", searchCity);

// TIme, Day,
let currentTime = document.querySelector(".current-time");
currentTime.innerHTML = `${hours}:${mins}`;
