

// SUBMIT BUTTON CLICK 

$("#search-button").on("click", function (e) {
    e.preventDefault();
    e.stopPropagation();

// END Submit Button Click

$(".form-input weather-search").on("click", function (e) {
    e.preventDefault()
    
})
var chosenCity = $("#search-input").val();
    localStorage.setItem("history", JSON.stringify(chosenCity));



//   function getCities() {
//     localStorage.getItem("history");  
//   }


  // This line grabs the input from the textbox
  var city = $("#search-input").val().trim();

  var apiKey = "76dd56a7c869514402bbcfd7dbd7cbb7";

  // Clear out the value in the input field
  $("#search-input").val("");
  currentWeather();
  forecast();


  function currentWeather() {
    $.ajax({
      url:
        "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=metric&appid=" +
        apiKey,
      method: "GET",
    }).then(function (response) {
      console.log(response);
      console.log(city);
      // Creating a div to hold the movie
      var currentDiv = $("<div class='current'>");

      // Storing the name of the city
      var cityName = response.name;
      
      console.log("The city is called: " + cityName);
      // Creating an element to have the rating displayed
      var pOne = $("<h2>").text(cityName);
    //   saveToStorage(cityName)
      //Storing the date
      //   var date= moment(response.list[i].dt_txt.split(" ")[0]).format(
      //     "dddd"
      var date = response.dt;
      var dateString = moment(date).format("DD/MM/YYYY"); //this is displaying 20/1/1970!
      console.log(dateString);
      // console.log(date)

      //Storing the image icon
      var iconCode = response.weather[0].icon;
      var iconURL = "http://openweathermap.org/img/w/" + iconCode + ".png";
      console.log(iconCode);
      var pTwo = $("<p>").text(iconCode); //doesn't change icon to image when displayed

      // Storing the temp
      var temp = response.main.temp;
      console.log("Temp: " + temp);
      var pTwo = $("<p>").text("Temp: " + temp + "°C");

      // Storing the wind speed
      var windSpeed = response.wind.speed;
      console.log("Wind Speed: " + windSpeed);
      var pFour = $("<p>").text("Wind Speed: " + windSpeed + "mph");

      // Storing the humidity
      var humidity = response.main.humidity;
      console.log("Humidity: " + humidity);
      var pThree = $("<p>").text("Humidty: " + humidity + "%");

      currentDiv.append(pOne).append(pTwo).append(pThree).append(pFour);

      $("#today").append(currentDiv);
      //   $('#today').attr('src', iconURL); doesn't work?
    });
  }

  function forecast() {
    //Need to add in title to the section - at the moment it's not appending in the place I want it
    // var title = $("<h1>").text("5 Day Forecast");
    var forecast =
      "https://api.openweathermap.org/data/2.5/forecast?q=" +
      city +
      "&units=metric&appid=" +
      apiKey;

    $.ajax({
      url: forecast,
      method: "GET",
    }).then(function (response) {
      console.log(response);
      // $("#days").empty();

      //create a variable to store response
      var weatherArray = response.list;

      //loop through the returned array
      for (var i = 0; i < weatherArray.length; i++) {
        var forecastDiv = $("<div class='forecast'>");
        //grab the information each day at the time of 12:00:00
        if (weatherArray[i].dt_txt.split(" ")[1] === "12:00:00") {
          //create a div to hold the forecast in
          

          //getthe date from each day in the forecast
          var date = response.list[i].dt_txt.split(" ")[0];
          console.log("Date: " + date);
          var pdate = $("<p>").text(date);

          // Retrieving and storing the temp
          var temp = response.list[i].main.temp;
          console.log("Temp: " + temp + "°C");
          var ptemp = $("<p>").text("Temp: " + temp + "°C");

          //Retrieving and storing the humidity
          var humidity = response.list[i].main.humidity;
          console.log("Humidty: " + humidity + "%");
          var phumid = $("<p>").text("Humidity: " + humidity + "%");

          //Retrieving and storing the wind
          var wind = response.list[i].wind.speed;
          console.log("Wind Speed: " + wind + "mph");
          var pwind = $("<p>").text("Wind Speed: " + wind + "mph");

          //Adding data to forecastDiv
          forecastDiv.append(pdate).append(ptemp).append(phumid).append(pwind);

          //Adding data to forecast

          $("#forecast").append(forecastDiv);
        }
      }
    });
 
  }
//   $(document).on("click", ".search-button");
//   loadStorage()
});