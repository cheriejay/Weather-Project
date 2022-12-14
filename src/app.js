let now = new Date();
let currentDate = document.querySelector("#date");
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let date = now.getDate();
let months = [
  "January",
  "Febuary",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month = months[now.getMonth()];
let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minute = now.getMinutes();
if (minute < 10) {
  minute = `0${minute}`;
}
currentDate.innerHTML = `${day}, ${date} ${month}. ${hour}:${minute}`;

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let dailyForecast = response.data.daily;
  let forecastElement = document.querySelector("#we-forecast");
  let forecastHTML = `<div class="row">`;
  //let days = ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
  dailyForecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        ` 
              <div class="col-2">
                <div class="forecast-day">${formatDay(forecastDay.dt)}</div>
                <img
                  src="http://openweathermap.org/img/wn/${
                    forecastDay.weather[0].icon
                  }@2x.png"
                  alt="clouds"
                  width="40"
                />
                <div class="forecast-temp">
                  <span class="max-temp">${Math.round(
                    forecastDay.temp.max
                  )}° </span
                  ><span class="min-temp"> ${Math.round(
                    forecastDay.temp.min
                  )}°</span>
                </div>
            </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
//next
function getForecast(coordinates) {
  //console.log(coordinates);
  let apiKey = "25fad9f7e87157d33dde0f82ab269ee8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  //console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}
function search(city) {
  let apiKey = "515c9ddbeb3cda9061acfab71031839e";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}
function showWeather(response) {
  document.querySelector("h1").innerHTML = response.data.name;
  document.querySelector("#desc").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#pressure").innerHTML = response.data.main.pressure;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  let icon = document.querySelector("#icon");
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  celTemp = response.data.main.temp;

  getForecast(response.data.coord);
}
//next
function searchCity(event) {
  event.preventDefault();
  let city = document.querySelector("#search-in").value;
  search(city);
}
let theCity = document.querySelector("#search-form");
theCity.addEventListener("submit", searchCity);
let button = document.querySelector("#s-button");
button.addEventListener("click", searchCity);
//next
function currentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(theLocation);
}
function theLocation(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let apiKey = "0dc40d3d7cda209ca40e77430c74cf57";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

let sbutton = document.querySelector("#c-button");
sbutton.addEventListener("click", currentLocation);

let celTemp = null;

function displayFarTemp(event) {
  event.preventDefault();
  let farTemp = (celTemp * 9) / 5 + 32;
  let tempElement = document.querySelector("#temp");
  tempElement.innerHTML = Math.round(farTemp);
}

let farLink = document.querySelector("#far");
farLink.addEventListener("click", displayFarTemp);

function displayCelTemp(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#temp");
  tempElement.innerHTML = Math.round(celTemp);
}

let celLink = document.querySelector("#cel");
celLink.addEventListener("click", displayCelTemp);

search("Lagos");
