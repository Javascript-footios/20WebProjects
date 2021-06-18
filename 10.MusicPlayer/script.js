const musicContainer = document.getElementById("music-container");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

const audio = document.getElementById("audio");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");
const title = document.getElementById("title");
const cover = document.getElementById("cover");

// Song titles
const songs = ["hey", "summer", "ukulele"];

// Keep track of song
let songIndex = 1;

// Initially load song details into DOM
loadSong(songs[songIndex]);

// Update song details
function loadSong(song) {
  title.innerText = song;
  audio.src = `music/${song}.mp3`;
  cover.src = `images/${song}.jpg`;
}

// mine
// function playSong0() {
//   musicContainer.classList.toggle("play");
//   const playPause = musicContainer.classList.contains("play")
//     ? "pause"
//     : "play";
//   playBtn.innerHTML = ` <span class="fas fa-${playPause}"></span>`;
//   console.log(playPause);
//   if (playPause === "pause") audio.play;
//   else audio.pause;
// }

// Play song
function playSong() {
  musicContainer.classList.add("play");
  playBtn.querySelector("span.fas").classList.remove("fa-play");
  playBtn.querySelector("span.fas").classList.add("fa-pause");
  audio.play();
}

function pauseSong() {
  musicContainer.classList.remove("play");
  playBtn.querySelector("span.fas").classList.remove("fa-pause");
  playBtn.querySelector("span.fas").classList.add("fa-play");
  playBtn.querySelector;
  audio.pause();
}

function prevSong() {
  songIndex--;
  if (songIndex < 0) songIndex = songs.length - 1;
  loadSong(songs[songIndex]);
  audio.play();
}

function nextSong() {
  songIndex++;
  if (songIndex > songs.length - 1) songIndex = 0;
  loadSong(songs[songIndex]);
  audio.play();
}

// mine
// function updateProgress() {
//   const prog = (audio.currentTime / audio.duration) * 100;
//   progress.style.width = `${prog}%`;
// }

function updateProgress(e) {
  // srcElement is deprecated!!!
  const { duration, currentTime } = e.srcElement;
  const prog = (audio.currentTime / audio.duration) * 100;

  progress.style.width = `${prog}%`;
}
// Events
// playBtn.addEventListener("click", playSong0);
playBtn.addEventListener("click", () => {
  const isPlaying = musicContainer.classList.contains("play");
  if (isPlaying) pauseSong();
  else playSong();
});

function setProgress(e) {
  const totalWidth = this.clientWidth;
  const offset = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (offset / totalWidth) * duration;
}

// Change song
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);

// Update progress
audio.addEventListener("timeupdate", updateProgress);

// Click on progress
progressContainer.addEventListener("click", setProgress);

// Song ends
audio.addEventListener("ended", nextSong);
