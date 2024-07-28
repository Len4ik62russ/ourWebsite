const getWeatherBtn = document.getElementById('get-weather-btn');
const weatherOutput = document.getElementById('weather-output');
const cityInput = document.getElementById('city-input');
const loginBtn = document.getElementById('login-btn');

loginBtn.onclick = async (event) => {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    console.log(username, password);

    try {
        const response = await fetch('http://localhost:8080/authenticate', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        if (response.ok) {
            const data = await response.json();
            console.log(data);
            token = data.token;
        } else {
            alert('Login failed');
        }
    } catch (error) {
        console.error('Error during login:', error);
    }
}



const weather = {"coord":{"lon":-0.1257,"lat":51.5085},"weather":[{"id":803,"main":"Clouds","description":"broken clouds","icon":"04d"}],"base":"stations","main":{"temp":20.34,"feels_like":19.89,"temp_min":18.76,"temp_max":21.72,"pressure":1015,"humidity":56,"sea_level":1015,"grnd_level":1011},"visibility":10000,"wind":{"speed":3.09,"deg":290},"clouds":{"all":79},"dt":1719655509,"sys":{"type":2,"id":2075535,"country":"GB","sunrise":1719632787,"sunset":1719692481},"timezone":3600,"id":2643743,"name":"London","cod":200}



getWeatherBtn.onclick = async () => {
    const city = cityInput.value;
    /* try {
        const response = await fetch(`http://localhost:8080/api/weather?city=${city}`, {
            method: 'GET'
        });

        if (response.ok) {
            const weatherData = await response.json();
            console.log(weatherData);

        } else {
            alert('Failed to fetch weather data');
            console.error('Failed to fetch weather data:', response.statusText);
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
    } */
    try {
        const response = await fetch(`http://localhost:8080/user`, {
            method: 'GET'
        });

        if (response.ok) {
            const weatherData = await response.json();
            console.log(weatherData);

        } else {
            alert('Failed to fetch weather data');
            console.error('Failed to fetch weather data:', response.statusText);
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }

    }
