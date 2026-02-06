// Responsive utilities for device detection and behavior
const breakpoints = {
    mobile: 768,
    tablet: 1024
};

let currentDevice = 'desktop';
let isCalculating = false;

// Debounce utility for performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Get current device type
function getDeviceType() {
    const width = window.innerWidth;
    if (width < breakpoints.mobile) return 'mobile';
    if (width < breakpoints.tablet) return 'tablet';
    return 'desktop';
}

// Update device-specific behaviors
function updateDeviceBehavior() {
    const newDevice = getDeviceType();
    if (newDevice !== currentDevice) {
        currentDevice = newDevice;
        applyDeviceSpecificSettings();
    }
}

// Apply device-specific settings
function applyDeviceSpecificSettings() {
    // Map behavior
    if (typeof map !== 'undefined') {
        if (currentDevice === 'mobile') {
            map.scrollWheelZoom.disable();
            map.dragging.disable();
        } else {
            map.scrollWheelZoom.enable();
            map.dragging.enable();
        }
    }

    // Form behavior
    const inputs = document.querySelectorAll('input, select');
    inputs.forEach(input => {
        if (currentDevice === 'mobile') {
            input.setAttribute('inputmode', 'numeric');
            input.style.fontSize = '16px'; // Prevent zoom on iOS
        } else {
            input.removeAttribute('inputmode');
            input.style.fontSize = '';
        }
    });
}

// Mobile menu handling (if exists)
function initMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    const navToggle = document.querySelector('.nav-toggle'); // Assuming this exists or will be added

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });

        // Close menu on navigation
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (currentDevice === 'mobile') {
                    navMenu.classList.remove('active');
                }
            });
        });
    }
}

// Damage ratio tables (simplified example values)
const damageRatios = {
    flood: {
        housing: 0.3,
        infrastructure: 0.4,
        agriculture: 0.5
    },
    drought: {
        housing: 0.1,
        infrastructure: 0.2,
        agriculture: 0.8
    }
};

// Hazard intensity multipliers based on return period
const hazardMultipliers = {
    25: 1.0,
    50: 1.2,
    100: 1.5,
    250: 2.0
};

// Risk criteria multipliers
const riskMultipliers = {
    climate: { hazard: 1.1, exposure: 1.0, vulnerability: 1.0 },
    'non-climate': { hazard: 1.0, exposure: 1.1, vulnerability: 1.1 }
};

