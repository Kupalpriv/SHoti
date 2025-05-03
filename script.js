document.addEventListener('DOMContentLoaded', () => {
    const videoPlayer = document.getElementById('videoPlayer');
    const newVideoBtn = document.getElementById('newVideoBtn');
    const username = document.getElementById('username');
    const nickname = document.getElementById('nickname');
    const bio = document.getElementById('bio');
    const loading = document.getElementById('loading');
    const snackbar = document.getElementById('snackbar');

    async function fetchNewVideo() {
        try {
            loading.style.display = 'block';
            newVideoBtn.disabled = true;
            
            const response = await fetch('https://rapido.zetsu.xyz/api/shoti');
            const data = await response.json();
            
            videoPlayer.src = data.video_url;
            username.textContent = `@${data.username}`;
            nickname.textContent = data.nickname || 'No nickname';
            bio.textContent = data.bio || "No bio available";
            
            videoPlayer.onloadeddata = () => {
                loading.style.display = 'none';
                videoPlayer.play();
            }
        } catch (error) {
            showSnackbar('⚠️ Failed to load video. Trying again...');
            console.error('Error:', error);
            setTimeout(fetchNewVideo, 2000);
        } finally {
            newVideoBtn.disabled = false;
        }
    }

    function showSnackbar(message) {
        snackbar.textContent = message;
        snackbar.style.display = 'block';
        setTimeout(() => snackbar.style.display = 'none', 3000);
    }

    
    newVideoBtn.addEventListener('click', fetchNewVideo);
    document.addEventListener('keypress', (e) => {
        if (e.code === 'Space' || e.code === 'Enter') fetchNewVideo();
    });

    
    fetchNewVideo();
});
