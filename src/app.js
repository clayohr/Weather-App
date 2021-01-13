let now = new Date();

let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  
  let day = days[now.getDay()];
  let number = now.getDate();
  let hour = now.getHours();
  let minute = now.getMinutes();
  
  let line = document.querySelector("#currentTime");
  line.innerHTML = `${day} ${hour}:${minute}`;
  
  function displayWeather(response) {
    let icon = document.querySelector("#icon");
    document.querySelector("#location").innerHTML = response.data.name;
    document.querySelector("#currentWeather").innerHTML = `${Math.round(
      response.data.main.temp)}°`;
      document.querySelector("#description").innerHTML = `${response.data.weather[0].description}<br />humidity: ${response.data.main.humidity}%
        <br />wind speed: ${response.data.wind.speed} mph`;
    icon.setAttribute("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png` )

    fTemp = response.data.main.temp;
  }

  function displayForecast(response) {
      console.log(response.data);
      let forecastElement = document.querySelector("#weatherforecast");

      

      forecastElement.innerHTML = ` <div class="row" >
      <div class="col">
          ${response.data.list[6].dt_txt}
      </div>
      <div class="col">
        <img id="icony" src="http://openweathermap.org/img/wn/${response.data.list[6].weather[0].icon}@2x.png" />
      </div>
      <div class="col">
          ${Math.round(response.data.list[6].main.temp)}°
      </div>
  </div>
  <div class="row">
      <div class="col">
        ${response.data.list[14].dt_txt}
      </div>
      <div class="col">
          <img id="icony" src="http://openweathermap.org/img/wn/${response.data.list[14].weather[0].icon}@2x.png" />
      </div>
      <div class="col">
        ${Math.round(response.data.list[14].main.temp)}°
      </div>
  </div>
  <div class="row">
      <div class="col">
        ${response.data.list[22].dt_txt}
      </div>
      <div class="col">
        <img id="icony" src="http://openweathermap.org/img/wn/${response.data.list[22].weather[0].icon}@2x.png" />
      </div>
      <div class="col">
        ${Math.round(response.data.list[22].main.temp)}°
      </div>
  </div>
  <div class="row">
      <div class="col">
        ${response.data.list[30].dt_txt}
      </div>
      <div class="col">
        <img id="icony" src="http://openweathermap.org/img/wn/${response.data.list[30].weather[0].icon}@2x.png" />
      </div>
      <div class="col">
        ${Math.round(response.data.list[30].main.temp)}°
      </div>
  </div>
  <div class="row">
      <div class="col">
        ${response.data.list[38].dt_txt}
      </div>
      <div class="col">
      <img id="icony" src="http://openweathermap.org/img/wn/${response.data.list[38].weather[0].icon}@2x.png" />
      </div>
      <div class="col">
        ${Math.round(response.data.list[38].main.temp)}°
      </div>
  </div>`
  }
  
  function search(city) {
    let apiKey = "bdc32e59a57c63fe6750b41980c575b2";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
    axios.get(apiUrl).then(displayWeather);

    let apiUrl2 = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`;
    axios.get(apiUrl2).then(displayForecast);
  }
  
  function handleSubmit(event) {
    event.preventDefault();
    let city = document.querySelector("#city-search").value;
    search(city);
  }
  
  function searchLocation(position) {
    let apiKey = "bdc32e59a57c63fe6750b41980c575b2";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${
      position.coords.latitude
    }&lon=${position.coords.longitude}&appid=${apiKey}&units=imperial`;
    axios.get(apiUrl).then(displayWeather);
  }
  
  function getLocation(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(searchLocation);
  }
  
  let searchInput = document.querySelector("#search-box");
  searchInput.addEventListener("submit", handleSubmit);
  
  let locationButton = document.querySelector("#location-selector");
  locationButton.addEventListener("click", getLocation);
  
  

function convertTempCelcius(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#currentWeather");
  let celciusTemp = (fTemp - 32)*(5/9);
  tempElement.innerHTML = `${Math.round(celciusTemp)}°`;
}

function convertTempFaren(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#currentWeather");
  tempElement.innerHTML = `${Math.round(fTemp)}°`;

}

let fTemp = null;

let celcius = document.querySelector("#celcius");
celcius.addEventListener("click", convertTempCelcius);

let faren = document.querySelector("#faren");
faren.addEventListener("click", convertTempFaren);
  
  search("city of salem");