// Indonesian regencies and cities data
const indonesianLocations = {
    // Java Island
    "Kota Bandung": { lat: -6.9175, lng: 107.6191, populationDensity: 150, province: "Jawa Barat" },
    "Kota Jakarta Pusat": { lat: -6.2088, lng: 106.8456, populationDensity: 200, province: "DKI Jakarta" },
    "Kota Surabaya": { lat: -7.2575, lng: 112.7521, populationDensity: 180, province: "Jawa Timur" },
    "Kota Semarang": { lat: -6.9667, lng: 110.4167, populationDensity: 160, province: "Jawa Tengah" },
    "Kota Yogyakarta": { lat: -7.7956, lng: 110.3695, populationDensity: 140, province: "DI Yogyakarta" },
    "Kabupaten Bandung": { lat: -6.9175, lng: 107.6191, populationDensity: 120, province: "Jawa Barat" },
    "Kabupaten Bogor": { lat: -6.5971, lng: 106.8060, populationDensity: 130, province: "Jawa Barat" },
    "Kabupaten Sukabumi": { lat: -6.9181, lng: 106.9267, populationDensity: 110, province: "Jawa Barat" },
    "Kabupaten Cirebon": { lat: -6.7320, lng: 108.5523, populationDensity: 125, province: "Jawa Barat" },
    "Kabupaten Karawang": { lat: -6.3214, lng: 107.3375, populationDensity: 135, province: "Jawa Barat" },
    "Kabupaten Bekasi": { lat: -6.2383, lng: 107.0000, populationDensity: 145, province: "Jawa Barat" },
    "Kabupaten Tangerang": { lat: -6.1781, lng: 106.6300, populationDensity: 155, province: "Banten" },
    "Kabupaten Serang": { lat: -6.1200, lng: 106.1500, populationDensity: 120, province: "Banten" },
    "Kabupaten Cilacap": { lat: -7.7167, lng: 109.0167, populationDensity: 100, province: "Jawa Tengah" },
    "Kabupaten Banyumas": { lat: -7.5167, lng: 109.2833, populationDensity: 105, province: "Jawa Tengah" },
    "Kabupaten Magelang": { lat: -7.4706, lng: 110.2178, populationDensity: 115, province: "Jawa Tengah" },
    "Kabupaten Kediri": { lat: -7.8167, lng: 112.0167, populationDensity: 125, province: "Jawa Timur" },
    "Kabupaten Malang": { lat: -7.9839, lng: 112.6214, populationDensity: 130, province: "Jawa Timur" },
    "Kabupaten Jember": { lat: -8.1667, lng: 113.7000, populationDensity: 110, province: "Jawa Timur" },
    "Kabupaten Batu": { lat: -7.8667, lng: 112.5167, populationDensity: 140, province: "Jawa Timur" },

    // Sumatra Island
    "Kota Medan": { lat: 3.5952, lng: 98.6722, populationDensity: 170, province: "Sumatera Utara" },
    "Kota Palembang": { lat: -2.9761, lng: 104.7754, populationDensity: 160, province: "Sumatera Selatan" },
    "Kota Pekanbaru": { lat: 0.5071, lng: 101.4478, populationDensity: 150, province: "Riau" },
    "Kota Padang": { lat: -0.9471, lng: 100.4172, populationDensity: 140, province: "Sumatera Barat" },
    "Kabupaten Deli Serdang": { lat: 3.4167, lng: 98.6833, populationDensity: 120, province: "Sumatera Utara" },
    "Kabupaten Simalungun": { lat: 2.9167, lng: 98.6833, populationDensity: 95, province: "Sumatera Utara" },
    "Kabupaten Langkat": { lat: 3.7167, lng: 98.2167, populationDensity: 105, province: "Sumatera Utara" },
    "Kabupaten Musi Banyuasin": { lat: -2.4167, lng: 103.7167, populationDensity: 85, province: "Sumatera Selatan" },
    "Kabupaten Ogan Komering Ilir": { lat: -3.3667, lng: 104.6167, populationDensity: 90, province: "Sumatera Selatan" },
    "Kabupaten Banyuasin": { lat: -2.6833, lng: 104.7500, populationDensity: 80, province: "Sumatera Selatan" },

    // Kalimantan Island
    "Kota Pontianak": { lat: -0.0263, lng: 109.3425, populationDensity: 130, province: "Kalimantan Barat" },
    "Kota Banjarmasin": { lat: -3.3167, lng: 114.5833, populationDensity: 140, province: "Kalimantan Selatan" },
    "Kota Samarinda": { lat: -0.5021, lng: 117.1536, populationDensity: 135, province: "Kalimantan Timur" },
    "Kabupaten Kubu Raya": { lat: -0.1167, lng: 109.4167, populationDensity: 100, province: "Kalimantan Barat" },
    "Kabupaten Ketapang": { lat: -1.8500, lng: 109.9667, populationDensity: 85, province: "Kalimantan Barat" },
    "Kabupaten Banjar": { lat: -3.3167, lng: 114.5833, populationDensity: 110, province: "Kalimantan Selatan" },
    "Kabupaten Tanah Laut": { lat: -3.8833, lng: 114.8167, populationDensity: 95, province: "Kalimantan Selatan" },
    "Kabupaten Kutai Kartanegara": { lat: -0.4167, lng: 116.9833, populationDensity: 105, province: "Kalimantan Timur" },
    "Kabupaten Berau": { lat: 2.0833, lng: 117.4667, populationDensity: 75, province: "Kalimantan Timur" },

    // Sulawesi Island
    "Kota Makassar": { lat: -5.1477, lng: 119.4327, populationDensity: 155, province: "Sulawesi Selatan" },
    "Kota Manado": { lat: 1.4748, lng: 124.8421, populationDensity: 140, province: "Sulawesi Utara" },
    "Kota Palu": { lat: -0.9000, lng: 119.8667, populationDensity: 130, province: "Sulawesi Tengah" },
    "Kabupaten Gowa": { lat: -5.3167, lng: 119.5167, populationDensity: 120, province: "Sulawesi Selatan" },
    "Kabupaten Maros": { lat: -5.0167, lng: 119.5667, populationDensity: 115, province: "Sulawesi Selatan" },
    "Kabupaten Bone": { lat: -4.7000, lng: 120.1333, populationDensity: 100, province: "Sulawesi Selatan" },
    "Kabupaten Minahasa": { lat: 1.2833, lng: 124.9167, populationDensity: 110, province: "Sulawesi Utara" },
    "Kabupaten Bolaang Mongondow": { lat: 0.6833, lng: 124.1833, populationDensity: 85, province: "Sulawesi Utara" },

    // Bali and Nusa Tenggara
    "Kota Denpasar": { lat: -8.6705, lng: 115.2126, populationDensity: 145, province: "Bali" },
    "Kabupaten Badung": { lat: -8.5833, lng: 115.1667, populationDensity: 130, province: "Bali" },
    "Kabupaten Gianyar": { lat: -8.4667, lng: 115.2833, populationDensity: 125, province: "Bali" },
    "Kabupaten Tabanan": { lat: -8.5167, lng: 115.1167, populationDensity: 120, province: "Bali" },
    "Kota Mataram": { lat: -8.5833, lng: 116.1167, populationDensity: 135, province: "Nusa Tenggara Barat" },
    "Kabupaten Lombok Barat": { lat: -8.7167, lng: 116.1167, populationDensity: 110, province: "Nusa Tenggara Barat" },
    "Kabupaten Lombok Timur": { lat: -8.5333, lng: 116.5333, populationDensity: 105, province: "Nusa Tenggara Barat" },

    // Papua and Maluku
    "Kota Jayapura": { lat: -2.5333, lng: 140.7167, populationDensity: 120, province: "Papua" },
    "Kota Ambon": { lat: -3.6954, lng: 128.1814, populationDensity: 115, province: "Maluku" },
    "Kabupaten Jayapura": { lat: -2.5833, lng: 140.7167, populationDensity: 90, province: "Papua" },
    "Kabupaten Merauke": { lat: -8.4667, lng: 140.3333, populationDensity: 70, province: "Papua" },
    "Kabupaten Maluku Tengah": { lat: -3.3667, lng: 128.9667, populationDensity: 85, province: "Maluku" }
};

