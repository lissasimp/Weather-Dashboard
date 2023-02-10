  
function currentWeather() {

      
                // var apiKey = "76dd56a7c869514402bbcfd7dbd7cbb7";
               
                $.ajax({
    
                    url: "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=76dd56a7c869514402bbcfd7dbd7cbb7",
                    method: "GET",
                }).then(function(response) {
                        console.log(response);
                        console.log(city)
                       
                    });
};

// This function handles events where a movie button is clicked
$("#search-button").on("click", function(event) {
event.preventDefault();

// This line grabs the input from the textbox
var city = $("#search-input").val().trim();
     
// Clear out the value in the input field
$("#search-input").val("")

// Adding a click event listener to all elements with a class of "search-button"
 $(document).on("click", ".btn search-button", currentWeather);

});
                
          
         
