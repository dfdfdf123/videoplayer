import '@babel/polyfill';
import './css/style.css';

const video = document.getElementById('video');
const mute = document.getElementById('mute');
const playOverlay = document.getElementById('play-overlay');
const repeat = document.getElementById('repeat');
const progress = document.getElementById('progress');
const progressBar = document.getElementById('progress-bar');
const controls = document.getElementById('video-controls');

controls.setAttribute('data-state', 'visible');

const changeButtonState = (type) => {
  const endedState = video.ended ? 'block' : 'none';
  repeat.style.display = endedState;
  const playpauseState = video.paused && !video.ended ? 'block' : 'none';
  playOverlay.style.display = playpauseState;
  if (type === 'playpause') {
    if (video.paused) {
      playOverlay.setAttribute('data-state', 'play');
    } else {
      playOverlay.setAttribute('data-state', 'pause');
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
};

video.addEventListener('play', () => {
  changeButtonState('playpause');
});

video.addEventListener('pause', () => {
  changeButtonState('playpause');
});

video.addEventListener('timeupdate', () => {
  if (!progress.getAttribute('max')) {
    progress.setAttribute('max', video.duration);
  }
  progress.value = video.currentTime;
  progressBar.style.width = `${Math.floor((video.currentTime / video.duration) * 100)}%`;
});

video.addEventListener('click', (e) => {
  e.preventDefault();
  video.pause();
});

progress.addEventListener('click', (e) => {
  e.preventDefault();
  const pos = (e.pageX - (this.offsetLeft + this.offsetParent.offsetLeft)) / this.offsetWidth;
  video.currentTime = pos * video.duration;
});

mute.addEventListener('click', (e) => {
  e.preventDefault();
  video.muted = !video.muted;
  changeButtonState('mute');
});

playOverlay.addEventListener('click', playpauseHandler);

repeat.addEventListener('click', (e) => {
  e.preventDefault();
  video.play();
});
