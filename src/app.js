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
  }

  function displayForecast(response) {
      console.log(response.data);
      let forecastElement = document.querySelector("#weatherforecast");

      forecastElement.innerHTML = ` <div class="row" >
      <div class="col">
          Tomorrow
      </div>
      <div class="col">
        <img id="icony" src="http://openweathermap.org/img/wn/${response.data.list[6].weather[0].icon}@2x.png" />
      </div>
      <div class="col">
          ${Math.round(response.data.list[8].main.temp_max)}° / ${Math.round(response.data.list[6].main.temp_min)}°
      </div>
  </div>
  <div class="row">
      <div class="col">
          Monday
      </div>
      <div class="col">
          <img id="icony" src="http://openweathermap.org/img/wn/${response.data.list[2].weather[0].icon}@2x.png" />
      </div>
      <div class="col">
        ${Math.round(response.data.list[2].main.temp_max)}° / ${Math.round(response.data.list[2].main.temp_min)}°
      </div>
  </div>
  <div class="row">
      <div class="col">
          Tuesday
      </div>
      <div class="col">
        <img id="icony" src="http://openweathermap.org/img/wn/${response.data.list[24].weather[0].icon}@2x.png" />
      </div>
      <div class="col">
          49° / 33°
      </div>
  </div>
  <div class="row">
      <div class="col">
          Wednesday
      </div>
      <div class="col">
        <img id="icony" src="http://openweathermap.org/img/wn/${response.data.list[32].weather[0].icon}@2x.png" />
      </div>
      <div class="col">
          46° / 27°
      </div>
  </div>
  <div class="row">
      <div class="col">
          Thursday
      </div>
      <div class="col">
      <img id="icony" src="http://openweathermap.org/img/wn/${response.data.list[39].weather[0].icon}@2x.png" />
      </div>
      <div class="col">
          48° / 32°
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
  
  search("city of salem");