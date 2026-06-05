// Inicializace mapy trasy - zoom tlačítka vpravo dole
var mapTrasa = L.map('mapTrasa', {
    zoomControl: false  // Vypnout výchozí zoom
});

// NOVÉ - zoom tlačítka vpravo dole
L.control.zoom({
    position: 'bottomright'
}).addTo(mapTrasa);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap'
}).addTo(mapTrasa);

// Červená trasa z trasaBody
var polyline = L.polyline(trasaBody, {
    color: 'red',
    weight: 4,
    opacity: 0.8
}).addTo(mapTrasa);

// Automatické vycentrování a zoom podle trasy
mapTrasa.fitBounds(polyline.getBounds(), {
    padding: [20, 20]
});

// Start marker
L.marker([50.465403, 15.306016])
    .addTo(mapTrasa)
    .bindPopup('<b>Start</b><br>Začátek trasy');

// Cíl marker
L.marker([50.466404, 15.340512])
    .addTo(mapTrasa)
    .bindPopup('<b>Cíl</b><br>Konec trasy');

// Ikony zastávek
var checkpointIcon = L.divIcon({
    className: '',
    html: '<div style="background:#1976D2; color:white; border-radius:50%; width:32px; height:32px; display:flex; align-items:center; justify-content:center; font-size:18px; border:2px solid white; box-shadow:0 2px 4px rgba(0,0,0,0.5);">🍽️</div>',
    iconSize: [32, 32],
    iconAnchor: [16, 16]
});

var swimmingIcon = L.divIcon({
    className: '',
    html: '<div style="background:#00BCD4; color:white; border-radius:50%; width:32px; height:32px; display:flex; align-items:center; justify-content:center; font-size:18px; border:2px solid white; box-shadow:0 2px 4px rgba(0,0,0,0.5);">🏊</div>',
    iconSize: [32, 32],
    iconAnchor: [16, 16]
});

var checkpoints = [
    { lat: 50.4838778, lng: 15.2548639, name: "Bistro pod Kapličkou", info: "5 km od startu, 28 km do cíle", swimming: false },
    { lat: 50.5027889, lng: 15.2027003, name: "Chata Nebákov", info: "12 km od startu, 21 km do cíle", swimming: false },
    { lat: 50.5075792, lng: 15.2268133, name: "Křenovský šenk", info: "21 km od startu, 12 km do cíle", swimming: false },
    { lat: 50.4945433, lng: 15.2953706, name: "Občerstvení TřiJedničky", info: "5.6 km do cíle, od startu už nikoho nezajímá", swimming: false },
    { lat: 50.5148453, lng: 15.1867411, name: "Koupání na Věžáku? Do kůůůžííííí", info: "15 km od startu, 18 km do cíle", swimming: true }
];

var checkpointMarkers = [];
var checkpointsVisible = false;

checkpoints.forEach(function(cp) {
    var marker = L.marker([cp.lat, cp.lng], {
        icon: cp.swimming ? swimmingIcon : checkpointIcon
    }).bindPopup('<b>' + cp.name + '</b><br>' + cp.info);
    checkpointMarkers.push(marker);
});

function toggleCheckpoints() {
    var btn = document.querySelector('.btn-primary');
    var list = document.getElementById('checkpointList');
    checkpointsVisible = !checkpointsVisible;
    if (checkpointsVisible) {
        checkpointMarkers.forEach(function(m) { m.addTo(mapTrasa); });
        btn.textContent = '📍 Skrýt zastávky';
        list.style.display = 'block';
    } else {
        checkpointMarkers.forEach(function(m) { m.remove(); });
        btn.textContent = '📍 Zobrazit zastávky';
        list.style.display = 'none';
    }
}
