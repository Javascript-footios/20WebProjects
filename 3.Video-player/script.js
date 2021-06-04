const video = document.getElementById("video");
const play = document.getElementById("play");
const stop = document.getElementById("stop");
const progress = document.getElementById("progress");
const volume = document.getElementById("volume");
const timestamp = document.getElementById("timestamp");
const volumestamp = document.getElementById("volumestamp");

// Play & pause video
function toggleVideoStatus() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

// Update play/pause icon
function updatePlayIcon() {
  if (video.paused) {
    play.innerHTML = '<span class="fa fa-play fa-2x"></span>';
  } else {
    play.innerHTML = '<span class="fa fa-pause fa-2x"></span>';
  }
}

// Update progress & timestamp
function updateProgress() {
  progress.value = (video.currentTime / video.duration) * 100;

  let mins = Math.floor(video.currentTime / 60);
  if (mins < 10) {
    mins = "0" + String(mins);
  }

  let secs = Math.floor(video.currentTime % 60);
  if (secs < 10) {
    secs = "0" + String(secs);
  }

  timestamp.innerHTML = mins + ":" + secs;
}

// Set video time to progress
function setVideoProgress() {
  video.currentTime = (+progress.value * video.duration) / 100;
}

// Stop Video
function stopVideo() {
  video.currentTime = 0;
  video.pause();
}

// Initial volume
// volume.value = 33; // is set in html
video.volume = volume.value / 100;
volumestamp.innerHTML = 33;

// Adjust volume
function setVideoVolume() {
  video.volume = volume.value / 100;
  volumestamp.innerHTML = volume.value;
}

// Event listeners
video.addEventListener("click", toggleVideoStatus);
video.addEventListener("pause", updatePlayIcon);
video.addEventListener("play", updatePlayIcon);
video.addEventListener("timeupdate", updateProgress);

play.addEventListener("click", toggleVideoStatus);

stop.addEventListener("click", stopVideo);

progress.addEventListener("change", setVideoProgress);
volume.addEventListener("change", setVideoVolume);
