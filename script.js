// Lista de Músicas
const playlist = [
  {
    title: "Musica Boa",
    artist: "SESI Beats",
    cover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&auto=format&fit=crop",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
  },
  {
    title: "Vibe Noturna",
    artist: "SESI Beats",
    cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&auto=format&fit=crop",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
  },
  {
    title: "Ritmo Urbano",
    artist: "SESI Beats",
    cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
  }
];

// Elementos do DOM
const audio = document.getElementById('audio');
const playBtn = document.getElementById('play-btn');
const playIcon = document.getElementById('play-icon');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const coverImg = document.getElementById('cover-img');
const statusBadge = document.getElementById('status-badge');
const progressBar = document.getElementById('progress-bar');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');

let trackIndex = 0;
let isPlaying = false;

// Carregar música inicial
function loadTrack(track) {
  title.innerText = track.title;
  artist.innerText = track.artist;
  coverImg.src = track.cover;
  audio.src = track.src;
}

// Tocar Música
function playTrack() {
  isPlaying = true;
  audio.play();
  playIcon.classList.remove('fa-play');
  playIcon.classList.add('fa-pause');
  statusBadge.innerText = 'Tocando';
}

// Pausar Música
function pauseTrack() {
  isPlaying = false;
  audio.pause();
  playIcon.classList.remove('fa-pause');
  playIcon.classList.add('fa-play');
  statusBadge.innerText = 'Pausado';
}

// Alternar Tocar/Pausar
playBtn.addEventListener('click', () => {
  isPlaying ? pauseTrack() : playTrack();
});

// Música Anterior
prevBtn.addEventListener('click', () => {
  trackIndex = (trackIndex - 1 + playlist.length) % playlist.length;
  loadTrack(playlist[trackIndex]);
  playTrack();
});

// Próxima Música
nextBtn.addEventListener('click', () => {
  trackIndex = (trackIndex + 1) % playlist.length;
  loadTrack(playlist[trackIndex]);
  playTrack();
});

// Atualizar tempo e barra de progresso
audio.addEventListener('timeupdate', (e) => {
  const { currentTime, duration } = e.target;
  
  if (duration) {
    progressBar.max = duration;
    progressBar.value = currentTime;

    // Formatar e exibir minutos:segundos
    currentTimeEl.innerText = formatTime(currentTime);
    durationEl.innerText = formatTime(duration);
  }
});

// Alterar posição do áudio ao arrastar a barra
progressBar.addEventListener('input', () => {
  audio.currentTime = progressBar.value;
});

// Função auxiliar para formatar os segundos em M:SS
function formatTime(seconds) {
  const min = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60);
  return `${min}:${sec < 10 ? '0' : ''}${sec}`;
}

// Tocar próxima faixa automaticamente quando a atual terminar
audio.addEventListener('ended', () => {
  nextBtn.click();
});

// Inicialização
loadTrack(playlist[trackIndex]);