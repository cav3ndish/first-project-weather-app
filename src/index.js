
function showDateTime(timestamp) {
  let today =  new Date(timestamp);
let days = [
"Sunday",
"Monday",
"Tuesday",
"Wednesday",
"Thursday",
"Friday",
"Saturday"
];
let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "Sepember",
    "October",
    "November",
    "December"
  ];
  let date = today.getDate();
  let year =today.getFullYear();
let currentDay = days[today.getDay()];
let month = months[today.getMonth()];
  
return ` ${currentDay}</br>    ${month}  ${date}  ${year} </br> ${showNextHours(timestamp)}`;}


function showNextHours(timestamp){
  let today =  new Date(timestamp);
  let currentTime = today.getHours();
if (currentTime < 10) {
    currentTime = `0${currentTime}`;
  }
 let currentMinutes = today.getMinutes();
  if (currentMinutes < 10) {
    currentMinutes = `0${currentMinutes}`;}
  return `${currentTime} : ${currentMinutes}`;
}

function showCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#current-city");
 search(cityInput.value);
 }
function infoWeather(response) {

let cityElement =  document.querySelector(".city");
cityElement.innerHTML = response.data.name;          
cityElement.innerHTML = cityElement.innerHTML.trim();
cityElement.innerHTML = cityElement.innerHTML.charAt(0).toUpperCase() +  cityElement.innerHTML.substring(1).toLowerCase();

let tempElement = document.querySelector("#temp");
   tempElement.innerHTML = Math.round(response.data.main.temp);   
   celsiusTemperature = response.data.main.temp;

let humid= document.querySelector( "#humidity");
humid.innerHTML =`Humidity is ${response.data.main.humidity} %`;

 let wind=  document.querySelector("#wind");
wind.innerHTML = `Wind speed is ${Math.round( response.data.wind.speed)} km/h`;

let descript = document.querySelector("#description");
descript.innerHTML = response.data.weather[0].description;
 descript.innerHTML =  descript.innerHTML.charAt(0).toUpperCase() +  descript.innerHTML.substring(1).toLowerCase();
 let dateElement = document.querySelector("#current-date-time");
 dateElement.innerHTML = showDateTime(response.data.dt * 1000);
 let icon = document.querySelector("#icon");
 icon.setAttribute("src", `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
}

function forecast(response){
  
let forecastColumn = document.querySelector("#nextHours");
forecastColumn.innerHTML = null;
let forecast = null;

for (let index = 0; index < 3; index++) {
 forecast = response.data.list[index];
forecastColumn.innerHTML += `<div class="col-4">
                    <div class="temp-icon">
                            <h3>${Math.round(forecast.main.temp)}° <img src= "https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png" alt ="weather icon" /></h3>
                </div>
                </div>
                <div class="col-4">
                   ${showNextHours(forecast.dt*1000)}
                </div>
                <div class="col-4">
                   ${forecast.weather[0].description}
                </div>`
}
}
function nextDays(response)
{
  let nextDaysColumn = document.querySelector("#next-day");
nextDaysColumn.innerHTML = null;
let tomorrow = null;

for (let i = 4; i <= 20; i = i + 8) {
 tomorrow = response.data.list[i];
nextDaysColumn.innerHTML += `  <div class="col-4">
<div class="card temp-icon">
                            <h3>${Math.round(tomorrow.main.temp)}°<img src= "https://openweathermap.org/img/wn/${tomorrow.weather[0].icon}@2x.png" alt="weather icon" /> </h3>
                        </div>
                    </br>
                    ${showDateTime(tomorrow.dt * 1000)}
                   ${tomorrow.weather[0].description}
                </div>`
}
}


function fillBar() {
  var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  var scrolled = (winScroll / height) * 100;
  document.getElementById("bar").style.width = scrolled + "15%";
}
function search(city) {
  let apiKey = "0a0b749fb3632bec51c7fbeb7af687a1";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(infoWeather);

  let apiUrlSecond = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrlSecond).then(forecast);

 let apiUrlThird = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrlThird).then(nextDays);

}

function currentLocation(position) {
  let apiKey = "0a0b749fb3632bec51c7fbeb7af687a1";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
   axios.get(apiUrl).then(infoWeather);
}

function getCurrentCity(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentLocation);
}

function showUnitTempFaren(event) {
 event.preventDefault();
  let tempElement = document.querySelector("#temp");
tempElement.innerHTML = Math.round((celsiusTemperature * 9) / 5 + 32);}

function showUnitTempCelsius(event) {
  event.preventDefault();
 let  tempElement = document.querySelector("#temp");
 tempElement.innerHTML =Math.round( celsiusTemperature);
  }

let celsiusTemperature = null;

let currentCity = document.querySelector("#locationButton");
currentCity.addEventListener("click", getCurrentCity);

let form = document.querySelector("#city-form");
form.addEventListener("submit", showCity);

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", showUnitTempFaren);

let celsiusTemp = document.querySelector("#celsius");
celsiusTemp.addEventListener("click", showUnitTempCelsius);

window.onscroll = function() {fillBar()};




search("paris");