// Sample data for data visualization (Asset Value in millions IDR)
const sampleData = [
    // Flood data
    { hazard: 'flood', returnPeriod: 25, riskCriteria: 'climate', value: 1250000, impactLevel: 'Low' },
    { hazard: 'flood', returnPeriod: 50, riskCriteria: 'climate', value: 1520000, impactLevel: 'Medium' },
    { hazard: 'flood', returnPeriod: 100, riskCriteria: 'climate', value: 1780000, impactLevel: 'High' },
    { hazard: 'flood', returnPeriod: 250, riskCriteria: 'climate', value: 2100000, impactLevel: 'Very High' },
    { hazard: 'flood', returnPeriod: 25, riskCriteria: 'non-climate', value: 1180000, impactLevel: 'Low' },
    { hazard: 'flood', returnPeriod: 50, riskCriteria: 'non-climate', value: 1450000, impactLevel: 'Medium' },
    { hazard: 'flood', returnPeriod: 100, riskCriteria: 'non-climate', value: 1720000, impactLevel: 'High' },
    { hazard: 'flood', returnPeriod: 250, riskCriteria: 'non-climate', value: 2050000, impactLevel: 'Very High' },

    // Drought data
    { hazard: 'drought', returnPeriod: 25, riskCriteria: 'climate', value: 480000, impactLevel: 'Low' },
    { hazard: 'drought', returnPeriod: 50, riskCriteria: 'climate', value: 350000, impactLevel: 'Medium' },
    { hazard: 'drought', returnPeriod: 100, riskCriteria: 'climate', value: 240000, impactLevel: 'High' },
    { hazard: 'drought', returnPeriod: 250, riskCriteria: 'climate', value: 180000, impactLevel: 'Very High' },
    { hazard: 'drought', returnPeriod: 25, riskCriteria: 'non-climate', value: 450000, impactLevel: 'Low' },
    { hazard: 'drought', returnPeriod: 50, riskCriteria: 'non-climate', value: 320000, impactLevel: 'Medium' },
    { hazard: 'drought', returnPeriod: 100, riskCriteria: 'non-climate', value: 220000, impactLevel: 'High' },
    { hazard: 'drought', returnPeriod: 250, riskCriteria: 'non-climate', value: 150000, impactLevel: 'Very High' },

    // Multi-hazard data (average of flood and drought)
    { hazard: 'multi', returnPeriod: 25, riskCriteria: 'climate', value: 865000, impactLevel: 'Low' },
    { hazard: 'multi', returnPeriod: 50, riskCriteria: 'climate', value: 935000, impactLevel: 'Medium' },
    { hazard: 'multi', returnPeriod: 100, riskCriteria: 'climate', value: 1010000, impactLevel: 'High' },
    { hazard: 'multi', returnPeriod: 250, riskCriteria: 'climate', value: 1140000, impactLevel: 'Very High' },
    { hazard: 'multi', returnPeriod: 25, riskCriteria: 'non-climate', value: 815000, impactLevel: 'Low' },
    { hazard: 'multi', returnPeriod: 50, riskCriteria: 'non-climate', value: 885000, impactLevel: 'Medium' },
    { hazard: 'multi', returnPeriod: 100, riskCriteria: 'non-climate', value: 970000, impactLevel: 'High' },
    { hazard: 'multi', returnPeriod: 250, riskCriteria: 'non-climate', value: 1080000, impactLevel: 'Very High' }
];

// Chart instances
let barChart = null;
let lineChart = null;
let radarChart = null;
let heatmapChart = null;

// Initialize data page
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('barChart')) {
        initDataPage();
    }
});

function initDataPage() {
    // Set up event listeners for filters
    setupFilterListeners();

    // Initial chart render
    updateBarChart();
}