// Default location (Bandung for backward compatibility)
let selectedLocation = "Kota Bandung";

// Configuration for map click behavior
const mapConfig = {
    showClickCircle: false  // Set to false to disable circle marker on map click
};

// Populate location dropdown
function populateLocationDropdown() {
    const locationSelect = document.getElementById('locationSelect');
    if (!locationSelect) return;

    // Clear existing options except the first one
    locationSelect.innerHTML = '<option value="">Select Regency/City</option>';

    // Group locations by province
    const locationsByProvince = {};
    Object.keys(indonesianLocations).forEach(location => {
        const province = indonesianLocations[location].province;
        if (!locationsByProvince[province]) {
            locationsByProvince[province] = [];
        }
        locationsByProvince[province].push(location);
    });

    // Sort provinces
    const sortedProvinces = Object.keys(locationsByProvince).sort();

    // Add options grouped by province
    sortedProvinces.forEach(province => {
        const optgroup = document.createElement('optgroup');
        optgroup.label = province;

        // Sort locations within province
        locationsByProvince[province].sort().forEach(location => {
            const option = document.createElement('option');
            option.value = location;
            option.textContent = location;
            if (location === selectedLocation) {
                option.selected = true;
            }
            optgroup.appendChild(option);
        });

        locationSelect.appendChild(optgroup);
    });
}

