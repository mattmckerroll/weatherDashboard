moment().format("L");

function search(city){
    askURL = "api.openweathermap.org/data/2.5/weather?q="+city+"&units=metric&appid=8c597b19af9603b4a730899ac64b0a8c";
    fiveday = "api.openweathermap.org/data/2.5/forecast/daily?q="+city+"&units=metric&cnt=5&appid=8c597b19af9603b4a730899ac64b0a8c";


$.ajax({
        url: askURL,
        method: 'GET'
    }).then(function (response) {
        console.log(response);
        console.log(askURL);
        
        //empties divs to clear out previously entered stuff
        $("#currentWeather").empty();
        //get the date from moment
       var date = moment().format('L');

        //h3 city + date + weatherIMG
        var cityPick = $("<h2>").text(response.name);
        var cityDate = cityPick.append(" " + date);
        weatherNow = response.weather[0].main;
        

        //temp
        var tempNow =$("<p>").text("Temperature: " + response.main.temp+"°C");
        //humid
        var humidity = $("<p>").text("Humidity: " +  response.main.humidity + "%");
        //wind
        var wind = $("<p>").text("Wind Speed: " + response.wind.speed + "Kmph");
        //UV 
        


        //switchcase for weathericons

        var wthIcon = response.weather[0].main;

        /*
        switch (wthIcon) {
            case "Thunderstorm":
                var weatherIcon = $("<img>").attr("src", "https://openweathermap.org/img/wn/10d@11d.png");
                break;

            case "Drizzle":
                var weatherIcon = $("<img>").attr("src", "https://openweathermap.org/img/wn/10d@09d.png");
                break;
            
            case "Rain":
                var weatherIcon = $("<img>").attr("src", "https://openweathermap.org/img/wn/10d@10d.png");
                break;
            
            case "Snow":
                var weatherIcon = $("<img>").attr("src", "https://openweathermap.org/img/wn/10d@13d");
                break;
            
            case "Clear":
                var weatherIcon = $("<img>").attr("src", "https://openweathermap.org/img/wn/10d@01d.png");
                break;
            
            case "Clouds":
                var weatherIcon = $("<img>").attr("src", "https://openweathermap.org/img/wn/10d@02d.png");

            default:
                var weatherIcon = $("<img>").attr("src", "https://openweathermap.org/img/wn/10d@02d.png");
                break;
        }*/


        //UV forcast api call

        var uvIndex = $("<p>").text("")
    })

    //5day api call 
}

function init(){

}


init();


//run when the user hits the search button.
$("#cityInput").on("click", function(event){
    event.preventDefault();

    var cityList = [];

    var cityText = $("#cityInput").val().trim();

    var listText = $(this).siblings("input").val();
    console.log(this); //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    console.log(listText);
    console.log("this is the city list ", cityList);
    cityList.push(listText);
    search(cityText);
    init();

    

});

//event listener for clicking on the list.
$("#searchlist").on("click", function(event){
    event.preventDefault();
    search($(this).text());
})

