moment().format("L");

function search(city){
    askURL = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&units=metric&appid=8c597b19af9603b4a730899ac64b0a8c";
    fiveday = "https://api.openweathermap.org/data/2.5/forecast?q="+city+"&cnt=5&units=metric&appid=8c597b19af9603b4a730899ac64b0a8c";

    


$.ajax({
        url: askURL,
        method: 'GET'
    }).then(function (response) {
       // console.log(response);
        //console.log(askURL);
        
        //empties divs to clear out previously entered stuff
        $("#currentWeather").empty();
        //get the date from moment
       var date = moment().format('L');

        //h2 city + date + weatherIMG
        var cityPick = $("<h2>").text(response.name);
        var cityDate = cityPick.append(" " + date);
        //var weatherNow = response.weather[0].icon;
        

        //temp
        var tempNow =$("<p>").text("Temperature: " + response.main.temp+"°C");
        //humidity
        var humidity = $("<p>").text("Humidity: " +  response.main.humidity + "%");
        //wind
        var wind = $("<p>").text("Wind Speed: " + response.wind.speed + "Kmph");

        //uses the icon property of the weather object to select the link to the icon
        var weatherNow = $("<img>").attr("src", "https://openweathermap.org/img/wn/"+response.weather[0].icon+".png")
        weatherNow.attr("style", "height: 60px; width: 60px");

        //make a div to stuff everything into
        var mainWthr = $("<div>");

        //put it all together
        mainWthr.append(cityDate,weatherNow,tempNow,humidity,wind);

        $("#currentWeather").html(mainWthr);


        //UV forcast api call

        var lat = response.coord.lat;
        var lon = response.coord.lat;

        var uvURL = "https://api.openweathermap.org/data/2.5/uvi?lat="+lat+"&lon="+lon+"&appid=8c597b19af9603b4a730899ac64b0a8c";

        $.ajax({
            url: uvURL,
            method: 'GET'
        }).then(function (response) {
            $("#uvLight").empty();

            var uvIndex = response.value;

            //this if-else tree decides the color of the UV index number to indicate severity
            if (uvIndex<3) {
                //green
                var uvEl = $("<p>").text("UV Index: ");
                var uvNum = $("<button class='btn bg-success'>").text(response.value);
                uvEl.append(uvNum);
            } else if(uvIndex=>3&&uvIndex<6) {
                //yellow
                var uvEl = $("<p>").text("UV Index: ");
                var uvNum = $("<button class='btn bg-warning'>").text(response.value);
                uvEl.append(uvNum);
            } else{
                //red
                var uvEl = $("<p>").text("UV Index: ");
                var uvNum = $("<button class='btn bg-danger'>").text(response.value);
                uvEl.append(uvNum);
            }
            
            $("#uvLight").html(uvEl);
            console.log("this is the uvel " + uvEl);

        
        });
    
        $.ajax({
            url: fiveday,
            method: 'GET'
        }).then(function (response) {
            //grab the daily weather data, and put it into an array
            var dayArr = response.list;
            $("#5day").empty();

            for (var i = 0; i < dayArr.length; i++) {
                var dailydiv = $("<div class='card shadow-lg text-white bg-primary mx-auto mb-10 p-2' style='width: 8.5rem; height: 11rem;'>");
                
                var date5 = dayArr[i].dt_txt;
                var dateOnly = date.substr(0,10)
                var temp = dayArr[i].main.temp;
                var humidex = dayArr[i].main.humidity;

                var h5date = $("<h5 class='card-title'>").text(dateOnly);
                var dailyTemp = $("<p class='card-text'>").text("Temp: " + temp);
                var dailyHum = $("<p class='card-text'>").text("Humidity: " + humidex);

                var wthIcon = $("<img>").attr("src", "https://openweathermap.org/img/wn/"+dayArr[i].weather[0].icon+".png")

                wthIcon.attr("style", "height: 40px; width: 40px");

                dailydiv.append(date5);
                dailydiv.append(wthIcon);
                dailydiv.append(dailyTemp);
                dailydiv.append(dailyHum);
                $("#daily5").append(dailydiv);
            }



            
        })
            
            

    
    });

    //5day api call 
}

function init(){

}


init();


//run when the user hits the search button.
$("#citySelection").on("click", function(event){
    event.preventDefault();

    var cityList = [];

    var cityText = $("#cityInput").val().trim();

    var listText = $(this).siblings("input").val();
    /*console.log(this); //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    console.log(listText);
    console.log("this is the city list ", cityList); */
    cityList.push(listText);
    search(cityText);
    init();

    

});

//event listener for clicking on the list.
$("#searchlist").on("click", function(event){
    event.preventDefault();
    search($(this).text());
})