// Handle location selection change
function handleLocationChange() {
    const locationSelect = document.getElementById('locationSelect');
    if (!locationSelect) return;

    selectedLocation = locationSelect.value;
    if (selectedLocation && indonesianLocations[selectedLocation]) {
        const locationData = indonesianLocations[selectedLocation];

        // Update map center
        if (map) {
            map.setView([locationData.lat, locationData.lng], 12);
        }

        // Update latitude and longitude inputs with location coordinates
        const latInput = document.getElementById('latitude');
        const lngInput = document.getElementById('longitude');
        if (latInput) latInput.value = locationData.lat.toFixed(6);
        if (lngInput) lngInput.value = locationData.lng.toFixed(6);

        // Automatically estimate population for selected location
        // Using a default affected area of 500m radius (same as map click)
        const defaultRadius = 500; // meters
        const defaultAreaHectares = Math.PI * Math.pow(defaultRadius / 1000, 2) * 100; // Convert to hectares
        const estimatedPopulation = Math.round(defaultAreaHectares * locationData.populationDensity);

        // Update population input with automatic estimate
        const popInput = document.getElementById('population');
        if (popInput) popInput.value = estimatedPopulation;

        // Update area input with default area
        const areaInput = document.getElementById('area');
        if (areaInput) areaInput.value = defaultAreaHectares.toFixed(2);

        // Update step indicator to next step
        updateStepIndicator(2);
    }
}

// Initialize map with responsive settings
let map;
let selectedArea = null;
let hazardLayer = null;
let drawnItems = null;
let drawControl = null;

function initMap() {
    if (document.getElementById('map')) {
        // Get coordinates for selected location
        const locationData = indonesianLocations[selectedLocation] || indonesianLocations["Kota Bandung"];

        map = L.map('map', {
            zoomControl: true,
            zoomControlOptions: {
                position: 'topright'
            }
        }).setView([locationData.lat, locationData.lng], 12);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(map);

        // Initialize drawn items layer
        drawnItems = new L.FeatureGroup();
        map.addLayer(drawnItems);

        // Initialize draw control
        drawControl = new L.Control.Draw({
            edit: {
                featureGroup: drawnItems,
                remove: true
            },
            draw: {
                polygon: {
                    allowIntersection: false,
                    showArea: true,
                    drawError: {
                        color: '#e1e100',
                        message: '<strong>Error:</strong> Shape edges cannot cross!'
                    },
                    shapeOptions: {
                        color: '#3498db',
                        fillColor: '#3498db',
                        fillOpacity: 0.2
                    }
                },
                polyline: false,
                rectangle: {
                    showArea: true,
                    shapeOptions: {
                        color: '#3498db',
                        fillColor: '#3498db',
                        fillOpacity: 0.2
                    }
                },
                circle: {
                    showArea: true,
                    shapeOptions: {
                        color: '#3498db',
                        fillColor: '#3498db',
                        fillOpacity: 0.2
                    }
                },
                marker: false,
                circlemarker: false
            }
        });
        map.addControl(drawControl);

        // Apply initial device settings
        applyDeviceSpecificSettings();

        // Handle map clicks with touch support (for point selection)
        map.on('click', handleMapClick);

        // Handle drawing events
        map.on(L.Draw.Event.CREATED, handleDrawCreated);
        map.on(L.Draw.Event.EDITED, handleDrawEdited);
        map.on(L.Draw.Event.DELETED, handleDrawDeleted);

        // Handle orientation change
        window.addEventListener('orientationchange', () => {
            setTimeout(() => {
                map.invalidateSize();
            }, 100);
        });
    }
}

