// Audio variables
let fft;
let smoothing = 0.8;
let numBins = 128;
let songs = [];
let currentTrack = null;
let hoverSounds = [];
let joySounds = [];
let sorrowSounds = [];
let angerSounds = [];
let shakingSounds = [];

// 1. Preload: load all sounds before the sketch starts
function preload() {
  // neutral
  songs[0] = loadSound('libraries/Key.mp3');
  // joy
  songs[1] = loadSound('libraries/Door.mp3');
  // sorrow
  songs[2] = loadSound('libraries/Mice.mp3');
  // anger
  songs[3] = loadSound('libraries/Mine.mp3');

  // hover
  hoverSounds[0] = loadSound('libraries/hover1.mp3');
  hoverSounds[1] = loadSound('libraries/hover2.mp3');
  hoverSounds[2] = loadSound('libraries/hover3.mp3');
  hoverSounds[3] = loadSound('libraries/hover4.mp3');

  // chime for joy
  joySounds[0] = loadSound('libraries/joy1.mp3');
  joySounds[1] = loadSound('libraries/joy2.mp3');
  joySounds[2] = loadSound('libraries/joy3.mp3');
  joySounds[3] = loadSound('libraries/joy4.mp3');
  
  // drip for sorrow
  sorrowSounds[0] = loadSound('libraries/drip1.mp3');
  sorrowSounds[1] = loadSound('libraries/drip2.mp3');
  sorrowSounds[2] = loadSound('libraries/drip3.mp3');
  sorrowSounds[3] = loadSound('libraries/drip4.mp3');

  // zap for anger
  angerSounds[0] = loadSound('libraries/anger1.mp3');
  angerSounds[1] = loadSound('libraries/anger2.mp3');
  angerSounds[2] = loadSound('libraries/anger3.mp3');
  angerSounds[3] = loadSound('libraries/anger4.mp3');
  angerSounds[4] = loadSound('libraries/anger5.mp3');
  angerSounds[5] = loadSound('libraries/anger6.mp3');

  // shaking for hover
  shakingSounds[0] = loadSound('libraries/shaking1.mp3');
  shakingSounds[1] = loadSound('libraries/shaking2.mp3');
  shakingSounds[2] = loadSound('libraries/shaking3.mp3');
  shakingSounds[3] = loadSound('libraries/shaking4.mp3');
}

// 2. Songs switching: Switch background music track by changing emotion
function playTrack(index) {
  if (currentTrack && currentTrack.isPlaying()) {
    currentTrack.stop();
  }
  currentTrack = songs[index];
  currentTrack.loop();

  //Connect fft to current track
  //AI Acknowledgement 3 Dynamic FFT connection
  if(fft){
    currentTrack.connect(fft);
  }
}

// 3. Hover sounds: Play a random hover sound on flinch
function playHoverSound() {
  let randomIndex = floor(random(4));
  if (!hoverSounds[randomIndex].isPlaying()) {
    hoverSounds[randomIndex].play();
  }
}

// 4. Joy sounds: Play a random joy sound on click
function playJoySound() {
  let randomIndex = floor(random(4));
  if (!joySounds[randomIndex].isPlaying()) {
    joySounds[randomIndex].play();
  }
}

// 5. Sorrow sounds: Play a random sorrow sound on click
function playSorrowSound() {
  let randomIndex = floor(random(4));
  if (!sorrowSounds[randomIndex].isPlaying()) {
    sorrowSounds[randomIndex].play();
  }
}

// 6. Anger sounds: Play a random anger sound on click
function playAngerSound() {
  let randomIndex = floor(random(6));
  if (!angerSounds[randomIndex].isPlaying()) {
    angerSounds[randomIndex].play();
  }
}

// 7. Shaking sounds: Stop all shaking sounds
function stopAllShaking() {
  for (let i = 0; i < shakingSounds.length; i++) {
    if (shakingSounds[i].isPlaying()) {
      shakingSounds[i].stop();
    }
  }
}

// 8. FFT: Initalise FFT annalyser in setup()
function initAudio() {
  fft = new p5.FFT(smoothing, numBins);
  currentTrack.connect(fft);
}

// 9. FFT: Return the bass frequency energy level to match visual effects
function getBassEnergy() {
  if (!fft) return 0;
  fft.analyze();
  return fft.getEnergy("bass");
}
