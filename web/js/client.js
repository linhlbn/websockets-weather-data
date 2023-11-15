const wsUrl = 'ws://localhost:8765';

function connect() {
    const socket = new WebSocket(wsUrl);

    socket.onopen = function(event) {
        console.log("Connected to WebSocket server.");
    };

    socket.onerror = function(event) {
        console.error("WebSocket error observed:", event);
    };

    // On receiving a message, parse it and add a new row to the table
    socket.onmessage = function(event) {
        console.log('New weather data received');
        let weatherData = JSON.parse(event.data);
        addWeatherDataRow(weatherData);
    };

    // If the WebSocket connection is closed, attempt reconnecting
    socket.onclose = function(event) {
        console.log("Disconnected from WebSocket server. Attempting to reconnect...");
        setTimeout(connect, 5000); // Try to reconnect after a 5-second delay
    };
}

// Function to add a new row to the "weatherDataTable"
function addWeatherDataRow(data) {
    const table = document.getElementById('weatherDataTable');
    const row = table.insertRow(-1); // Add a new row at the end of the table
    const cell1 = row.insertCell(0);
    const cell2 = row.insertCell(1);
    const cell3 = row.insertCell(2);
    const cell4 = row.insertCell(3);
    
    cell1.textContent = data.city;
    cell2.textContent = `${data.temperature}°C`;
    cell3.textContent = `${data.humidity}%`;
    cell4.textContent = data.condition;
}

// Initial call to connect to the WebSocket server
connect();
