

const openWeatherAPI = "http://api.openweathermap.org/data/2.5/weather?q="
const openWeatherOneCallAPI = "https://api.openweathermap.org/data/2.5/onecall?"
// openWeatherForecastAPI is paid only
// const openWeatherForecastAPI = "https://api.openweathermap.org/data/2.5/forecast/daily?q="
const excludeString = "&exclude=minutely,hourly,alerts"
const weatherUnits = "&units=imperial"
const apiKey = "&appid=47cc7111aeaa92ded720903e4f89338c"
const iconURL = "http://openweathermap.org/img/wn/"

const testIcon="http://openweathermap.org/img/wn/10d@2x.png"
// ***********************************************
// APIkey username vk
// ***********************************************
function getWeatherData() { 
  searchCity = document.getElementById('searchcity').value;
  // Get current weather conditions
  // and the lat long of the indicated city

  fetch(
    openWeatherAPI +
    searchCity +
    weatherUnits +
    apiKey

  ).then(function (resp) { 
    return resp.json();

  }).then(function (data) { 
    // extract longitude and latitude from first call
    var longitude = data.coord.lon;
    var latitude = data.coord.lat;
    // then use OneCallAPI for everything else
    fetch(openWeatherOneCallAPI +
      "&lat=" + latitude +
      "&lon=" + longitude +
      weatherUnits +
      excludeString +
      apiKey

    ).then(function (resp2) {
      return resp2.json();

    }).then(function (data) {
      //now we have all our data and can start to display
      console.log(data);
      var searchCity = document.getElementById('searchcity').value;
      //  selected city
      var displayCityEl = document.getElementById('display-city');
      displayCityEl.textContent = searchCity;
      //  today's date
      var dateTodayEl = document.getElementById("date-today");
      dateTodayEl.textContent = ` (${today}) `;
      //  weather icon
      var cwIconEl = document.getElementById("current-weather-icon");
      cwIconEl.setAttribute("src", `${iconURL}` + `${data.current.weather[0].icon}.png`);
      //  temperature
      var cTempEl = document.getElementById("current-temp");
      cTempEl.textContent = data.current.temp;
      // humidity
      var cHumidityEl = document.getElementById("current-humidity");
      cHumidityEl.textContent = data.current.humidity;
      // wind speed
      var cWindSpeedEl = document.getElementById("current-wind-speed");
      cWindSpeedEl.textContent = data.current.wind_speed;
      // UV Index
      var cUViEl = document.getElementById("current-uvi");
      cUViEl.textContent = data.current.uvi;

      // build the forecast cards

      for (var i = 1; i <= 1; i++) { 
        // date
        var new_date = moment(today, "MM-DD-YYYY").add(i, 'days').format("MM-DD-YYYY");
        var cardId = `today-plus-` + `${i}`;
        var cardEl = document.getElementById(cardId);
        var cardTitleEl = cardEl.querySelector(".card-date");
        cardTitleEl.textContent = new_date;
        var cardIconEl = cardEl.querySelector(".card-icon");
        cardIconEl.setAttribute("src", `${iconURL}` + `${data.daily[i].weather[0].icon}.png`);
        var cardTempEl = cardEl.querySelector(".card-temp");
        cardTempEl.textContent = data.daily[i].temp.day;
        var cardHumidityEl = cardEl.querySelector(".card-humidity");
        cardHumidityEl.textContent = data.daily[i].humidity;
      }



      //   console.log(`clouds ${data.daily[i].clouds}:`);
      //   console.log(`temp ${data.daily[i].temp.day}:`);
      //   console.log(`humidity ${data.daily[i].humidity}:`);
      //   console.log(`icon is = ${data.daily[i].weather[0].icon}:`);

      // }
    });
  });
}
////////////////////////////////
//       MAIN PROGRAM
////////////////////////////////

let today = moment().format("MM-DD-YYYY")
console.log(`TODAY IS ${today}`);
console.log(`NEXT FIVE DAYS ARE`);



getWeatherData();





// decrementEl.addEventListener('click', function() {
//   if (count > 0) {
//     count--;
//     setCounterText();
//   }
// });
