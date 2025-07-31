// Simple song data
const songs = [
    {
        title: "Summer Vibes",
        artist: "Chill Wave",
        duration: "3:45",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
    },
    {
        title: "Study Session",
        artist: "Focus Mode",
        duration: "4:20",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
    },
    {
        title: "Night Drive",
        artist: "Synth Dreams",
        duration: "3:15",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
    }
];

// Player elements
const audio = new Audio();
let currentSongIndex = 0;
let isPlaying = false;

// UI elements
const songTitle = document.getElementById('song-title');
const artist = document.getElementById('artist');
const progressBar = document.getElementById('progress-bar');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const playBtn = document.getElementById('play-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const volumeControl = document.getElementById('volume-control');

// Initialize player
function initPlayer() {
    loadSong(currentSongIndex);
    audio.volume = volumeControl.value;
}

// Load song
function loadSong(index) {
    const song = songs[index];
    songTitle.textContent = song.title;
    artist.textContent = song.artist;
    durationEl.textContent = song.duration;
    audio.src = song.src;
}

// Play song
function playSong() {
    isPlaying = true;
    playBtn.innerHTML = '<i class="fas fa-pause"></i>';
    audio.play();
}

// Pause song
function pauseSong() {
    isPlaying = false;
    playBtn.innerHTML = '<i class="fas fa-play"></i>';
    audio.pause();
}

// Previous song
function prevSong() {
    currentSongIndex--;
    if (currentSongIndex < 0) {
        currentSongIndex = songs.length - 1;
    }
    loadSong(currentSongIndex);
    if (isPlaying) {
        playSong();
    }
}

// Next song
function nextSong() {
    currentSongIndex++;
    if (currentSongIndex > songs.length - 1) {
        currentSongIndex = 0;
    }
    loadSong(currentSongIndex);
    if (isPlaying) {
        playSong();
    }
}

// Update progress bar
function updateProgress() {
    progressBar.value = (audio.currentTime / audio.duration) * 100;
    
    // Update current time
    const minutes = Math.floor(audio.currentTime / 60);
    const seconds = Math.floor(audio.currentTime % 60);
    currentTimeEl.textContent = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
}

// Set progress
function setProgress() {
    audio.currentTime = (progressBar.value / 100) * audio.duration;
}

// Event listeners
playBtn.addEventListener('click', () => {
    isPlaying ? pauseSong() : playSong();
});

prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

progressBar.addEventListener('input', setProgress);
audio.addEventListener('timeupdate', updateProgress);
audio.addEventListener('ended', nextSong);

volumeControl.addEventListener('input', () => {
    audio.volume = volumeControl.value;
});

// Initialize
initPlayer();