const apiKey = "1616e110ee4a4484d5d5b40423e1d5c6";
const searchBar = document.querySelector(".searchBar");
const searchIcon = document.querySelector(".searchIcon");
const weatherPNG = document.querySelector(".weatherPNG");
const temp = document.querySelector(".temp");
const cityLocation = document.querySelector(".location");
const hValue = document.querySelector(".hValue");
const wValue = document.querySelector(".wValue");


function updateLocation(city) {
    cityLocation.textContent = city;
}

function updateHumidity(humidity) {
    hValue.textContent = `${humidity}%`;
}

function updateWindSpeed(speed) {
    wValue.textContent = `${speed} km/h`
}

function updateWeatherPNG(main) {
    if (main === "Clear") {
        weatherPNG.src = "images/clear.png"
    }
    else if (main === "Clouds") {
        weatherPNG.src = "images/clouds.png"
    }
    else if (main === "Drizzle") {
        weatherPNG.src = "images/drizzle.png"
    }
    else if (main === "Mist") {
        weatherPNG.src = "images/mist.png"
    }
    else if (main === "Rain") {
        weatherPNG.src = "images/rain.png"
    }
    else if (main === "Snow") {
        weatherPNG.src = "images/snow.png"
    }
}

async function checkWeather(cityName) {

    try {
        const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

        const response = await fetch(apiURL)
        const data = await response.json();
        if (!response.ok) {
            searchBar.value = "";
            searchBar.placeholder = "Enter a valid Location!";
            return;
        }
        console.log(data);
        temp.textContent = Math.floor(data.main.temp) + "°C";

        updateLocation(data.name);
        updateHumidity(data.main.humidity);
        updateWindSpeed(data.wind.speed);
        updateWeatherPNG(data.weather[0].main)

    }

    catch (error) {
        searchBar.placeholder = "Eror Occured!!";
    }
}

let cityName = "Mumbai";
checkWeather(cityName);

searchIcon.addEventListener("click", () => {
    if (searchBar.value === "") {
        searchBar.placeholder = "Enter Location!";
        return
    }
    cityName = searchBar.value.trim();
    checkWeather(cityName);
})