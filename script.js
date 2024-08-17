document.addEventListener('DOMContentLoaded', function() {
    // Simulated initial data (replace with actual data source)
    const data = {
        ph: [7.2, 7.4, 7.3, 7.5],
        turbidity: [5, 7, 6, 8],
        temperature: [22, 23, 21, 24],
        lastUpdated: '2024-08-17 14:30',
        updates: [
            'pH level stable for the last 24 hours',
            'Turbidity slightly increased due to recent rainfall',
            'Temperature within optimal range'
        ],
        risks: [
            'Potential algal bloom if turbidity increases further',
            'Regular monitoring required for temperature fluctuations'
        ]
    };

    // Initialize the map
    const map = L.map('map').setView([13.724162, 100.777183], 13); // Coordinates for Bangkok, Thailand

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Add a marker to the map
    const marker = L.marker([13.724162, 100.777183]).addTo(map)
        .bindPopup('<b>บริเวณคลองประเวศบุรีรมย์ เขตลาดกระบัง </b><br>Bangkok, Thailand.')
        .openPopup();

    // Update last updated time
    document.getElementById('last-updated').textContent = data.lastUpdated;

    // Update metrics
    document.getElementById('ph-value').textContent = `Current pH Level: ${data.ph[data.ph.length - 1]}`;
    document.getElementById('turbidity-value').textContent = `Current Turbidity: ${data.turbidity[data.turbidity.length - 1]}`;
    document.getElementById('temperature-value').textContent = `Current Temperature: ${data.temperature[data.temperature.length - 1]}°C`;

    // Update recent updates list
    const updateList = document.getElementById('update-list');
    updateList.innerHTML = data.updates.map(update => `<li>${update}</li>`).join('');

    // Update risks list
    const risksList = document.getElementById('risks-list');
    risksList.innerHTML = data.risks.map(risk => `<li>${risk}</li>`).join('');

    // Create charts using Chart.js with different background colors
    const phCtx = document.getElementById('ph-chart').getContext('2d');
    const phChart = new Chart(phCtx, {
        type: 'line',
        data: {
            labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4'],
            datasets: [{
                label: 'pH Level',
                data: data.ph,
                borderColor: '#1e88e5',
                backgroundColor: 'rgba(30, 136, 229, 0.2)', // Light blue background
                fill: true
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: false,
                    min: 0,
                    max: 14
                }
            }
        }
    });

    const turbidityCtx = document.getElementById('turbidity-chart').getContext('2d');
    const turbidityChart = new Chart(turbidityCtx, {
        type: 'bar',
        data: {
            labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4'],
            datasets: [{
                label: 'Turbidity (NTU)',
                data: data.turbidity,
                backgroundColor: 'rgba(255, 193, 7, 0.2)' // Yellow background
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    const temperatureCtx = document.getElementById('temperature-chart').getContext('2d');
    const temperatureChart = new Chart(temperatureCtx, {
        type: 'line',
        data: {
            labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4'],
            datasets: [{
                label: 'Temperature (°C)',
                data: data.temperature,
                borderColor: '#d32f2f',
                backgroundColor: 'rgba(211, 47, 47, 0.2)', // Red background
                fill: true
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: false,
                    min: 0,
                    max: 40
                }
            }
        }
    });

    // Simulate live data updates (for demonstration purposes)
    setInterval(() => {
        const newPH = (Math.random() * 0.5 + 7).toFixed(2);
        const newTurbidity = (Math.random() * 5 + 5).toFixed(1);
        const newTemperature = (Math.random() * 2 + 22).toFixed(1);

        data.ph.push(newPH);
        data.turbidity.push(newTurbidity);
        data.temperature.push(newTemperature);

        phChart.data.labels.push(`Day ${data.ph.length}`);
        turbidityChart.data.labels.push(`Day ${data.turbidity.length}`);
        temperatureChart.data.labels.push(`Day ${data.temperature.length}`);

        phChart.data.datasets[0].data.push(newPH);
        turbidityChart.data.datasets[0].data.push(newTurbidity);
        temperatureChart.data.datasets[0].data.push(newTemperature);

        phChart.update();
        turbidityChart.update();
        temperatureChart.update();

        // Update metric values
        document.getElementById('ph-value').textContent = `Current pH Level: ${newPH}`;
        document.getElementById('turbidity-value').textContent = `Current Turbidity: ${newTurbidity}`;
        document.getElementById('temperature-value').textContent = `Current Temperature: ${newTemperature}°C`;
    }, 5000); // Update every 5 seconds (you can adjust this timing)
});