// Handle map clicks with responsive behavior
function handleMapClick(e) {
    const lat = e.latlng.lat;
    const lng = e.latlng.lng;

    // Update latitude and longitude inputs
    const latInput = document.getElementById('latitude');
    const lngInput = document.getElementById('longitude');
    if (latInput) latInput.value = lat.toFixed(6);
    if (lngInput) lngInput.value = lng.toFixed(6);

    // Estimate population based on area (assuming circular area with radius 500m)
    const radius = 500; // meters
    const areaHectares = Math.PI * Math.pow(radius / 1000, 2) * 100; // Convert to hectares

    // Use location-specific population density
    const locationData = indonesianLocations[selectedLocation];
    const populationDensity = locationData ? locationData.populationDensity : 150; // fallback to Bandung density
    const estimatedPopulation = Math.round(areaHectares * populationDensity);

    // Update population input
    const popInput = document.getElementById('population');
    if (popInput) popInput.value = estimatedPopulation;

    // Update area input
    const areaInput = document.getElementById('area');
    if (areaInput) areaInput.value = areaHectares.toFixed(2);

    // Remove previous area marker/layer
    if (selectedArea) {
        map.removeLayer(selectedArea);
    }

    // Add new area circle only if configured to show click circle
    if (mapConfig.showClickCircle) {
        selectedArea = L.circle([lat, lng], {
            color: '#3498db',
            fillColor: '#3498db',
            fillOpacity: 0.2,
            radius: radius
        }).addTo(map);
    }

    // Update hazard visualization
    updateHazardVisualization();
}

// Handle drawing events
function handleDrawCreated(e) {
    const layer = e.layer;
    drawnItems.addLayer(layer);

    // Calculate area and update form
    const area = calculateDrawnArea(layer);
    updateAreaFromDrawing(area);

    // Update hazard visualization
    updateHazardVisualization();
}

function handleDrawEdited(e) {
    const layers = e.layers;
    layers.eachLayer(function(layer) {
        const area = calculateDrawnArea(layer);
        updateAreaFromDrawing(area);
    });

    // Update hazard visualization
    updateHazardVisualization();
}

function handleDrawDeleted(e) {
    // Clear area input when all drawings are deleted
    const areaInput = document.getElementById('area');
    if (areaInput) areaInput.value = '';

    // Update hazard visualization
    updateHazardVisualization();
}

function calculateDrawnArea(layer) {
    let area = 0;

    if (layer instanceof L.Circle) {
        // Calculate circle area
        const radius = layer.getRadius(); // in meters
        area = Math.PI * Math.pow(radius, 2); // in square meters
    } else if (layer instanceof L.Rectangle || layer instanceof L.Polygon) {
        // Calculate polygon/rectangle area using Turf.js or approximation
        // For simplicity, we'll use a basic approximation
        const latlngs = layer.getLatLngs();
        if (latlngs && latlngs.length > 0) {
            // Simple area calculation for polygons (approximation)
            const bounds = layer.getBounds();
            const width = bounds.getEast() - bounds.getWest();
            const height = bounds.getNorth() - bounds.getSouth();

            // Convert to meters (rough approximation)
            const lat = bounds.getCenter().lat;
            const lng = bounds.getCenter().lng;

            // Rough conversion: 1 degree ≈ 111km at equator
            const widthMeters = width * 111000 * Math.cos(lat * Math.PI / 180);
            const heightMeters = height * 111000;

            area = widthMeters * heightMeters;
        }
    }

    // Convert to hectares
    return area / 10000;
}

function updateAreaFromDrawing(areaHectares) {
    const areaInput = document.getElementById('area');
    if (areaInput) {
        areaInput.value = areaHectares.toFixed(2);
    }

    // Also update population based on drawn area
    const locationData = indonesianLocations[selectedLocation];
    const populationDensity = locationData ? locationData.populationDensity : 150;
    const estimatedPopulation = Math.round(areaHectares * populationDensity);

    const popInput = document.getElementById('population');
    if (popInput) popInput.value = estimatedPopulation;
}

// Update hazard visualization based on selected disaster type
function updateHazardVisualization() {
    const disasterType = document.getElementById('disasterType')?.value;
    if (!disasterType) return;

    // Remove previous hazard layer
    if (hazardLayer) {
        map.removeLayer(hazardLayer);
    }

    let color;
    if (disasterType === 'flood') {
        color = '#3498db';
    } else if (disasterType === 'drought') {
        color = '#e67e22';
    } else if (disasterType === 'multi') {
        color = '#FACC15';
    }

    // Apply hazard styling to drawn items
    drawnItems.eachLayer(function(layer) {
        if (layer instanceof L.Circle || layer instanceof L.Rectangle || layer instanceof L.Polygon) {
            layer.setStyle({
                color: color,
                fillColor: color,
                fillOpacity: 0.3
            });
        }
    });
}

