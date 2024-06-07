document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const getWeatherButton = document.getElementById('getWeather');
    const logoutButton = document.getElementById('logout');
    const authDiv = document.getElementById('auth');
    const contentDiv = document.getElementById('content');
    const weatherDataContainer = document.getElementById('weatherData');
    const cityInput = document.getElementById('city');

    let token = '';

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        try {
            const response = await fetch('http://localhost:8080/authenticate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            if (response.ok) {
                const data = await response.json();
                token = data.token;
                authDiv.style.display = 'none';
                contentDiv.style.display = 'block';
            } else {
                alert('Login failed');
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    });

    getWeatherButton.addEventListener('click', async () => {
        const city = cityInput.value;
        try {
            const response = await fetch(`http://localhost:8080/api/weather?city=${city}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                const weatherData = await response.json();
                weatherDataContainer.textContent = JSON.stringify(weatherData, null, 2);
            } else {
                alert('Failed to fetch weather data');
                console.error('Failed to fetch weather data:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    });

    logoutButton.addEventListener('click', () => {
        token = '';
        authDiv.style.display = 'block';
        contentDiv.style.display = 'none';
        weatherDataContainer.textContent = '';
    });
});
