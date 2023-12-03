const video = document.getElementById('video-background');
const muteToggle = document.getElementById('mute-toggle');

muteToggle.addEventListener('click', function() {
  if (video.muted) {
    video.muted = false;
    muteToggle.textContent = 'Mute';
  } else {
    video.muted = true;
    muteToggle.textContent = 'Unmute';
  }
});
