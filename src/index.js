let today =  new Date();
function showDateTime() {
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
let currentTime = today.getHours();
let month = months[today.getMonth()];
if (currentTime < 10) {
    currentTime = `0${currentTime}`;
  }
 let currentMinutes = today.getMinutes();
  if (currentMinutes < 10) {
    currentMinutes = `0${currentMinutes}`;
  }
let dateTime = document.querySelector("#current-date-time");
dateTime.innerHTML = ` ${currentDay}, ${date} of ${month}  ${year} , ${currentTime}:${currentMinutes}`;}
showDateTime(today);

function showCity(event) {
  event.preventDefault();
  let input = document.querySelector("#current-city");
  let output = document.querySelector(".outputCity");
 let city  = ` ${input.value}`;
  output.innerHTML = city;
 output.innerHTML = output.innerHTML.trim();
 output.innerHTML =  output.innerHTML.charAt(0).toUpperCase() +  output.innerHTML.substring(1).toLowerCase();

  search(city);
          }

          function infoWeather(response) {
            document.querySelector(".outputCity").innerHTML = response.data.name;
             let temperature = Math.round(response.data.main.temp);
 let tempCels = document.querySelector("#temp-change");
   tempCels.innerHTML = temperature;      
let humid= document.querySelector( "#humidity");
humid.innerHTML =`Humidity is ${response.data.main.humidity} %`;
 let wind=  document.querySelector("#wind");
wind.innerHTML = `Wind speed is ${Math.round( response.data.wind.speed)} km/h`;
let descript = document.querySelector("#description");
descript.innerHTML = response.data.weather[0].description;
 descript.innerHTML =  descript.innerHTML.charAt(0).toUpperCase() +  descript.innerHTML.substring(1).toLowerCase();
 let icon = document.querySelector("#icon");
 icon.setAttribute("src", `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
}

function search(city) {
  let apiKey = "0a0b749fb3632bec51c7fbeb7af687a1";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(infoWeather);
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
let currentCity = document.querySelector("#locationButton");
currentCity.addEventListener("click", getCurrentCity);



let form = document.querySelector("#city-form");
form.addEventListener("submit", showCity);

search("Rome");

//function showUnitTempFaren(event) {
 // event.preventDefault();
  //let celsiusInput = document.querySelector("#temp-change");
  //let celsius = celsiusInput.innerHTML;
  //celsius = Number(celsius);
//celsiusInput.innerHTML = Math.round((celsius * 9) / 5 + 32);}
//let fahrenheit = document.querySelector("#fahrenheit");
//fahrenheit.addEventListener("click", showUnitTempFaren);

//function showUnitTempCelsius(event) {
  //event.preventDefault();
  //let farenInput = document.querySelector("#temp-change");
   //farenInput.innerHTML = `19`;}
//let celsiusTemp = document.querySelector("#celsius");
//celsiusTemp.addEventListener("click", showUnitTempCelsius);

