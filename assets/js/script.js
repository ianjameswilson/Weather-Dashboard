$(document).ready(function() {
    $("#find-city").on("click", function() {
        var city = $("#city-input").val();

        // clear previous searches
        $("#city-input").val("");

        cityWeather(city);
    });
    
    $("#savedCities").on("click", "li", function(){
        cityWeather($(this).text());
    });
    
    function createRow(text) {
        var li = $("<li>").addClass("list-group-item list-group-item-action").text(text);
        $("#savedCities").append(li);
    }

    // AJAX call for current weather
    function cityWeather(city) {
        $.ajax ({
            
            url: "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial" + "&appid=1d140af8cbf6d4a0a9813769986f988f",
            method: "GET",   
            success: function(data){
                // save city searched
                if (searchedCities.indexOf(city) === -1) {
                    searchedCities.push(city);
                    window.localStorage.setItem("history", JSON.stringify(searchedCities));

                    createRow(city);
                }

                // clear previous searches
                $("#current-weather").empty();

                // create html elements to display current weather data
                var cityName = $("<h2>").addClass("card-title").text(data.name + " (" + new Date().toLocaleDateString() + ")");
                var card = $("<div>").addClass("card");
                var temperature = $("<div>").addClass("card-text").text("Temperature: " + data.main.temp + " °F");
                var humidity = $("<div>").addClass("card-text").text("Humidity: " + data.main.humidity + "%");
                var wind = $("<p>").addClass("card-text").text("Wind Speed: " + data.wind.speed + " MPH");
                var cardBody = $("<div>").addClass("card-body");
                var weatherImage = $("<img>").attr("src", "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png");
                console.log(cityName);

                // add to page
                cityName.append(weatherImage);
                cardBody.append(cityName, temperature, humidity, wind);
                card.append(cardBody);
                $("#current-weather").append(card);

                // call additional api endpoints
                cityForecast(city);
                uvIndex(data.coord.lat, data.coord.lon);
            }
        });     
    }


    function cityForecast(city) {
        $.ajax({
            
            url: "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial" + "&appid=1d140af8cbf6d4a0a9813769986f988f",
            method: "GET",      
            success: function(data){
                // overwrite existing content with title and empty row
                $("#forecast").html("<div class=\"row\" id=\"forecast\" style=\"width: 1000px;\"></div>").append("<div class=\"row\">");
                    
                // loop over all forecasts every 3-hours
                for (var i = 0; i < data.list.length; i++) {
                    // only look at forecasts at 3:00pm
                    if (data.list[i].dt_txt.indexOf("15:00:00") !== -1) {
                            
                        // create html elements
                        var column = $("<div>").addClass("col-md-2");
                        var card = $("<div>").addClass("card bg-primary text-white");
                        var body = $("<div>").addClass("card-body p-2");
                        var title = $("<h4>").addClass("card-title").text(new Date(data.list[i].dt_txt).toLocaleDateString());
                        var img = $("<img>").attr("src", "https://openweathermap.org/img/w/" + data.list[i].weather[0].icon + ".png");
                        var p1 = $("<p>").addClass("card-text").text("Temperature: " + data.list[i].main.temp + " °F");
                        var p2 = $("<p>").addClass("card-text").text("Humidity: " + data.list[i].main.humidity + "%");

                        // add to page
                        column.append(card.append(body.append(title, img, p1, p2)));
                        $("#forecast").append(column);
                    }       
                }
            }    
        });
    }
        
        
    function uvIndex(lat, lon) {
        $.ajax ({
             
            url: "https://api.openweathermap.org/data/2.5/uvi?appid=1d140af8cbf6d4a0a9813769986f988f&lat=" + lat + "&lon=" + lon,
            method: "GET",
            success: function(data) {
                var uv = $("<p>").text("UV Index: ");
                var btn = $("<span>").addClass("btn btn-sm").text(data.value);

                // change color to based on uv value
                if (data.value < 3) {
                    btn.addClass("btn-safe");
                }
                else if (data.value < 7) {
                    btn.addClass("btn-warning");
                }
                else {
                    btn.addClass("btn-danger");
                }

                $("#current-weather .card-body").append(uv.append(btn));

                console.log(uvIndex);
            }
        }); 
    }  
    
    
    // List previously searched cities
    var searchedCities = JSON.parse(window.localStorage.getItem("history")) || []; 

    if (searchedCities.length > 0) {
        cityWeather(searchedCities[searchedCities.length-1]);
    }
                        
    for (var i = 0; i < searchedCities.length; i++) {
        createRow(searchedCities[i]);
    } 
});                                                