// Form validation and interaction
function initFormValidation() {
    const form = document.getElementById('lossForm');
    if (!form) return;

    const inputs = form.querySelectorAll('input[required], select[required]');
    const submitBtn = form.querySelector('button[type="submit"]');

    // Real-time validation
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            validateInput(input);
            updateSubmitButton();
        });

        input.addEventListener('blur', () => {
            validateInput(input);
        });
    });

    // Special handling for area input to allow comma as decimal separator
    const areaInput = document.getElementById('area');
    if (areaInput) {
        areaInput.addEventListener('input', (e) => {
            // Remove any invalid characters (allow only digits, comma, dot)
            e.target.value = e.target.value.replace(/[^0-9.,]/g, '');
            validateInput(e.target);
            updateSubmitButton();
        });
    }

    // Prevent zoom on mobile input focus
    if (currentDevice === 'mobile') {
        inputs.forEach(input => {
            input.addEventListener('focus', (e) => {
                e.target.scrollIntoView({ behavior: 'smooth', block: 'center' });
            });
        });
    }

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        if (!isCalculating && validateForm()) {
            calculateLoss();
        }
    });
}

function validateInput(input) {
    const value = input.value.trim();
    let isValid;
    let errorMessage = '';

    if (input.tagName === 'SELECT') {
        isValid = value !== '';
        if (!isValid) errorMessage = 'Please select an option';
    } else if (input.type === 'number') {
        isValid = value !== '' && !isNaN(value) && parseFloat(value) >= 0;
        if (!isValid) errorMessage = 'Please enter a valid number';
    } else if (input.id === 'area') {
        // Special validation for area input: allow comma as decimal separator
        const normalizedValue = value.replace(',', '.');
        isValid = value !== '' && !isNaN(normalizedValue) && parseFloat(normalizedValue) > 0;
        if (!isValid) errorMessage = 'Please enter a valid area (use comma or dot as decimal separator)';
    } else {
        isValid = value !== '';
        if (!isValid) errorMessage = 'This field is required';
    }

    input.classList.toggle('invalid', !isValid);
    input.classList.toggle('valid', isValid);

    // Show/hide error message
    const errorElement = document.getElementById(input.id + '-error');
    if (errorElement) {
        errorElement.textContent = isValid ? '' : errorMessage;
        errorElement.style.display = isValid ? 'none' : 'block';
    }

    return isValid;
}

function validateForm() {
    const inputs = document.querySelectorAll('#lossForm input[required], #lossForm select[required]');
    let isValid = true;

    inputs.forEach(input => {
        if (!validateInput(input)) {
            isValid = false;
        }
    });

    return isValid;
}

function updateSubmitButton() {
    const submitBtn = document.querySelector('#lossForm button[type="submit"]');
    if (submitBtn) {
        const isFormValid = validateForm();
        submitBtn.disabled = !isFormValid || isCalculating;
        submitBtn.textContent = isCalculating ? 'Calculating...' : 'Calculate Loss';
    }
}

// Calculate asset value from rice productivity and price
function calculateAssetValue() {
    const riceProductivity = parseFloat(document.getElementById('riceProductivity')?.value) || 0;
    const dryRicePrice = parseFloat(document.getElementById('dryRicePrice')?.value) || 0;
    const assetValue = riceProductivity * dryRicePrice;

    const assetValueInput = document.getElementById('assetValue');
    if (assetValueInput) {
        assetValueInput.value = assetValue > 0 ? formatCurrency(assetValue) : '';
    }
}