function setupFilterListeners() {
    // Get all checkbox and radio button inputs
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const radioButtons = document.querySelectorAll('input[type="radio"]');

    // Note: Chart updates are now triggered only by the Apply button

    // Select All button
    const selectAllBtn = document.getElementById('selectAllBtn');
    if (selectAllBtn) {
        selectAllBtn.addEventListener('click', () => {
            checkboxes.forEach(checkbox => {
                checkbox.checked = true;
            });
            // Note: Does not automatically update chart
        });
    }

    // Clear All button
    const clearAllBtn = document.getElementById('clearAllBtn');
    if (clearAllBtn) {
        clearAllBtn.addEventListener('click', () => {
            checkboxes.forEach(checkbox => {
                checkbox.checked = false;
            });
            // Note: Does not automatically update chart
        });
    }

    // Apply button
    const applyBtn = document.getElementById('applyBtn');
    if (applyBtn) {
        applyBtn.addEventListener('click', updateBarChart);
    }

    // Export button
    const exportBtn = document.getElementById('exportBtn');
    if (exportBtn) {
        exportBtn.addEventListener('click', exportData);
    }
}

function filterData() {
    // Get selected hazards
    const selectedHazards = Array.from(document.querySelectorAll('input[name="hazard"]:checked')).map(cb => cb.value);
    const selectedReturnPeriods = Array.from(document.querySelectorAll('input[name="returnPeriod"]:checked')).map(cb => parseInt(cb.value));
    const selectedRiskCriteria = Array.from(document.querySelectorAll('input[name="riskCriteria"]:checked')).map(cb => cb.value);

    // If no filters selected, return all data
    if (selectedHazards.length === 0 && selectedReturnPeriods.length === 0 && selectedRiskCriteria.length === 0) {
        return sampleData;
    }

    return sampleData.filter(item => {
        const hazardMatch = selectedHazards.length === 0 || selectedHazards.includes(item.hazard);
        const returnPeriodMatch = selectedReturnPeriods.length === 0 || selectedReturnPeriods.includes(item.returnPeriod);
        const riskMatch = selectedRiskCriteria.length === 0 || selectedRiskCriteria.includes(item.riskCriteria);

        return hazardMatch && returnPeriodMatch && riskMatch;
    });
}

function updateChart() {
    const filteredData = filterData();
    const chartType = document.getElementById('chartType')?.value || 'bar';
    const climateCriteria = document.getElementById('climateFilter')?.value || 'rainfall';

    // Destroy existing chart
    if (dataChart) {
        dataChart.destroy();
    }

    const ctx = document.getElementById('dataChart').getContext('2d');

    // Prepare data for chart
    const chartData = prepareChartData(filteredData, chartType, climateCriteria);

    // Chart configuration
    const config = {
        type: chartType,
        data: chartData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: `Hazard Impact Analysis - ${climateCriteria.charAt(0).toUpperCase() + climateCriteria.slice(1)}`,
                    font: {
                        size: 16,
                        weight: 'bold'
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let label = context.dataset.label || '';
                            if (label) {
                                label += ': ';
                            }
                            label += context.parsed.y;
                            if (climateCriteria === 'rainfall') {
                                label += ' mm';
                            } else if (climateCriteria === 'temperature') {
                                label += ' °C';
                            } else if (climateCriteria === 'wind') {
                                label += ' km/h';
                            }
                            return label;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: getYAxisLabel(climateCriteria)
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Return Period (years)'
                    }
                }
            }
        }
    };

    dataChart = new Chart(ctx, config);

    // Update statistics
    updateStatistics(filteredData);
}

function prepareChartData(filteredData, chartType, climateCriteria) {
    const datasets = [];
    const hazards = [...new Set(filteredData.map(item => item.hazard))];
    const returnPeriods = [...new Set(filteredData.map(item => item.returnPeriod))].sort((a, b) => a - b);

    if (chartType === 'bar' || chartType === 'line') {
        // Group by hazard type
        hazards.forEach(hazard => {
            const hazardData = filteredData.filter(item => item.hazard === hazard);
            const data = returnPeriods.map(period => {
                const item = hazardData.find(d => d.returnPeriod === period);
                return item ? item.value : 0;
            });

        datasets.push({
            label: hazard.charAt(0).toUpperCase() + hazard.slice(1),
            data: data,
            backgroundColor: getHazardColor(hazard, 0.7),
            borderColor: getHazardColor(hazard, 1),
            borderWidth: 2,
            fill: true
        });
        });
    } else if (chartType === 'radar') {
        // Radar chart - show all hazards for a single return period
        const returnPeriod = returnPeriods[0]; // Use first return period
        const periodData = filteredData.filter(item => item.returnPeriod === returnPeriod);

        datasets.push({
            label: `${returnPeriod}-year Return Period`,
            data: hazards.map(hazard => {
                const item = periodData.find(d => d.hazard === hazard);
                return item ? item.value : 0;
            }),
            backgroundColor: 'rgba(249, 115, 22, 0.2)',
            borderColor: 'rgba(249, 115, 22, 1)',
            borderWidth: 2,
            pointBackgroundColor: hazards.map(hazard => getHazardColor(hazard, 1)),
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: hazards.map(hazard => getHazardColor(hazard, 1))
        });
    }

    return {
        labels: chartType === 'radar' ? hazards.map(h => h.charAt(0).toUpperCase() + h.slice(1)) : returnPeriods.map(p => `${p}-year`),
        datasets: datasets
    };
}

