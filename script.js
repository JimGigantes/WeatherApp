$(document).ready(function() {
   var coordLat
   var coordLong
   var copyresponse
   var cardTitle = $(".card-title")
   var tempPara = $(".temperature")
   var humidityPara = $(".humidity") 
   var windPara = $(".wind-speed")
   var UVindexPara = $(".UV-Index")
   var card1Header= $("#card1Header")
   var card1Icon = $("#card1Icon")
   var card1Humidity = $("#card1Humidity")
   var card1Temp = $("#card1Temp")
   var card2Header= $("#card2Header")
   var card2Icon = $("#card2Icon")
   var card2Humidity = $("#card2Humidity")
   var card2Temp = $("#card2Temp")
   var card3Header= $("#card3Header")
   var card3Icon = $("#card3Icon")
   var card3Humidity = $("#card3Humidity")
   var card3Temp = $("#card3Temp")
   var card4Header= $("#card4Header")
   var card4Icon = $("#card4Icon")
   var card4Humidity = $("#card4Humidity")
   var card4Temp = $("#card4Temp")
   var card5Header= $("#card5Header")
   var card5Icon = $("#card5Icon")
   var card5Humidity = $("#card5Humidity")
   var card5Temp = $("#card5Temp")
   
   var savedCity = JSON.parse(localStorage.getItem("savedCity"));
      //load the last saved city whatever it is 

     if (savedCity != null){
        runTheWeather(savedCity)
     }

    $("#button-search").on("click", function() {
      var latestCity = $("#input-search").val()
      runTheWeather(latestCity)
    });
    $("#city-List").on("click",".cityLi", function() {
      var latestCity = $(this).text()
      runTheWeather(latestCity)
    });

      function runTheWeather(latestCity){
        
         if ($("#icon1") != null){
            $('img').remove("#icon")
            $('span').removeClass("Low")
            $('span').removeClass("Moderate")
            $('span').removeClass("High")
            $('span').removeClass("VeryHigh")
            $('span').removeClass("Extreme")

            // card1Icon.remove
            // card2Icon.remove("#icon2")
            // card3Icon.remove("#icon3")
            // card4Icon.remove("#icon4")
            // card5Icon.remove("#icon5")
         }
         // This is our API key
         var APIKey = "ed0fb7be4526baf80553f9e14c7ccd5b";
         // Here we are building the URL we need to query the database
         var queryURL = "https://api.openweathermap.org/data/2.5/weather?" +
          "q=" + latestCity + "&appid=" + APIKey;
           $("#city-List").prepend('<li class="list-group-item cityLi">' + latestCity);
            cardTitle.text(latestCity)
        // Here we run our AJAX call to the OpenWeatherMap API
        $.ajax({
          url: queryURL,
          method: "GET"
       })
          // We store all of the retrieved data inside of an object called "response"
         .then(function(response) {
            // Log the resulting object
            copyresponse
            localStorage.setItem("savedCity", JSON.stringify(latestCity));
            // Transfer content to HTML
            var icon = response.weather[0].icon
            cardTitle.append("<img src='http://openweathermap.org/img/wn/" + icon  +"@2x.png'>");
            // Convert the temp to fahrenheit and store the long along with the lat
            var tempF = (response.main.temp - 273.15) * 1.80 + 32;
            coordLong = response.coord.lon
            coordLat = response.coord.lat
            // add temp content to html for temp, humidity, and wind speed
           tempPara.text("Temperature (*F): " + tempF.toFixed(2));
           humidityPara.text("Humidity (%) : " + response.main.humidity);
           windPara.text("Wind Speed (mph): " + response.wind.speed);

                //here I have to set the querryURL up for the UV index
          queryURL = "https://api.openweathermap.org/data/2.5/uvi?lat=" + coordLat + "&lon=" + coordLong + "&appid=" + APIKey;

            $.ajax({
            url: queryURL,
            method: "GET"
            })
            // We store all of the retrieved data inside of an object called "response"
            .then(function(response) {
              // Log the resulting object
              UVindexPara.text(response.value);
              console.log(response.value)
              //set classes for color later on
              if ( response.value < 3 ) {
               
               UVindexPara.addClass('Low')
               } else if ( response.value >= 3  && response.value < 6 ) {
                  UVindexPara.addClass('Moderate')
               }else if ( response.value >= 6  && response.value < 8) {
                  UVindexPara.addClass('High')
               }else if ( response.value >= 8 && response.value < 11  ) {
                  UVindexPara.addClass('VeryHigh')
               } else {
                  UVindexPara.addClass('Extreme')
           }
           //here I get the five day forcast followed by setting all of the HTML objects
           queryURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + coordLat + "&lon=" + coordLong + "&appid=" + APIKey;
          
              

               $.ajax({
                  url: queryURL,
                  method: "GET"
               })
             // We store all of the retrieved data inside of an object called "response"
                .then(function(response) {
                // find the date's value from UTC seconds for the first day/ 5 day forcast card

                     //day 1
                var utcSeconds = response.daily[1].dt;
                var d = new Date(0);
                d.setUTCSeconds(utcSeconds);
                //to trim the response if have to conver it to a string
                var datetext = d.toDateString().slice(0,15)
                ///find the icon temp and humidity
                  var icon =response.daily[1].weather[0].icon
                  var tempF = (response.daily[1].temp.day - 273.15) * 1.80 + 32;
                  var humidity = response.daily[1].humidity
                  // put those objects on the page.
                card1Header.text(datetext)
                card1Icon.append("<img src='http://openweathermap.org/img/wn/" + icon  +"@2x.png' id='icon'>")
                card1Temp.text("Temperature (*F): " + tempF.toFixed(2))
                card1Humidity.text("Humidity : " + humidity + "%")

                     //day 2
                var utcSeconds = response.daily[2].dt;
                var d = new Date(0);
                d.setUTCSeconds(utcSeconds);
                //to trim the response if have to conver it to a string
                var datetext = d.toDateString().slice(0,15)
                ///find the icon temp and humidity
                  var icon =response.daily[2].weather[0].icon
                  var tempF = (response.daily[2].temp.day - 273.15) * 1.80 + 32;
                  var humidity = response.daily[2].humidity
                  // put those objects on the page.
                card2Header.text(datetext)
                card2Icon.append("<img src='http://openweathermap.org/img/wn/" + icon  +"@2x.png' id='icon'>")
                card2Temp.text("Temperature (*F): " + tempF.toFixed(2))
                card2Humidity.text("Humidity : " + humidity + "%")

                     //day 3
                var utcSeconds = response.daily[3].dt;
                var d = new Date(0);
                d.setUTCSeconds(utcSeconds);
                //to trim the response if have to conver it to a string
                var datetext = d.toDateString().slice(0,15)
                ///find the icon temp and humidity
                var icon =response.daily[3].weather[0].icon
                var tempF = (response.daily[3].temp.day - 273.15) * 1.80 + 32;
                var humidity = response.daily[3].humidity
                // put those objects on the page.
                card3Header.text(datetext)
                card3Icon.append("<img src='http://openweathermap.org/img/wn/" + icon  +"@2x.png'  id='icon'>")
                card3Temp.text("Temperature (*F): " + tempF.toFixed(2))
                card3Humidity.text("Humidity : " + humidity + "%")
                     
                     //day 4
                var utcSeconds = response.daily[4].dt;
                var d = new Date(0);
                d.setUTCSeconds(utcSeconds);
                //to trim the response if have to conver it to a string
                var datetext = d.toDateString().slice(0,15)
                ///find the icon temp and humidity
                var icon =response.daily[4].weather[0].icon
                var tempF = (response.daily[4].temp.day - 273.15) * 1.80 + 32;
                var humidity = response.daily[4].humidity
                // put those objects on the page.
                card4Header.text(datetext)
                card4Icon.append("<img src='http://openweathermap.org/img/wn/" + icon  +"@2x.png'  id='icon'>")
                card4Temp.text("Temperature (*F): " + tempF.toFixed(2))
                card4Humidity.text("Humidity : " + humidity + "%")

                    //day 5
                var utcSeconds = response.daily[5].dt;
                var d = new Date(0);
                d.setUTCSeconds(utcSeconds);
                //to trim the response if have to conver it to a string
                var datetext = d.toDateString().slice(0,15)
                ///find the icon temp and humidity
                var icon =response.daily[5].weather[0].icon
                var tempF = (response.daily[5].temp.day - 273.15) * 1.80 + 32;
                var humidity = response.daily[5].humidity
                // put those objects on the page.
                card5Header.text(datetext)
                card5Icon.append("<img src='http://openweathermap.org/img/wn/" + icon  +"@2x.png'  id='icon'>")
                card5Temp.text("Temperature (*F): " + tempF.toFixed(2))
                card5Humidity.text("Humidity : " + humidity + "%")
                });

            });
         });
      }
 });

