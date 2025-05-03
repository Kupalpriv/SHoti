document.addEventListener('DOMContentLoaded', () => {
    const videoPlayer = document.getElementById('videoPlayer');
    const newVideoBtn = document.getElementById('newVideoBtn');
    const username = document.getElementById('username');
    const nickname = document.getElementById('nickname');
    const bio = document.getElementById('bio');

    async function fetchNewVideo() {
        try {
            newVideoBtn.disabled = true;
            const response = await fetch('https://rapido.zetsu.xyz/api/shoti');
            const data = await response.json();
            
            videoPlayer.src = data.video_url;
            username.textContent = `@${data.username}`;
            nickname.textContent = data.nickname;
            bio.textContent = data.bio || "No bio available";
            
            videoPlayer.load();
            videoPlayer.play();
        } catch (error) {
            console.error('Error fetching video:', error);
            alert('Failed to load video. Please try again.');
        } finally {
            newVideoBtn.disabled = false;
        }
    }

    newVideoBtn.addEventListener('click', fetchNewVideo);
    fetchNewVideo(); // Load initial video
});
