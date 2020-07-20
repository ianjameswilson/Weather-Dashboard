$(document).ready(function(){

    function displayCityInfo() {
        
        var city = $("#city-input").val().trim();
        console.log(city);

        var queryURL = "api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=1d140af8cbf6d4a0a9813769986f988f" 
        console.log(queryURL);

        // Creating an AJAX call for the city being searched
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {

            // Creating a div to hold the city name
            var cityDiv = $("<div class='name'>");

            // Storing the city name
            var cityName = response.name.value;

            // Display the city name
            cityDiv.append(cityName);
            
            // Storing the temperature
            var temperature = response.temperature.value;
            console.log(temperature);

            // Creating an element to have the temperature displayed
            var pOne = $("<p>").text("Temperature: " + temperature);

            // Display the temperature
            cityDiv.append(pOne);

            // Storing the humidity
            var humidity = response.main.humidity.value;
            console.log(humidity);

            // Creating an element to have the humidity displayed
            var pTwo = $("<p>").text("Humidity: " + humidity);

            // Display the humidity
            cityDiv.append(pTwo);

            // Storing the wind speed
            var windSpeed = response.wind.speed.value;
            console.log(windSpeed);

            // Creating an element to have the wind speed displayed
            var pThree = $("<p>").text("Wind Speed: " + windSpeed);

            // Display the wind speed
            cityDiv.append(pThree);
        });
    };

    // This function handles events when submit button is clicked
    $("#find-city").on("click", function(event) {
        event.preventDefault();
        
        // Call displayCityInfo function
        displayCityInfo();
    };    
});
    




    

     