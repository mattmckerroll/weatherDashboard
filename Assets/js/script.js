moment().format("L");

function search(city){
    city = city.trim(); //got to get rid of those pesky spaces

    askURL = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&units=metric&appid=8c597b19af9603b4a730899ac64b0a8c";
    fiveday = "https://api.openweathermap.org/data/2.5/forecast?q="+city+"&cnt=5&units=metric&appid=8c597b19af9603b4a730899ac64b0a8c";

    


$.ajax({
        url: askURL,
        method: 'GET'
    }).then(function (response) {

        
        //empties divs to clear out previously entered stuff
        $("#currentWeather").empty();
        //get the date from moment
       var date = moment().format('L');

        //h2 city + date + weatherIMG
        var cityPick = $("<h2>").text(response.name);
        var cityDate = cityPick.append(" " + date);
        //var weatherNow = response.weather[0].icon;
        

        //storing temp
        var tempNow =$("<p>").text("Temperature: " + response.main.temp+"°C");
        //storing humidity
        var humidity = $("<p>").text("Humidity: " +  response.main.humidity + "%");
        //storing wind
        var wind = $("<p>").text("Wind Speed: " + response.wind.speed + "Kmph");

        //uses the icon property of the weather object to select the link to the icon
        var weatherNow = $("<img>").attr("src", "https://openweathermap.org/img/wn/"+response.weather[0].icon+".png")
        weatherNow.attr("style", "height: 60px; width: 60px");

        //make a div to stuff everything into
        var mainWthr = $("<div>");

        //put it all together
        mainWthr.append(cityDate,weatherNow,tempNow,humidity,wind);

        $("#currentWeather").html(mainWthr);


        

        var lat = response.coord.lat;
        var lon = response.coord.lat;

        var uvURL = "https://api.openweathermap.org/data/2.5/uvi?lat="+lat+"&lon="+lon+"&appid=8c597b19af9603b4a730899ac64b0a8c";
    //UV forcast api call
        $.ajax({
            url: uvURL,
            method: 'GET'
        }).then(function (response) {
            $("#uvLight").empty();

            var uvIndex = response.value;

            //this if-else tree decides the color of the UV index number to indicate severity
            if (uvIndex<3) {
                //green = favorable
                var uvEl = $("<p>").text("UV Index: ");
                var uvNum = $("<button class='btn bg-success'>").text(response.value);
                uvEl.append(uvNum);
            } else if(uvIndex=>3&&uvIndex<6) {
                //yellow = moderate
                var uvEl = $("<p>").text("UV Index: ");
                var uvNum = $("<button class='btn bg-warning'>").text(response.value);
                uvEl.append(uvNum);
            } else{
                //red = severe
                var uvEl = $("<p>").text("UV Index: ");
                var uvNum = $("<button class='btn bg-danger'>").text(response.value);
                uvEl.append(uvNum);
            }
            
            $("#uvLight").html(uvEl);
            

        
        });
        
        
        //API call for the 5 day forcast starts here
        $.ajax({
            url: fiveday,
            method: 'GET'
        }).then(function (response) {
            //grab the daily weather data, and put it into an array
            var dayArr = response.list;
            $("#daily5").empty(); //clear the contents incase anything was here

            //loop through each day constructing each div one at a time
            for (var i = 0; i < dayArr.length; i++) {
                var dailydiv = $("<div class='card shadow-lg text-white bg-primary mx-auto mb-10 p-2' style='width: 8.5rem; height: 11rem;'>");
                
                //here i get the date info and use only the YYYY-MM-DD part, trimming the time
                var date5 = dayArr[i].dt_txt;
                var dateOnly = date5.substr(0,10)
                var temp = dayArr[i].main.temp;
                var humidex = dayArr[i].main.humidity;

                //here i stick on the date, temp, and humidity
                var h5date = $("<h5 class='card-title'>").text(dateOnly);
                var dailyTemp = $("<p class='card-text'>").text("Temp: " + temp+"°C");
                var dailyHum = $("<p class='card-text'>").text("Humidity: " + humidex+"%");

                //here the weather icon is identified, since the API returns the code for it
                var wthIcon = $("<img>").attr("src", "https://openweathermap.org/img/wn/"+dayArr[i].weather[0].icon+".png")

                //giving the icon a size.
                wthIcon.attr("style", "height: 40px; width: 40px");

                //this builds the daily forcast divs
                dailydiv.append(h5date);
                dailydiv.append(wthIcon);
                dailydiv.append(dailyTemp);
                dailydiv.append(dailyHum);
                $("#daily5").append(dailydiv);
            }



            
        })
            
            

    
    });

    
}


//runs when the page loads
function init(){

    //get last entered search item and make the correstponding elements for it.
    var prevSearch = JSON.parse(localStorage.getItem("city"));
    
    var searchDiv = $("<button class='border border-dark rounded btn'>").text(prevSearch);
    var searchlistDiv = $("<div>");
    searchlistDiv.append(searchDiv);

    $("#searchlist").prepend(searchlistDiv);
}


init(); 


//run when the user hits the search button.
$("#citySelection").on("click", function(event){
    event.preventDefault(); //prevent default action 

    var cityList = []; //list that will contain the previously searched city.

    var cityText = $("#cityInput").val().trim();

    var listText = $(this).siblings("input").val();
   // console.log($(this).siblings("input").val());

    cityList.push(listText);

    //storing the info in the browser.
    localStorage.setItem("city", JSON.stringify(cityList));

    search(cityText);
    init();

    

});

//event listener for clicking on the list.
$("#searchlist").on("click", ".btn", function(event){
    event.preventDefault();
    search($(this).text());

})

