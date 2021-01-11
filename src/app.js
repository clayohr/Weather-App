let weather = {
    paris: {
      temp: 19.7,
      humidity: 80
    },
    tokyo: {
      temp: 17.3,
      humidity: 50
    },
    lisbon: {
      temp: 30.2,
      humidity: 20
    },
    "san francisco": {
      temp: 20.9,
      humidity: 100
    },
    moscow: {
      temp: -5,
      humidity: 20
    }
  };
  let now = new Date();
  
  //let city = prompt("Enter a city");
  //  city = city.toLowerCase();
  
  //if (weather[city]!==undefined) {
  // let tempy = weather[city].temp;
  // let hum =weather[city].humidity;
  // let celsiusTemp = Math.round(tempy);
  //let fahrenheitTemp = Math.round((tempy*9)/5+32);
  
  //alert (`It is currently ${celsiusTemp}°C (${fahrenheitTemp} °F) in ${city} with a humidity of ${hum} %`);
  //} else{
  //alert("Sorry, we don't know the weather for this city, try going to https://www.google.com/search?q=weather+" + city)
  //};
  
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
  
  let line = document.querySelector("#fuck");
  line.innerHTML = `${day} ${hour}:${minute}`;
  
  function displayWeather(response) {
    document.querySelector("#location").innerHTML = response.data.name;
    document.querySelector("#hone").innerHTML = Math.round(
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
  
  let swag = document.querySelector("#search-box");
  swag.addEventListener("submit", handleSubmit);
  
  let locationButton = document.querySelector("#location-selector");
  locationButton.addEventListener("click", getLocation);
  
  search("city of salem");