// Update hazard visualization when disaster type changes
function initEventListeners() {
    const disasterSelect = document.getElementById('disasterType');
    if (disasterSelect) {
        disasterSelect.addEventListener('change', updateHazardVisualization);
        disasterSelect.addEventListener('change', updateHazardParameterIcon);
    }

    const locationSelect = document.getElementById('locationSelect');
    if (locationSelect) {
        locationSelect.addEventListener('change', handleLocationChange);
    }

    // Add event listeners for asset value calculation
    const riceProductivityInput = document.getElementById('riceProductivity');
    const dryRicePriceInput = document.getElementById('dryRicePrice');
    if (riceProductivityInput) {
        riceProductivityInput.addEventListener('input', calculateAssetValue);
    }
    if (dryRicePriceInput) {
        dryRicePriceInput.addEventListener('input', calculateAssetValue);
    }
}

// Update hazard parameter icon color based on selected disaster type
function updateHazardParameterIcon() {
    const disasterType = document.getElementById('disasterType')?.value;
    const icon = document.querySelector('.input-group i.fas.fa-water');
    if (!icon) return;

    let color;
    if (disasterType === 'flood') {
        color = '#3498db';
    } else if (disasterType === 'drought') {
        color = '#e67e22';
    } else if (disasterType === 'multi') {
        color = '#FACC15';
    } else {
        color = '#F97316'; // default
    }

    icon.style.color = color;
}

function calculateLoss() {
    if (isCalculating) return;

    isCalculating = true;
    updateSubmitButton();

    // Show loading animation
    const loading = document.getElementById('loading');
    const results = document.getElementById('results');

    if (loading) loading.style.display = 'block';
    if (results) results.style.display = 'none';

    // Simulate calculation delay for better UX
    setTimeout(() => {
        const disasterType = document.getElementById('disasterType')?.value;
        const returnPeriod = parseInt(document.getElementById('returnPeriod')?.value);
        const riskCriteria = document.getElementById('riskCriteria')?.value;
        const climateWeight = parseFloat(document.getElementById('climateWeight')?.value);
        const nonClimateWeight = parseFloat(document.getElementById('nonClimateWeight')?.value);
        const population = parseInt(document.getElementById('population')?.value);
        const area = parseFloat(document.getElementById('area')?.value.replace(',', '.'));
        const assetValue = parseCurrency(document.getElementById('assetValue')?.value);

        // Step 1: Calculate Hazard (based on return period and risk criteria)
        let hazard = hazardMultipliers[returnPeriod];
        const riskMult = riskMultipliers[riskCriteria];
        hazard *= riskMult.hazard;

        // Step 2: Calculate Exposure (population, area, asset value influenced by risk criteria)
        let exposure = assetValue * (population / 100000) * (area / 1000); // Simplified exposure formula
        exposure *= riskMult.exposure;

        // Step 3: Calculate Vulnerability (damage ratios influenced by risk criteria)
        let totalLoss = 0;
        const sectorLosses = {};

        if (disasterType === 'multi') {
            // Multi-hazard: average vulnerability of flood and drought
            const floodRatios = damageRatios.flood;
            const droughtRatios = damageRatios.drought;
            Object.keys(floodRatios).forEach(sector => {
                const avgVulnerability = ((floodRatios[sector] + droughtRatios[sector]) / 2) * riskMult.vulnerability;
                // Risk = Hazard × Exposure × Vulnerability
                sectorLosses[sector] = hazard * exposure * avgVulnerability;
                totalLoss += sectorLosses[sector];
            });
        } else {
            const ratios = damageRatios[disasterType];
            Object.keys(ratios).forEach(sector => {
                const sectorVulnerability = ratios[sector] * riskMult.vulnerability;
                // Risk = Hazard × Exposure × Vulnerability
                sectorLosses[sector] = hazard * exposure * sectorVulnerability;
                totalLoss += sectorLosses[sector];
            });
        }

        // Step 4: Apply weighting for climate vs non-climate factors
        // Weight the total loss based on the selected risk criteria
        const selectedWeight = (riskCriteria === 'climate') ? climateWeight : nonClimateWeight;
        totalLoss *= selectedWeight;

        // Hide loading and show results
        if (loading) loading.style.display = 'none';
        if (results) results.style.display = 'block';

        // Update step indicator
        updateStepIndicator(4);

        // Animate results display
        const totalLossEl = document.getElementById('totalLoss');
        const housingLossEl = document.getElementById('housingLoss');
        const infrastructureLossEl = document.getElementById('infrastructureLoss');
        const agricultureLossEl = document.getElementById('agricultureLoss');

        if (totalLossEl) totalLossEl.textContent = formatCurrency(totalLoss);
        if (housingLossEl) housingLossEl.textContent = formatCurrency(sectorLosses.housing || 0);
        if (infrastructureLossEl) infrastructureLossEl.textContent = formatCurrency(sectorLosses.infrastructure || 0);
        if (agricultureLossEl) agricultureLossEl.textContent = formatCurrency(sectorLosses.agriculture || 0);

        // Animate bar charts
        const maxLoss = Math.max(sectorLosses.housing || 0, sectorLosses.infrastructure || 0, sectorLosses.agriculture || 0);
        animateBar('housingBar', (sectorLosses.housing || 0) / maxLoss * 100);
        animateBar('infrastructureBar', (sectorLosses.infrastructure || 0) / maxLoss * 100);
        animateBar('agricultureBar', (sectorLosses.agriculture || 0) / maxLoss * 100);

        isCalculating = false;
        updateSubmitButton();
    }, 1500); // 1.5 second delay for loading animation
}

