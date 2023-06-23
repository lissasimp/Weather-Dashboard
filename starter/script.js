var apiKey = "76dd56a7c869514402bbcfd7dbd7cbb7";
var cityHistory = [];

// Display Weather Dashboard Title
$("#dashboard-title").text("Weather Dashboard");

// Disable search button if input field is empty
$("#search-input").on("input change", function () {
  if ($(this).val() !== "") {
    $("#search-button").prop("disabled", false);
  } else {
    $("#search-button").prop("disabled", true);
  }
});

// Local Storage - Save Destinations
function saveDestinations() {
  var city = $("#search-input").val().trim();
  if (cityHistory.includes(city)) {
    return;
  }
  cityHistory.push(city);
  localStorage.setItem("City", JSON.stringify(cityHistory));
}

// Display Saved Cities
function displaySavedCities() {
  $("#history").empty();
  cityHistory.forEach(function (city) {
    var savedCity = $("<button class='savedCity'></button>");
    savedCity.text(city);
    savedCity.on("click", function () {
      var city = $(this).text();
      displayWeather(city);
    });
    $("#history").append(savedCity);
  });
}

// Display Weather Data
function displayWeather(city) {
  currentWeather(city);
  forecast(city);
}

// Search button function
$("#search-button").on("click", function (e) {
  var city = $("#search-input").val().trim();
  if (city !== "") {
    e.preventDefault();
    e.stopPropagation();
    saveDestinations();
    displayWeather(city);
    $("#search-input").val("");
    displaySavedCities(); // Update saved cities display
  }
});

// Enter key press event handler for search input
$("#search-input").on("keypress", function (e) {
  if (e.key === "Enter") {
    var city = $(this).val().trim();
    if (city !== "") {
      e.preventDefault();
      saveDestinations();
      displayWeather(city);
      $(this).val("");
      displaySavedCities(); // Update saved cities display
    }
  }
});

// Current weather call
function currentWeather(city) {
  $.ajax({
    url: "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=" + apiKey,
    method: "GET",
  }).then(function (response) {
    var currentDiv = $("<div class='current'>");
    var cityName = response.name;
    var date = response.dt;
    var dateString = moment.unix(date).format("DD/MM/YYYY");
    var pOne = $("<h2>").text(cityName + " (" + dateString + ")");
    var iconCode = response.weather[0].icon;
    var iconURL = $("<img>").attr("src", "https://openweathermap.org/img/wn/" + iconCode + ".png");
    var image = iconURL;
    var temp = response.main.temp;
    var pTwo = $("<p>").text("Temp: " + temp + "°C");
    var windSpeed = response.wind.speed;
    var pFour = $("<p>").text("Wind Speed: " + windSpeed + "mph");
    var humidity = response.main.humidity;
    var pThree = $("<p>").text("Humidity: " + humidity + "%");

    currentDiv
      .append(pOne)
      .append(image)
      .append(pTwo)
      .append(pThree)
      .append(pFour);

    $("#today").empty().append(currentDiv);
  });
}

// 5 day forecast call
function forecast(city) {
  var forecast = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=metric&appid=" + apiKey;
  var title = $("<h3>").text("5 Day Forecast:");
  $.ajax({
    url: forecast,
    method: "GET",
  }).then(function (response) {
    var weatherArray = response.list;
    var container = $("<div class='container'>");

    $("#forecast").empty().append(title).append(container);

    for (var i = 0; i < weatherArray.length; i++) {
      var forecastDiv = $("<div class='forecast'>");

      if (weatherArray[i].dt_txt.split(" ")[1] === "12:00:00") {
        var date = moment(response.list[i].dt_txt.split(" ")[0]).format("DD-MM-YYYY");
        var pdate = $("<p>").text(date);
        var iconCode = response.list[i].weather[0].icon;
        var iconURL = $("<img>").attr("src", "https://openweathermap.org/img/wn/" + iconCode + ".png");
        var image = iconURL;
        var temp = response.list[i].main.temp;
        var ptemp = $("<p>").text("Temp: " + temp + "°C");
        var humidity = response.list[i].main.humidity;
        var phumid = $("<p>").text("Humidity: " + humidity + "%");
        var wind = response.list[i].wind.speed;
        var pwind = $("<p>").text("Wind Speed: " + wind + "mph");

        forecastDiv
          .append(pdate)
          .append(iconURL)
          .append(ptemp)
          .append(phumid)
          .append(pwind);

        $("#forecast").append(forecastDiv);
      }
    }
  });
}

// On page load, retrieve saved cities from local storage (if any) and display them
$(document).ready(function () {
  cityHistory = JSON.parse(localStorage.getItem("City")) || [];
});

// On page refresh, remove saved cities from local storage
$(window).on("beforeunload", function () {
  localStorage.removeItem("City");
});


