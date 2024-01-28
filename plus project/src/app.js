// api response integration to html

// api integration
function cityInfo(response) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let temperature = document.querySelector(".temperature");
  let description = document.querySelector(".description");
  let humidity = document.querySelector(".humidity");
  let wind = document.querySelector(".wind");
  let icon = document.querySelector(".icon");
  let iconCode = response.data.weather[0].icon;
  let date = new Date(response.data.dt * 1000);
  let hours = date.getHours();
  let mins = date.getMinutes();
  if (mins < 10) {
    mins = `0${mins}`;
  }
  let day = date.getDay();
  let currentDay = document.querySelector(".current-day");
  let time = document.querySelector(".time");

  console.log(date.getMinutes());

  time.innerHTML = `${hours}:${mins}`;
  currentDay.innerHTML = days[day];
  icon.setAttribute("src", `https://openweathermap.org/img/w/${iconCode}.png`);
  wind.innerHTML = response.data.wind.speed;
  humidity.innerHTML = response.data.main.humidity;
  description.innerHTML = response.data.weather[0].description;
  temperature.innerHTML = Math.round(response.data.main.temp);
}
function searchCity(city) {
  let key = "fea2efcd3e02d8f02338366e2c372f87";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;

  axios.get(apiUrl).then(cityInfo);
}

//handle submition
function handleSubmit(event) {
  event.preventDefault();
  let input = document.querySelector(".search-box");
  let h1 = document.querySelector("h1");
  h1.innerHTML = input.value;
  let city = input.value;
  searchCity(city);
}
//forecast loop
function displayForecast() {
  let forecastElement = document.querySelector("#forecast-day-list");
  let days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Saturday"];
  let forecastHtml = "";



  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `  <li class="daily-forecast">
                    <p class="forecast-day">${day}</p>
                    <div class="min-max">
                      <img
                        src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/clear-sky-day.png"
                        alt=""
                      />
                      <p class="min">12</p>
                      <p class="max">28</p>
                    </div>
                  </li>`;
  });
  forecastElement.innerHTML = forecastHtml;
}
//form submit event listener
let formSubmit = document.querySelector("#submit");
formSubmit.addEventListener("click", handleSubmit);

displayForecast()