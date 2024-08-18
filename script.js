document.addEventListener('DOMContentLoaded', function() {
    // Simulated initial data
    const data = {
        ph: [7.2, 7.4, 7.3, 7.5],
        turbidity: [5, 7, 6, 8],
        temperature: [22, 23, 21, 24],
        tds: [300, 320, 310, 330],
        dissolvedOxygen: [7.0, 6.9, 7.1, 7.2], // Added initial data for Dissolved Oxygen
        humidity: [65, 66, 64, 63], // Added initial data for Humidity
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
const map = L.map('map').setView([13.730160, 100.777804], 13); // Coordinates for Bangkok, Thailand

// Add OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Define marker locations
const locations = [
    { coords: [13.828600, 100.548797], popup: '<b>คลองเปรมประชากร เขตลาดพร้าว</b><br>กรุงเทพมหานคร ประเทศไทย' },
    { coords: [13.794666, 100.565810], popup: '<b>คลองบางซื่อ เขตจตุจักร</b><br>กรุงเทพมหานคร ประเทศไทย' }, 
    { coords: [13.798559, 100.640130], popup: '<b>คลองตานัง เขตบึงกุ่ม</b><br>กรุงเทพมหานคร ประเทศไทย' },
    { coords: [13.856233, 100.568729], popup: '<b>คลองบางบัว เขตบางเขน</b><br>กรุงเทพมหานคร ประเทศไทย' },
    { coords: [13.923485, 100.634873], popup: '<b>คลองสอง เขตสายไหม</b><br>กรุงเทพมหานคร ประเทศไทย' },
    { coords: [13.764588, 100.622650], popup: '<b>คลองแสนแสบ เขตวังทองหลาง</b><br>กรุงเทพมหานคร ประเทศไทย' },
    { coords: [13.749279, 100.516927], popup: '<b>คลองผดุงกรุงเกษม เขตพระนคร</b><br>กรุงเทพมหานคร ประเทศไทย' }, 
    { coords: [13.793768, 100.500374], popup: '<b>คลองบางพลัด เขตบางพลัด</b><br>กรุงเทพมหานคร ประเทศไทย' },
    { coords: [13.834838, 100.523349], popup: '<b>คลองบางเขน เขตจัตุจักร</b><br>กรุงเทพมหานคร ประเทศไทย' },
    { coords: [13.678343, 100.494950], popup: '<b>คลองบางปะกอก เขตราษฎร์บูรณะ</b><br>กรุงเทพมหานคร ประเทศไทย' },
    { coords: [13.715582, 100.421109], popup: '<b>คลองบางจาก เขตบางแค</b><br>กรุงเทพมหานคร ประเทศไทย'},    
    { coords: [13.703214, 100.426499], popup: '<b>คลองราชมนตรี เขตภาษีเจริญ</b><br>กรุงเทพมหานคร ประเทศไทย'},
    { coords: [13.702266, 100.429153], popup: '<b>คลองคลองลัด เขตภาษีเจริญ</b><br>กรุงเทพมหานคร ประเทศไทย'},    
    { coords: [13.769270, 100.469937], popup: '<b>คลองบางขุนนนท์ เขตบางกอกน้อย</b><br>กรุงเทพมหานคร ประเทศไทย'},
    { coords: [13.798283, 100.706338], popup: '<b>คลองแสนแสบ เขตมีนบุรี</b><br>กรุงเทพมหานคร ประเทศไทย'},
    { coords: [13.902599, 100.581364], popup: '<b>No data</b><br>กรุงเทพมหานคร ประเทศไทย'},
    { coords: [13.707989, 100.591582], popup: '<b>คลองพระโขนง เขตพระโขนง</b><br>กรุงเทพมหานคร ประเทศไทย'},
    { coords: [13.749180, 100.496303], popup: '<b>รอบคลอง เขตพระนคร</b><br>กรุงเทพมหานคร ประเทศไทย'},
    { coords: [13.882945, 100.689540], popup: '<b>No data</b><br>กรุงเทพมหานคร ประเทศไทย'},
    { coords: [13.835469, 100.709846], popup: '<b>No data</b><br>กรุงเทพมหานคร ประเทศไทย'},
    { coords: [13.748082, 100.709293], popup: '<b>No data</b><br>กรุงเทพมหานคร ประเทศไทย'},
    { coords: [13.691975, 100.652989], popup: '<b>No data</b><br>กรุงเทพมหานคร ประเทศไทย'},
    { coords: [13.724162, 100.777183], popup: '<b>คลองประเวศบุรีรมย์ เขตลาดกระบัง</b><br>กรุงเทพมหานคร ประเทศไทย' },

    ];







// Add markers to the map
locations.forEach(location => {
    L.marker(location.coords).addTo(map)
        .bindPopup(location.popup)
        .openPopup();
});
    // Update last updated time
    document.getElementById('last-updated').textContent = data.lastUpdated;

    // Update metrics
    document.getElementById('ph-value').textContent = `Current pH Level: ${data.ph[data.ph.length - 1]}`;
    document.getElementById('turbidity-value').textContent = `Current Turbidity: ${data.turbidity[data.turbidity.length - 1]}`;
    document.getElementById('temperature-value').textContent = `Current Temperature: ${data.temperature[data.temperature.length - 1]}°C`;
    document.getElementById('tds-value').textContent = `Current TDS Level: ${data.tds[data.tds.length - 1]} ppm`;

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

    const tdsCtx = document.getElementById('tds-chart').getContext('2d');
    const tdsChart = new Chart(tdsCtx, {
        type: 'line',
        data: {
            labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4'],
            datasets: [{
                label: 'TDS Level (ppm)',
                data: data.tds,
                borderColor: '#4caf50',
                backgroundColor: 'rgba(76, 175, 80, 0.2)', // Green background
                fill: true
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: false,
                    min: 0,
                    max: 500 // Adjust as needed
                }
            }
        }
    });

    // Simulate live data updates (for demonstration purposes)
    setInterval(() => {
        const newPH = (Math.random() * 0.5 + 7).toFixed(2);
        const newTurbidity = (Math.random() * 5 + 5).toFixed(1);
        const newTemperature = (Math.random() * 2 + 22).toFixed(1);
        const newTDS = (Math.random() * 50 + 300).toFixed(0);

        data.ph.push(newPH);
        data.turbidity.push(newTurbidity);
        data.temperature.push(newTemperature);
        data.tds.push(newTDS);

        // Update chart labels
        const dayLabel = `Day ${data.ph.length}`;
        phChart.data.labels.push(dayLabel);
        turbidityChart.data.labels.push(dayLabel);
        temperatureChart.data.labels.push(dayLabel);
        tdsChart.data.labels.push(dayLabel);

        // Update chart data
        phChart.data.datasets[0].data.push(newPH);
        turbidityChart.data.datasets[0].data.push(newTurbidity);
        temperatureChart.data.datasets[0].data.push(newTemperature);
        tdsChart.data.datasets[0].data.push(newTDS);

        // Update charts
        phChart.update();
        turbidityChart.update();
        temperatureChart.update();
        tdsChart.update();

        // Update metric values
        document.getElementById('ph-value').textContent = `Current pH Level: ${newPH}`;
        document.getElementById('turbidity-value').textContent = `Current Turbidity: ${newTurbidity}`;
        document.getElementById('temperature-value').textContent = `Current Temperature: ${newTemperature}°C`;
        document.getElementById('tds-value').textContent = `Current TDS Level: ${newTDS} ppm`;
    }, 5000); // Update every 5 seconds (you can adjust this timing)
    const dissolvedOxygenCtx = document.getElementById('dissolved-oxygen-chart').getContext('2d');
    const dissolvedOxygenChart = new Chart(dissolvedOxygenCtx, {
        type: 'line',
        data: {
            labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4'],
            datasets: [{
                label: 'Dissolved Oxygen (mg/L)',
                data: data.dissolvedOxygen,
                borderColor: '#00bcd4',
                backgroundColor: 'rgba(0, 188, 212, 0.2)', // Cyan background
                fill: true
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    min: 0,
                    max: 10
                }
            }
        }
    });

        // Initialize Humidity Chart
    const humidityCtx = document.getElementById('humidity-chart').getContext('2d');
    const humidityChart = new Chart(humidityCtx, {
        type: 'line',
        data: {
            labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4'],
            datasets: [{
                label: 'Humidity (%)',
                data: data.humidity,
                borderColor: '#9c27b0',
                backgroundColor: 'rgba(156, 39, 176, 0.2)', // Purple background
                fill: true
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    min: 0,
                    max: 100
                }
            }
        }
    });

    // Update metric values
    document.getElementById('dissolved-oxygen-value').textContent = `Current Dissolved Oxygen: ${data.dissolvedOxygen[data.dissolvedOxygen.length - 1]} mg/L`;
    document.getElementById('humidity-value').textContent = `Current Humidity: ${data.humidity[data.humidity.length - 1]}%`;

    // Simulate live data updates (for demonstration purposes)
    setInterval(() => {
        const newDissolvedOxygen = (Math.random() * 0.5 + 6.5).toFixed(1);
        const newHumidity = (Math.random() * 2 + 60).toFixed(1);

        data.dissolvedOxygen.push(newDissolvedOxygen);
        data.humidity.push(newHumidity);

        // Update chart labels
        const dayLabel = `Day ${data.ph.length}`;
        dissolvedOxygenChart.data.labels.push(dayLabel);
        humidityChart.data.labels.push(dayLabel);

        // Update chart data
        dissolvedOxygenChart.data.datasets[0].data.push(newDissolvedOxygen);
        humidityChart.data.datasets[0].data.push(newHumidity);

        // Update charts
        dissolvedOxygenChart.update();
        humidityChart.update();

        // Update metric values
        document.getElementById('dissolved-oxygen-value').textContent = `Current Dissolved Oxygen: ${newDissolvedOxygen} mg/L`;
        document.getElementById('humidity-value').textContent = `Current Humidity: ${newHumidity}%`;
    }, 5000); // Update every 5 seconds (you can adjust this timing)
    document.getElementById('district-select').addEventListener('change', function() {
        const selectedDistrict = this.value;
        // Update the metric values based on the selected district
        // You can fetch the data for the selected district and update the DOM elements accordingly
    });
    
});
