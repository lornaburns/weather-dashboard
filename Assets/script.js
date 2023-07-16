document.addEventListener("DOMContentLoaded", function() {
  var searchButton = document.querySelector(".searchButton");
  var inputValue = document.querySelector(".search-bar");

  // get the recentSearchContainer element
  var recentSearchContainer = document.querySelector("#recentSearchContainer");

  // gets search history from localstorage - puts into an array
  var searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];

  // updates the recent search buttons
  function updateRecentSearches(searches) {
    recentSearchContainer.innerHTML = "";

    // creates buttons for each search
    searches.forEach((search, index) => {
      var button = document.createElement("button");
      button.setAttribute("type", "button");
      button.setAttribute("class", "btn btn-secondary btn-block storedcities");
      button.setAttribute("id", `recentSearch${index + 1}`);
      button.textContent = search;
      recentSearchContainer.appendChild(button);
    });
  }

  // handles new search
  function handleSearch(searchQuery) {
    // adds search item to array
    searchHistory.unshift(searchQuery);

    // deletes oldest search result from list of buttons
    if (searchHistory.length > 8) {
      searchHistory.pop();
    }
    // updates search history buttons
    updateRecentSearches(searchHistory);
    // save search to localstorage
    localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
  }
  // recent search buttons can be clicked
  function handleRecentSearch(event) {
    var searchQuery = event.target.textContent;
    inputValue.value = searchQuery;
    handleSearch(searchQuery); 
  }
  // Attach event listener to the search button
  searchButton.addEventListener("click", function(event) {
    event.preventDefault();
    var searchQuery = inputValue.value;
    handleSearch(searchQuery);
   
  })
  // attaches click listener to search button
  recentSearchContainer.addEventListener("click", handleRecentSearch);

  //current data
  var currentDateElement = document.querySelector("#currentDate");
  var currentCity = document.querySelector("#currentCity");
  var currentIcon = document.querySelector("#currentIcon");
  var currentTemp = document.querySelector("#currentTemp");
  var currentWind = document.querySelector("#currentWind");
  var currentHumidity = document.querySelector("#currentHumidity");
  //day one of forecast
  var dayOneDateElement = document.querySelector("#dayOneDate");
  var dayOneIcon = document.querySelector("#dayOneIcon");
  var dayOneTemp = document.querySelector("#dayOneTemp");
  var dayOneWind = document.querySelector("#dayOneWind");
  var dayOneHumidity = document.querySelector("#dayOneHumidity");
  //day two of forecast
  var dayTwoDateElement = document.querySelector("#dayTwoDate");
  var dayTwoIcon = document.querySelector("#dayTwoIcon");
  var dayTwoTemp = document.querySelector("#dayTwoTemp");
  var dayTwoWind = document.querySelector("#dayTwoWind");
  var dayTwoHumidity = document.querySelector("#dayTwoHumidity");
  //day three of forecast
  var dayThreeDateElement = document.querySelector("#dayThreeDate");
  var dayThreeIcon = document.querySelector("#dayThreeIcon");
  var dayThreeTemp = document.querySelector("#dayThreeTemp");
  var dayThreeWind = document.querySelector("#dayThreeWind");
  var dayThreeHumidity = document.querySelector("#dayThreeHumidity");
  //day four of forecast
  var dayFourDateElement = document.querySelector("#dayFourDate");
  var dayFourIcon = document.querySelector("#dayFourIcon");
  var dayFourTemp = document.querySelector("#dayFourTemp");
  var dayFourWind = document.querySelector("#dayFourWind");
  var dayFourHumidity = document.querySelector("#dayFourHumidity");
  //day five of forecast
  var dayFiveDateElement = document.querySelector("#dayFiveDate");
  var dayFiveIcon = document.querySelector("#dayFiveIcon");
  var dayFiveTemp = document.querySelector("#dayFiveTemp");
  var dayFiveWind = document.querySelector("#dayFiveWind");
  var dayFiveHumidity = document.querySelector("#dayFiveHumidity");

  //fetches weather data from API
  searchButton.addEventListener("click", function(event) {
    event.preventDefault();
    fetch(
      "https://api.openweathermap.org/data/2.5/forecast?q="+inputValue.value+"&appid=b293f6a65c95155bc87b6dadbf31946c&units=imperial")
      .then(response => response.json())
      .then(data => {
        console.log(data);
        
        //displays icons when search is performed
        var currentDayIcon = document.querySelector("#currentIcon");
        var dayOneIcon = document.querySelector("#dayOneIcon");
        var dayTwoIcon = document.querySelector("#dayTwoIcon");
        var dayThreeIcon = document.querySelector("#dayThreeIcon");
        var dayFourIcon = document.querySelector("#dayFourIcon");
        var dayFiveIcon = document.querySelector("#dayFiveIcon");
        currentDayIcon.classList.remove("hidden");
        dayOneIcon.classList.remove("hidden");
        dayTwoIcon.classList.remove("hidden");
        dayThreeIcon.classList.remove("hidden");
        dayFourIcon.classList.remove("hidden");
        dayFiveIcon.classList.remove("hidden");

        //populates current data
        var nameValue = data.city.name;
        var tempValue = data.list[0].main.temp;
        var windValue = data.list[0].wind.speed;
        var humidityValue = data.list[0].main.humidity;
        var iconValue = data.list[0].weather[0].icon;
        var iconurl = "https://openweathermap.org/img/w/" + iconValue + ".png";
        var currentDate = dayjs().format("M/D/YYYY");

        currentCity.innerHTML = nameValue;
        currentTemp.innerHTML = "Temperature: " + tempValue + " F";
        currentWind.innerHTML = "Wind: " + windValue + " mph";
        currentHumidity.innerHTML = "Humidity: " + humidityValue + " %";
        currentIcon.setAttribute("src", iconurl);
        currentDateElement.innerHTML = "(" + currentDate + ")";

        //populates day one of forecast
        var dayOneTempValue = data.list[1].main.temp;
        var dayOneWindValue = data.list[1].wind.speed;
        var dayOneHumidityValue = data.list[1].main.humidity;
        var dayOneIconValue = data.list[1].weather[0].icon;
        var dayOneIconURL = "https://openweathermap.org/img/w/" + dayOneIconValue + ".png";
        var dayOneDateValue = dayjs().add(1, "day").format("M/D/YYYY");

        dayOneTemp.innerHTML = "Temp: " + dayOneTempValue + " F";
        dayOneWind.innerHTML = "Wind: " + dayOneWindValue + " mph";
        dayOneHumidity.innerHTML = "Humidity: " + dayOneHumidityValue + " %";
        dayOneIcon.setAttribute("src", dayOneIconURL);
        dayOneDateElement.innerHTML = dayOneDateValue;

        //populates day two of forecast
        var dayTwoTempValue = data.list[2].main.temp;
        var dayTwoWindValue = data.list[2].wind.speed;
        var dayTwoHumidityValue = data.list[2].main.humidity;
        var dayTwoIconValue = data.list[2].weather[0].icon;
        var dayTwoIconURL = "https://openweathermap.org/img/w/" + dayTwoIconValue + ".png";
        var dayTwoDateValue = dayjs().add(2, "day").format("M/D/YYYY");

        dayTwoTemp.innerHTML = "Temp: " + dayTwoTempValue + " F";
        dayTwoWind.innerHTML = "Wind: " + dayTwoWindValue + " mph";
        dayTwoHumidity.innerHTML = "Humidity: " + dayTwoHumidityValue + " %";
        dayTwoIcon.setAttribute("src", dayTwoIconURL);
        dayTwoDateElement.innerHTML = dayTwoDateValue;

        //populates day three of forecast
        var dayThreeTempValue = data.list[3].main.temp;
        var dayThreeWindValue = data.list[3].wind.speed;
        var dayThreeHumidityValue = data.list[3].main.humidity;
        var dayThreeIconValue = data.list[3].weather[0].icon;
        var dayThreeIconURL = "https://openweathermap.org/img/w/" + dayThreeIconValue + ".png";
        var dayThreeDateValue = dayjs().add(3, "day").format("M/D/YYYY");

        dayThreeTemp.innerHTML = "Temp: " + dayThreeTempValue + " F";
        dayThreeWind.innerHTML = "Wind: " + dayThreeWindValue + " mph";
        dayThreeHumidity.innerHTML = "Humidity: " + dayThreeHumidityValue + " %";
        dayThreeIcon.setAttribute("src", dayThreeIconURL);
        dayThreeDateElement.innerHTML = dayThreeDateValue;

        //populates day four of forecast
        var dayFourTempValue = data.list[4].main.temp;
        var dayFourWindValue = data.list[4].wind.speed;
        var dayFourHumidityValue = data.list[4].main.humidity;
        var dayFourIconValue = data.list[4].weather[0].icon;
        var dayFourIconURL = "https://openweathermap.org/img/w/" + dayFourIconValue + ".png";
        var dayFourDateValue = dayjs().add(4, "day").format("M/D/YYYY");

        dayFourTemp.innerHTML = "Temp: " + dayFourTempValue + " F";
        dayFourWind.innerHTML = "Wind: " + dayFourWindValue + " mph";
        dayFourHumidity.innerHTML = "Humidity: " + dayFourHumidityValue + " %";
        dayFourIcon.setAttribute("src", dayFourIconURL);
        dayFourDateElement.innerHTML = dayFourDateValue;

        //populates day five of forecast
        var dayFiveTempValue = data.list[5].main.temp;
        var dayFiveWindValue = data.list[5].wind.speed;
        var dayFiveHumidityValue = data.list[5].main.humidity;
        var dayFiveIconValue = data.list[5].weather[0].icon;
        var dayFiveIconURL = "https://openweathermap.org/img/w/" + dayFiveIconValue + ".png";
        var dayFiveDateValue = dayjs().add(5, "day").format("M/D/YYYY");

        dayFiveTemp.innerHTML = "Temp: " + dayFiveTempValue + " F";
        dayFiveWind.innerHTML = "Wind: " + dayFiveWindValue + " mph";
        dayFiveHumidity.innerHTML = "Humidity: " + dayFiveHumidityValue + " %";
        dayFiveIcon.setAttribute("src", dayFiveIconURL);
        dayFiveDateElement.innerHTML = dayFiveDateValue;
      });
  });
});





