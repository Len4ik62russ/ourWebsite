const loginDiv = document.querySelector('.login')
const spinnerDiv = document.querySelector('.spinner')
const navPanelDiv = document.querySelector('.header__nav-list')

// ------------ start weather block
const getWeatherBtn = document.getElementById('get-weather-btn');
const cityInput = document.getElementById('city-input');
const loginBtn = document.getElementById('login-btn');

const weatherImg = document.getElementById('weather-img')
const weatherDiv = document.querySelector('.weather')
const weatherCity = document.getElementById('current-city')
const weatherDescription = document.getElementById('weather-description')
const weatherTemperature = document.getElementById('weather-temperature')

// ------------ end weather block





loginBtn.onclick = async (event) => {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    console.log({username, password});

    try {
        const response = await fetch('http://localhost:8080/authenticate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify( { username, password })
        });

        if (response.ok) {
            const data = await response.json();
            console.log(data);
            const token = data.token;
            localStorage.setItem('token', token)
            loginDiv.style.display = 'none'
            navPanelDiv.style.display = 'flex'

        } else {
            alert('Login failed');
        }
    } catch (error) {
        console.error('Error during login:', error);
    }
}

async function getWeather(city) {
    spinnerDiv.style.display = 'block'
    weatherDiv.style.display = 'none'
    try {
        const response = await fetch(`http://localhost:8080/api/weather?city=${city}`, {
            method: 'GET'
        });

        if (response.ok) {
            const weatherData = await response.json();
            console.log(weatherData);
            weatherCity.innerText = weatherData.name
            weatherImg.src = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`
            const description = weatherData.weather[0].description.split('')
            description[0] = description[0].toUpperCase()
            weatherDescription.innerText = description.join('')
            weatherTemperature.innerText = weatherData.main.temp + '°С'

        } else {
            alert('Failed to fetch weather data');
            console.error('Failed to fetch weather data:', response.statusText);
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
    } finally {
        spinnerDiv.style.display = 'none'
        weatherDiv.style.display = 'block'
    }
}

getWeatherBtn.onclick = async () => {
    const city = cityInput.value;
    await getWeather(city)
}

(async function () {
    let city = ''
    if (localStorage.getItem('token')) {
        loginDiv.style.display = 'none'
        navPanelDiv.style.display = 'flex'
    }


    let watchId = navigator.geolocation.watchPosition(async function (position) {
        console.log(position.coords.latitude, position.coords.longitude); //


        const url = "http://suggestions.dadata.ru/suggestions/api/4_1/rs/geolocate/address";
        const token = "31c788bb53caa03373f447f2b858b749a211888a"; // TODO paste personal token from dadata.ru
        const query = {lat: position.coords.latitude, lon: position.coords.longitude};

        const options = {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "Token " + token
            },
            body: JSON.stringify(query)
        }

        await fetch(url, options)
            .then(response => response.text())
            .then(async result => {
                console.log(JSON.parse(result))
                const location = JSON.parse(result)
                // console.log('location', location.suggestions[0].data.city)
                city = location.suggestions[0].data.city
                await getWeather(location.suggestions[0].data.city)

            })
            .catch(error => console.log("error", error));
        // выводит координаты местоположения пользователя
    }, function(error) {
        console.log(error.message); // выводит сообщение об ошибке
    });
    // await getWeather(city)
    console.log('lol')
})()


