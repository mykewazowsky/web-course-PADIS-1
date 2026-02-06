// Test script for Indonesian locations functionality
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

// Test functions
function testDataStructure() {
    console.log("Testing data structure...");
    const totalLocations = Object.keys(indonesianLocations).length;
    console.log(`Total locations: ${totalLocations}`);

    // Test that all locations have required properties
    let validLocations = 0;
    Object.keys(indonesianLocations).forEach(location => {
        const data = indonesianLocations[location];
        if (data.lat && data.lng && data.populationDensity && data.province) {
            validLocations++;
        } else {
            console.log(`Invalid location data for ${location}`);
        }
    });
    console.log(`Valid locations: ${validLocations}/${totalLocations}`);
}

function testProvinceGrouping() {
    console.log("\nTesting province grouping...");
    const locationsByProvince = {};
    Object.keys(indonesianLocations).forEach(location => {
        const province = indonesianLocations[location].province;
        if (!locationsByProvince[province]) {
            locationsByProvince[province] = [];
        }
        locationsByProvince[province].push(location);
    });

    const sortedProvinces = Object.keys(locationsByProvince).sort();
    console.log(`Found ${sortedProvinces.length} provinces:`);
    sortedProvinces.forEach(province => {
        console.log(`  ${province}: ${locationsByProvince[province].length} locations`);
    });
}

function testPopulationDensity() {
    console.log("\nTesting population density ranges...");
    const densities = Object.values(indonesianLocations).map(loc => loc.populationDensity);
    const minDensity = Math.min(...densities);
    const maxDensity = Math.max(...densities);
    const avgDensity = densities.reduce((a, b) => a + b, 0) / densities.length;

    console.log(`Population density range: ${minDensity} - ${maxDensity} people/hectare`);
    console.log(`Average density: ${avgDensity.toFixed(1)} people/hectare`);
}

function testLocationLookup() {
    console.log("\nTesting location lookup...");
    const testLocations = ["Kota Bandung", "Kota Jakarta Pusat", "Kabupaten Bogor"];

    testLocations.forEach(location => {
        const data = indonesianLocations[location];
        if (data) {
            console.log(`${location}: ${data.province}, Density: ${data.populationDensity}, Coords: (${data.lat}, ${data.lng})`);
        } else {
            console.log(`Location ${location} not found`);
        }
    });
}

// Run tests
console.log("=== Indonesian Locations Test Suite ===\n");
testDataStructure();
testProvinceGrouping();
testPopulationDensity();
testLocationLookup();
console.log("\n=== Test Suite Complete ===");