function getHazardColor(hazard, opacity = 1) {
    const colors = {
        flood: `rgba(52, 152, 219, ${opacity})`,    // Blue
        drought: `rgba(230, 126, 34, ${opacity})`,  // Orange
        multi: `rgba(250, 204, 21, ${opacity})`     // Yellow
    };
    return colors[hazard] || `rgba(149, 165, 166, ${opacity})`;
}

function getYAxisLabel(criteria) {
    const labels = {
        rainfall: 'Rainfall (mm)',
        temperature: 'Temperature (°C)',
        wind: 'Wind Speed (km/h)'
    };
    return labels[criteria] || criteria;
}

function updateAllCharts() {
    const filteredData = filterData();
    updateBarChart();
    updateLineChart();
    updateRadarChart();
    updateHeatmapChart();
    updateStatistics(filteredData);
}

function updateBarChart() {
    const filteredData = filterData();

    // Destroy existing chart
    if (barChart) {
        barChart.destroy();
    }

    const ctx = document.getElementById('barChart');
    if (!ctx) return;

    const chartData = prepareBarChartData(filteredData);

    const config = {
        type: 'bar',
        data: chartData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'top' },
                title: {
                    display: true,
                    text: 'Hazard Comparison Across Return Periods',
                    font: { size: 14, weight: 'bold' }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `${context.dataset.label}: ${context.parsed.y.toLocaleString()} IDR`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: { display: true, text: 'Asset Value (IDR)' },
                    ticks: {
                        callback: function(value) {
                            return value.toLocaleString();
                        }
                    }
                },
                x: {
                    title: { display: true, text: 'Return Period (years)' }
                }
            }
        }
    };

    barChart = new Chart(ctx, config);
}

function updateLineChart() {
    const filteredData = filterData();

    // Destroy existing chart
    if (lineChart) {
        lineChart.destroy();
    }

    const ctx = document.getElementById('lineChart');
    if (!ctx) return;

    const chartData = prepareLineChartData(filteredData);

    const config = {
        type: 'line',
        data: chartData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'top' },
                title: {
                    display: true,
                    text: 'Climate Trends Across Selected Criteria',
                    font: { size: 14, weight: 'bold' }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `${context.dataset.label}: ${context.parsed.y}`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: { display: true, text: 'Value' }
                },
                x: {
                    title: { display: true, text: 'Return Period (years)' }
                }
            }
        }
    };

    lineChart = new Chart(ctx, config);
}

function updateRadarChart() {
    const filteredData = filterData();

    // Destroy existing chart
    if (radarChart) {
        radarChart.destroy();
    }

    const ctx = document.getElementById('radarChart');
    if (!ctx) return;

    const chartData = prepareRadarChartData(filteredData);

    const config = {
        type: 'radar',
        data: chartData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'top' },
                title: {
                    display: true,
                    text: 'Hazard Profile Across Selected Periods',
                    font: { size: 14, weight: 'bold' }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `${context.dataset.label}: ${context.parsed.r}`;
                        }
                    }
                }
            },
            scales: {
                r: {
                    beginAtZero: true,
                    title: { display: true, text: 'Value' }
                }
            }
        }
    };

    radarChart = new Chart(ctx, config);
}

