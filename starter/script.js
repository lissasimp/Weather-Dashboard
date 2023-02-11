// This function handles events where a movie button is clicked
$("#search-button").on("click", function (event) {
  event.preventDefault();

  // This line grabs the input from the textbox
  var city = $("#search-input").val().trim();

  // Clear out the value in the input field
  $("#search-input").val("");

  function currentWeather() {
    // var apiKey = "76dd56a7c869514402bbcfd7dbd7cbb7";

    $.ajax({
      url:
        "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=metric&appid=76dd56a7c869514402bbcfd7dbd7cbb7",
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
      var pOne = $("<h1>").text(cityName);

      //Storing the date
    //   var date= moment(response.list[i].dt_txt.split(" ")[0]).format(
    //     "dddd"
    var date = response.dt
    var dateString = moment(date).format("DD/MM/YYYY") //this is displaying 20/1/1970!
    console.log(dateString)
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

      
      
      currentDiv.append(pOne).append(pTwo).append(pThree).append(pFour)

      $("#today").append(currentDiv);
    //   $('#today').attr('src', iconURL); doesn't work?
      
    });
  }
  currentWeather();
});

// // Adding a click event listener to all elements with a class of "search-button"
//  $(document).on("click", ".btn search-button", currentWeather);
