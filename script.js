$(document).ready(function(){
    
    // add click function to button
    $('#find-city').click(function() {

        var city = $("#city-input").val();

        // AJAX call for current weather
        $.ajax ({
            url: 'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=imperial' + '&appid=1d140af8cbf6d4a0a9813769986f988f',
            method: "GET",
            success: function(data){
                var widget = displayCityInfo(data);

                $("#display-data").text(JSON.stringify(widget));

                $("#city-input").val('');
            }
        });
    });

    // display data parameters 
    function displayCityInfo(data){
        return  data.name + moment().format('MMMM Do YYYY') +
                "Weather: "+ data.weather[0].main +"" +
                "Description: "+ data.weather[0].description +"" +
                "Temperature: "+ data.main.temp +" °F" +
                "Humidity: "+ data.main.humidity +" %" +
                "Wind Speed: "+ data.wind.speed +" mph";
        };
    });

