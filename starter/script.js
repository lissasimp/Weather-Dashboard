//disables search button if input field empty
$("#search-input").on("input change", function () {
  if ($(this).val() != "") {
    $("#search-button").prop("disabled", false);
  } else {
    $("#search-button").prop("disabled", true);
  }
});

var cityHistory = JSON.parse(localStorage.getItem("City")) || [];

// Local Storage - Saves Destinations
function saveDestinations() {
  var city = $("#search-input").val().trim();
  if (cityHistory.includes(city)) {
    return;
  }
  cityHistory.push(city);
  localStorage.setItem("City", JSON.stringify(cityHistory));
}
//End Local Storage

//Search button function
$("#search-button").on("click", function (e) {
  var city = $("#search-input").val().trim();
  e.preventDefault();
  e.stopPropagation();
  currentWeather();
  saveDestinations();
  //create buttons with saved data
  var searched = $("<button class = savedCity></button>");
  searched.text(city);
  $(searched).on("click", function () {
    currentWeather();
    forecast();
  });
  $("#history").append(searched);
  // console.log(searched);
  // console.log(city);

  var apiKey = "76dd56a7c869514402bbcfd7dbd7cbb7";
  $("#today").empty();
  $("#forecast").empty();
  currentWeather();
  forecast();

  //current weather call
  function currentWeather() {
    // Clear out the value in the input field
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
        //not working
        alert("Please try again");
      } else {
        $(".current").empty(); //partially empties?
        $(".forecast").empty();
        // console.log(response);
        // console.log(city);

        // Creating a div to hold the weather
        var currentDiv = $("<div class='current'>");

        // Storing the name of the city
        var cityName = response.name;

        // console.log("The city is called: " + cityName);

        //Storing the date
        var date = response.dt;
        var dateString = moment.unix(date).format("DD/MM/YYYY");
        var pOne = $("<h2>").text(cityName + "(" + dateString + ")");
        // console.log(dateString);
        // console.log(date)

        //Storing the image icon
        var iconCode = response.weather[0].icon;
        var iconURL = $("<img>").attr(
          "src",
          "https://openweathermap.org/img/wn/" + iconCode + ".png"
        );
        // console.log(iconCode);
        var image = iconURL;

        // Storing the temp
        var temp = response.main.temp;
        // console.log("Temp: " + temp);
        var pTwo = $("<p>").text("Temp: " + temp + "°C");

        // Storing the wind speed
        var windSpeed = response.wind.speed;
        // console.log("Wind Speed: " + windSpeed);
        var pFour = $("<p>").text("Wind Speed: " + windSpeed + "mph");

        // Storing the humidity
        var humidity = response.main.humidity;
        // console.log("Humidity: " + humidity);
        var pThree = $("<p>").text("Humidty: " + humidity + "%");

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

  // 5 day forecast call
  function forecast() {
    var title = $("<h3>").text("5 Day Forecast:");
    var forecast =
      "https://api.openweathermap.org/data/2.5/forecast?q=" +
      city +
      "&units=metric&appid=" +
      apiKey;

    $.ajax({
      url: forecast,
      method: "GET",
    }).then(function (response) {
      // console.log(response);
    

      //create a variable to store response
      var weatherArray = response.list;
      var container = $("<div class='container'>");
      //loop through the returned array
      for (var i = 0; i < weatherArray.length; i++) {
        //create a div to hold the forecast in
        var forecastDiv = $("<div class='forecast'>");
        //grab the information each day at the time of 12:00:00
        if (weatherArray[i].dt_txt.split(" ")[1] === "12:00:00") {
          //get the date from each day in the forecast
          var date = moment(response.list[i].dt_txt.split(" ")[0]).format(
            "DD-MM-YYYY"
          );
          // console.log("Date: " + date);
          var pdate = $("<p>").text(date);

          var iconCode = response.list[i].weather[0].icon;
          var iconURL = $("<img>").attr(
            "src",
            "https://openweathermap.org/img/wn/" + iconCode + ".png"
          );
          // console.log(iconCode);
          var image = iconURL;

          // Retrieving and storing the temp
          var temp = response.list[i].main.temp;
          // console.log("Temp: " + temp + "°C");
          var ptemp = $("<p>").text("Temp: " + temp + "°C");

          //Retrieving and storing the humidity
          var humidity = response.list[i].main.humidity;
          // console.log("Humidty: " + humidity + "%");
          var phumid = $("<p>").text("Humidity: " + humidity + "%");

          //Retrieving and storing the wind
          var wind = response.list[i].wind.speed;
          // console.log("Wind Speed: " + wind + "mph");
          var pwind = $("<p>").text("Wind Speed: " + wind + "mph");

          //Adding data to forecastDiv
          forecastDiv
            .append(pdate)
            .append(iconURL)
            .append(ptemp)
            .append(phumid)
            .append(pwind);

          //Adding data to forecast

          $("#forecast").append(forecastDiv);
          $("#forecast").append(container);
          $("#forecast").append(title);
          $("#forecast-title").append(title);
        }
      }
    });
  }
});