function updateHeatmapChart() {
    const filteredData = filterData();
    const criteria = document.getElementById('heatmapCriteria')?.value || 'rainfall';

    // Filter data for selected criteria
    const criteriaData = filteredData.filter(item => item.climateCriteria === criteria);

    // Destroy existing chart
    if (heatmapChart) {
        heatmapChart.destroy();
    }

    const ctx = document.getElementById('heatmapChart');
    if (!ctx) return;

    const chartData = prepareHeatmapData(criteriaData, criteria);

    const config = {
        type: 'bar',
        data: chartData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'top' },
                title: {
                    display: true,
                    text: `Impact Heatmap - ${criteria.charAt(0).toUpperCase() + criteria.slice(1)}`,
                    font: { size: 14, weight: 'bold' }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `${context.dataset.label}: ${context.parsed.y}`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: { display: true, text: 'Value' }
                },
                x: {
                    title: { display: true, text: 'Hazard & Return Period' }
                }
            }
        }
    };

    heatmapChart = new Chart(ctx, config);
}

function prepareBarChartData(filteredData) {
    const datasets = [];
    const hazards = [...new Set(filteredData.map(item => item.hazard))];
    const returnPeriods = [...new Set(filteredData.map(item => item.returnPeriod))].sort((a, b) => a - b);

    hazards.forEach(hazard => {
        const hazardData = filteredData.filter(item => item.hazard === hazard);
        const data = returnPeriods.map(period => {
            const periodData = hazardData.filter(d => d.returnPeriod === period);
            if (periodData.length === 0) return 0;
            // Aggregate values across selected climate criteria (average)
            const sum = periodData.reduce((acc, item) => acc + item.value, 0);
            return sum / periodData.length;
        });

        datasets.push({
            label: hazard.charAt(0).toUpperCase() + hazard.slice(1),
            data: data,
            backgroundColor: getHazardColor(hazard, 0.7),
            borderColor: getHazardColor(hazard, 1),
            borderWidth: 2,
            fill: true
        });
    });

    return {
        labels: returnPeriods.map(p => `${p}-year`),
        datasets: datasets
    };
}

function prepareLineChartData(filteredData, criteria) {
    const datasets = [];
    const hazards = [...new Set(filteredData.map(item => item.hazard))];
    const returnPeriods = [...new Set(filteredData.map(item => item.returnPeriod))].sort((a, b) => a - b);

    hazards.forEach(hazard => {
        const hazardData = filteredData.filter(item => item.hazard === hazard);
        const data = returnPeriods.map(period => {
            const item = hazardData.find(d => d.returnPeriod === period);
            return item ? item.value : 0;
        });

        datasets.push({
            label: hazard.charAt(0).toUpperCase() + hazard.slice(1),
            data: data,
            borderColor: getHazardColor(hazard, 1),
            backgroundColor: getHazardColor(hazard, 0.1),
            borderWidth: 2,
            fill: false,
            tension: 0.4
        });
    });

    return {
        labels: returnPeriods.map(p => `${p}-year`),
        datasets: datasets
    };
}

function prepareRadarChartData(filteredData) {
    const datasets = [];
    const hazards = [...new Set(filteredData.map(item => item.hazard))];
    const climateCriteria = [...new Set(filteredData.map(item => item.climateCriteria))];

    climateCriteria.forEach(criteria => {
        const criteriaData = filteredData.filter(item => item.climateCriteria === criteria);
        const data = hazards.map(hazard => {
            const hazardData = criteriaData.filter(d => d.hazard === hazard);
            if (hazardData.length === 0) return 0;
            // Aggregate values across selected return periods (average)
            const sum = hazardData.reduce((acc, item) => acc + item.value, 0);
            return sum / hazardData.length;
        });

        datasets.push({
            label: criteria.charAt(0).toUpperCase() + criteria.slice(1),
            data: data,
            borderColor: getCriteriaColor(criteria),
            backgroundColor: getCriteriaColor(criteria, 0.2),
            borderWidth: 2,
            pointBackgroundColor: getCriteriaColor(criteria),
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: getCriteriaColor(criteria)
        });
    });

    return {
        labels: hazards.map(h => h.charAt(0).toUpperCase() + h.slice(1)),
        datasets: datasets
    };
}

