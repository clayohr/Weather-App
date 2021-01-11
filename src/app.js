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
    document.querySelector("#location").innerHTML = response.data.name;
    document.querySelector("#currentWeather").innerHTML = Math.round(
      response.data.main.temp) + "°";
  }
  
  function search(city) {
    let apiKey = "bdc32e59a57c63fe6750b41980c575b2";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
    axios.get(apiUrl).then(displayWeather);
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