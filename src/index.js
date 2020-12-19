
function showDateTime(timestamp) {
return ` ${showDate(timestamp)} </br> ${showNextHours(timestamp)}`;}

function showDate(timestamp){
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
return ` ${currentDay}</br>    ${month}   ${date}   ${year}`; 
}

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
 fahrenheit.addEventListener("click", showUnitTempFaren);
  celsiusTemp.removeEventListener("click", showUnitTempCelsius);
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

function forecast(response) {
  let forecastColumn = document.querySelector("#nextHours");
  forecastColumn.innerHTML = null;
  let forecast = null;
  for (let index = 0; index < 3; index++) {
    forecast = response.data.list[index];
    forecastColumn.innerHTML += `<div class="col-4">
                    <div class="temp-icon">
                            <h3><span class="temperatureValue">${Math.round(
                              forecast.main.temp
                            )}</span>° <img src= "https://openweathermap.org/img/wn/${
      forecast.weather[0].icon
    }@2x.png" alt ="weather icon" class="tempIcon" /></h3>
                </div>
                </div>
                <div class="col-4 float">
                   ${showNextHours(forecast.dt * 1000)}
                </div>
                <div class="col-4 float">
                  <div>
                  ${forecast.weather[0].description.charAt(0).toUpperCase()}${forecast.weather[0].description.substring(1).toLowerCase()}
                  
                   </div>
                </div>`;
  }
}

function nextDays(response) {
  let nextDaysColumn = document.querySelector("#next-day");
  nextDaysColumn.innerHTML = null;
  let tomorrow = null;
  for (let i = 4; i <= 20; i = i + 8) {
    tomorrow = response.data.list[i];
    nextDaysColumn.innerHTML += `  <div class="col-4">
<div class="card temp-icon">
                            <h3><span class="temperatureValue">${Math.round(
                              tomorrow.main.temp
                            )}</span>°<img src= "https://openweathermap.org/img/wn/${
      tomorrow.weather[0].icon
    }@2x.png" alt="weather icon" class="tempIcon" /> </h3>
                        </div>
                    <div class="letter-space">
                    ${showDate(tomorrow.dt * 1000)}
                    <div>
                    ${tomorrow.weather[0].description.charAt(0).toUpperCase()}${tomorrow.weather[0].description.substring(1).toLowerCase()}
                  
                   </div>
                   </div>
                </div>`;
  }
}

function tryAgain(){
  alert("Narnia is not an option, try again 😀");}

function fillBar() {
  var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  var scrolled = (winScroll / height) * 50;
  document.getElementById("bar").style.width = scrolled + "10%";
}
function search(city) {
  let apiKey = "0a0b749fb3632bec51c7fbeb7af687a1";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(infoWeather).catch(tryAgain);

  let apiUrlSecond = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrlSecond).then(forecast);

 let apiUrlThird = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrlThird).then(nextDays);

}

function currentLocation(position) {
  let apiKey = "0a0b749fb3632bec51c7fbeb7af687a1";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
   axios.get(apiUrl).then(infoWeather);
   fahrenheit.addEventListener("click", showUnitTempFaren);
  celsiusTemp.removeEventListener("click", showUnitTempCelsius);
}

function getCurrentCity(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentLocation);
}

function showUnitTempFaren(event) {
  event.preventDefault();
  let tempElement = document.querySelectorAll(".temperatureValue");
  tempElement.forEach(function (item) {
    let currentTemp = item.innerHTML;
    item.innerHTML = Math.round((currentTemp * 9) / 5 + 32);
  });
  fahrenheit.removeEventListener("click", showUnitTempFaren);
  celsiusTemp.addEventListener("click", showUnitTempCelsius);
}

function showUnitTempCelsius(event) {
  event.preventDefault();
  let tempElement = document.querySelectorAll(".temperatureValue");
  tempElement.forEach(function (item) {
    let currentTemp = item.innerHTML;
    item.innerHTML = Math.round(((currentTemp - 32) * 5) / 9);
  });
  fahrenheit.addEventListener("click", showUnitTempFaren);
  celsiusTemp.removeEventListener("click", showUnitTempCelsius);
}


let celsiusTemperature = null;

let currentCity = document.querySelector("#locationButton");
currentCity.addEventListener("click", getCurrentCity);

let form = document.querySelector("#city-form");
form.addEventListener("submit", showCity);

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", showUnitTempFaren);

let celsiusTemp = document.querySelector("#celsius");

window.onscroll = function() {fillBar()};

search("paris");