function prepareHeatmapData(filteredData) {
    const datasets = [];
    const hazards = [...new Set(filteredData.map(item => item.hazard))];
    const returnPeriods = [...new Set(filteredData.map(item => item.returnPeriod))].sort((a, b) => a - b);

    returnPeriods.forEach(period => {
        const periodData = filteredData.filter(item => item.returnPeriod === period);
        const data = hazards.map(hazard => {
            const hazardData = periodData.filter(d => d.hazard === hazard);
            if (hazardData.length === 0) return 0;
            // Aggregate values across selected climate criteria (average)
            const sum = hazardData.reduce((acc, item) => acc + item.value, 0);
            return sum / hazardData.length;
        });

        datasets.push({
            label: `${period}-year`,
            data: data,
            backgroundColor: getHeatmapColor(data),
            borderColor: getHeatmapColor(data, 1),
            borderWidth: 1
        });
    });

    return {
        labels: hazards.map(h => h.charAt(0).toUpperCase() + h.slice(1)),
        datasets: datasets
    };
}

function getCriteriaColor(criteria, opacity = 1) {
    const colors = {
        rainfall: `rgba(52, 152, 219, ${opacity})`,    // Blue
        temperature: `rgba(230, 126, 34, ${opacity})`,  // Orange
        wind: `rgba(46, 204, 113, ${opacity})`          // Green
    };
    return colors[criteria] || `rgba(149, 165, 166, ${opacity})`;
}

function getHeatmapColor(values, opacity = 0.7) {
    const max = Math.max(...values);
    const min = Math.min(...values);
    const range = max - min;

    return values.map(value => {
        const intensity = range > 0 ? (value - min) / range : 0.5;
        const r = Math.floor(255 * intensity);
        const g = Math.floor(100 * (1 - intensity));
        const b = Math.floor(50 * (1 - intensity));
        return `rgba(${r}, ${g}, ${b}, ${opacity})`;
    });
}

function updateActiveFiltersCount() {
    const totalCheckboxes = document.querySelectorAll('input[type="checkbox"]').length;
    const checkedCheckboxes = document.querySelectorAll('input[type="checkbox"]:checked').length;
    const activeFiltersEl = document.getElementById('selectedFilters');
    if (activeFiltersEl) {
        activeFiltersEl.textContent = checkedCheckboxes;
    }
}

function updateStatistics(filteredData) {
    if (filteredData.length === 0) {
        document.getElementById('dataPoints').textContent = '0';
        document.getElementById('avgValue').textContent = '0';
        document.getElementById('maxValue').textContent = '0';
        return;
    }

    const values = filteredData.map(item => item.value);
    const avg = values.reduce((sum, val) => sum + val, 0) / values.length;
    const max = Math.max(...values);

    document.getElementById('dataPoints').textContent = filteredData.length;
    document.getElementById('avgValue').textContent = avg.toFixed(1);
    document.getElementById('maxValue').textContent = max.toFixed(1);
}

function updateTable() {
    const filteredData = filterData();
    const tableBody = document.getElementById('dataTableBody');

    if (!tableBody) return;

    tableBody.innerHTML = '';

    filteredData.forEach(item => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${item.hazard.charAt(0).toUpperCase() + item.hazard.slice(1)}</td>
            <td>${item.returnPeriod}-year</td>
            <td>${item.climateCriteria.charAt(0).toUpperCase() + item.climateCriteria.slice(1)}</td>
            <td>${item.value}</td>
            <td><span class="impact-level ${item.impactLevel.toLowerCase().replace(' ', '-')}">${item.impactLevel}</span></td>
        `;

        tableBody.appendChild(row);
    });
}

// Export data functionality
function exportData() {
    const filteredData = filterData();

    if (filteredData.length === 0) {
        alert('No data to export. Please select filters first.');
        return;
    }

    // Create CSV content
    const headers = ['Hazard', 'Return Period', 'Risk Criteria', 'Asset Value (IDR)', 'Impact Level'];
    const csvContent = [
        headers.join(','),
        ...filteredData.map(item => [
            item.hazard,
            item.returnPeriod,
            item.riskCriteria,
            item.value,
            item.impactLevel
        ].join(','))
    ].join('\n');

    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'hazard_data_export.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Add CSS for impact level styling
const style = document.createElement('style');
style.textContent = `
    .impact-level {
        padding: 4px 8px;
        border-radius: 12px;
        font-size: 0.8rem;
        font-weight: 600;
        text-transform: uppercase;
    }
    .impact-level.low { background: #d4edda; color: #155724; }
    .impact-level.medium { background: #fff3cd; color: #856404; }
    .impact-level.high { background: #f8d7da; color: #721c24; }
    .impact-level.very-high { background: #f5c6cb; color: #721c24; }
`;
document.head.appendChild(style);
