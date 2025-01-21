function showweatherDetails(event) {
    event.preventDefault();
    const city = document.getElementById('city').value;
    const apiKey = '135c9c4b5feecceed2fbfd2922188514';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    // Check if the city input is empty
    if (city.trim() === "") {
        alert("Please enter a city name.");
        return;
    }

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Check if the city name is found in the response.
            if (data.cod !== undefined && data.cod !== 200) {
              alert("City not found. Please check the spelling of the city.");
              return;
            }
            // if code is good, continue
            const weatherInfo = document.getElementById('weatherInfo');
            weatherInfo.innerHTML = `<h2>Weather in ${data.name}</h2>
                                    <p>Temperature: ${data.main.temp} &#8451;</p>
                                    <p>Weather: ${data.weather[0].description}</p>`;
        })
        .catch(error => {
            // Handle any errors in the response.
            console.error('Error:', error);
        });
}

// Add an event listener to the form submit button
const form = document.querySelector('form');
form.addEventListener('submit', showweatherDetails);

// Add an event listener to the city input field.
const cityInput = document.getElementById('city');
cityInput.addEventListener('change', (event) => {
  // Do nothing if city name is empty
  if (!event.target.value.trim()) {
    return;
  }
  // check if the city name is valid
  if (cityInput.value.trim().length <= 2) {
    alert("City name is too short, please input at least 3 characters long");
  }

});

    document.getElementById('weatherForm').addEventListener('submit',showweatherDetails );