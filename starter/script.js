$("#search-input").on("input change", function () {
  if ($(this).val().trim() !== "") {
    $("#search-button").prop("disabled", false);
  } else {
    $("#search-button").prop("disabled", true);
  }
});

var cityHistory = JSON.parse(localStorage.getItem("City")) || [];

function saveDestinations() {
  var city = $("#search-input").val().trim();
  if (cityHistory.includes(city)) {
    return;
  }
  cityHistory.push(city);
  localStorage.setItem("City", JSON.stringify(cityHistory));
}

$("#search-button").on("click", function (e) {
  var city = $("#search-input").val().trim();
  e.preventDefault();
  e.stopPropagation();
  currentWeather();
  saveDestinations();

  var searched = $("<button class = savedCity></button>");
  searched.text(city);
  $(searched).on("click", function () {
    currentWeather();
    forecast();
  });
  $("#hist-buttons").append(searched);

  var apiKey = "76dd56a7c869514402bbcfd7dbd7cbb7";
  $("#today").empty();
  $("#forecast").empty();
  currentWeather();
  forecast();

  function currentWeather() {
    $("#search-input").val("");

    $.ajax({
      url:
        "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=metric&appid=" +
        apiKey,
      method: "GET",
    }).then(function (response) {
      if (city === "") {
        alert("Please try again");
      } else {
        $(".current").empty();
        $(".forecast").empty();

        var currentDiv = $("<div class='current'>");
        var cityName = response.name;
        var date = response.dt;
        var dateString = moment.unix(date).format("DD/MM/YYYY");
        var pOne = $("<h2>").text(cityName + "(" + dateString + ")");
        var iconCode = response.weather[0].icon;
        var iconURL = $("<img>").attr(
          "src",
          "https://openweathermap.org/img/wn/" + iconCode + ".png"
        );
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

        $("#today").append(currentDiv);
      }
    });
  }

  function forecast() {
    var forecast =
      "https://api.openweathermap.org/data/2.5/forecast?q=" +
      city +
      "&units=metric&appid=" +
      apiKey;

    $.ajax({
      url: forecast,
      method: "GET",
    }).then(function (response) {
      var title = $("<h3>").text("5 Day Forecast:");
      var container = $("<div class='container'>");

      var weatherArray = response.list;

      for (var i = 0; i < weatherArray.length; i++) {
        var forecastDiv = $("<div class='forecast'>");

        if (weatherArray[i].dt_txt.split(" ")[1] === "12:00:00") {
          var date = moment(response.list[i].dt_txt.split(" ")[0]).format(
            "DD-MM-YYYY"
          );
          var pdate = $("<p>").text(date);
          var iconCode = response.list[i].weather[0].icon;
          var iconURL = $("<img>").attr(
            "src",
            "https://openweathermap.org/img/wn/" + iconCode + ".png"
          );
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

          container.append(forecastDiv);
        }
      }

      $("#forecast").empty().append(title).append(container);
    });
  }
});