function animateBar(barId, percentage) {
    const bar = document.getElementById(barId);
    if (bar) {
        bar.style.width = '0%';
        requestAnimationFrame(() => {
            setTimeout(() => {
                bar.style.width = percentage + '%';
            }, 100);
        });
    }
}

function formatCurrency(amount) {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(amount);
}

function parseCurrency(currencyString) {
    // Remove currency symbol and formatting, then parse as float
    return parseFloat(currencyString.replace(/[^\d.,-]/g, '').replace(',', '.')) || 0;
}

function updateStepIndicator(activeStep) {
    // Remove active class from all steps
    for (let i = 1; i <= 4; i++) {
        const stepEl = document.getElementById('step' + i);
        if (stepEl) stepEl.classList.remove('active');
    }
    // Add active class to the current step
    const activeStepEl = document.getElementById('step' + activeStep);
    if (activeStepEl) activeStepEl.classList.add('active');
}

// Cookie Consent Banner Functionality
function initCookieBanner() {
    const banner = document.getElementById('cookie-banner');
    const acceptBtn = document.getElementById('accept-cookies');
    const declineBtn = document.getElementById('decline-cookies');

    if (!banner || !acceptBtn || !declineBtn) return;

    // Check if user has already made a choice
    const cookieChoice = localStorage.getItem('cookieConsent');
    if (cookieChoice) {
        // User has already made a choice, don't show banner
        return;
    }

    // Show banner after 1 second delay
    setTimeout(() => {
        banner.classList.add('show');
    }, 1000);

    // Handle accept button
    acceptBtn.addEventListener('click', () => {
        localStorage.setItem('cookieConsent', 'accepted');
        hideCookieBanner();
    });

    // Handle decline button
    declineBtn.addEventListener('click', () => {
        localStorage.setItem('cookieConsent', 'declined');
        hideCookieBanner();
    });

    function hideCookieBanner() {
        banner.classList.remove('show');
        // Remove banner from DOM after animation completes
        setTimeout(() => {
            banner.style.display = 'none';
        }, 500);
    }
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Initialize cookie banner
    initCookieBanner();

    // Populate location dropdown
    populateLocationDropdown();

    // Initialize responsive behavior
    updateDeviceBehavior();

    // Initialize map if present
    initMap();

    // Initialize mobile menu
    initMobileMenu();

    // Initialize form validation
    initFormValidation();

    // Initialize event listeners
    initEventListeners();

    // Set initial hazard parameter icon color
    updateHazardParameterIcon();

    // Add resize listener with debounce
    window.addEventListener('resize', debounce(updateDeviceBehavior, 250));
});
