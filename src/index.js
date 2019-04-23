import '@babel/polyfill';
import './css/style.css';

const video = document.getElementById('video');
const mute = document.getElementById('mute');
const playpause = document.getElementById('playpause');
const progress = document.getElementById('progress');
const controls = document.getElementById('video-controls');

controls.setAttribute('data-state', 'visible');

const changeButtonState = (type) => {
  if (type === 'playpause') {
    if (video.paused || video.ended) {
      playpause.setAttribute('data-state', 'play');
    } else {
      playpause.setAttribute('data-state', 'pause');
    }
  } else if (type === 'mute') {
    mute.setAttribute('data-state', video.muted ? 'unmute' : 'mute');
  }
};

const playpauseHandler = (e) => {
  e.preventDefault();
  if (video.paused || video.ended) {
    video.play();
  } else {
    video.pause();
  }
}

video.addEventListener('play', function() {
  changeButtonState('playpause');
});

video.addEventListener('pause', function() {
  changeButtonState('playpause');
});

progress.addEventListener('click', function(e) {
  e.preventDefault();
  const pos = (e.pageX  - (this.offsetLeft + this.offsetParent.offsetLeft)) / this.offsetWidth;
  video.currentTime = pos * video.duration;
});

video.addEventListener('timeupdate', function() {
  if (!progress.getAttribute('max')) {
    progress.setAttribute('max', video.duration);
  }
  progress.value = video.currentTime;
  progressBar.style.width = Math.floor((video.currentTime / video.duration) * 100) + '%';
});

mute.addEventListener('click', function(e) {
  e.preventDefault();
  video.muted = !video.muted;
  changeButtonState('mute');
});

video.addEventListener('click', playpauseHandler);
playpause.addEventListener('click', playpauseHandler);