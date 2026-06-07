// input-mechanic.js
// Requires in sketch.js:
// let lastEmotion = "neutral";

// 1. KEYBOARD INPUT
// Press 0 / 1 / 2 / 3 to switch emotion state.

function keyPressed() {
  circles = [];
  tears = [];
  ripples = [];
  joySprays = [];
  angerLasers = [];

  // Stopping all shaking sounds when switching emotions
  for (let i = 0; i < shakingSounds.length; i++) {
    if (shakingSounds[i].isPlaying()) {
      shakingSounds[i].stop();
    }
  }

  if (key === '0') {
    currentEmotion = "neutral";
    playTrack(0);
  }
  if (key === '1') {
    currentEmotion = "joy";
    playTrack(1);
  }
  if (key === '2') {
    currentEmotion = "sorrow";
    playTrack(2);
  }
  if (key === '3') {
    currentEmotion = "anger";
    playTrack(3);
  }
  onEmotionChanged(currentEmotion);
}

// ------------------------------------------------------------
// 2. MOUSE CLICK INPUT
// Click creates a different visual reaction in each emotion.
// ------------------------------------------------------------
function mousePressed() {
  resetInteractionTimer();

  if (currentEmotion === "sorrow") {
    spawnTear();
  }

  else if (currentEmotion === "joy") {
    spawnJoySpray();
  }

  else if (currentEmotion === "anger") {
    spawnAngerLasers();
  }

  else {
    spawnCircle(mouseX, mouseY);
  }
}


// ------------------------------------------------------------
// 3. SPAWN HELPERS
// These functions create effects that are later drawn by
// sketch.js or other mechanic files.
// ------------------------------------------------------------

// Neutral state: creates a small drifting circle.
// function spawnCircle(x, y) {
//   circles.push({
//     x: windowWidth / 2,
//     y: windowHeight / 2,
//     size: random(15, 60),
//     noiseOffset: random(1000)
//   });
// }

// Sorrow state: creates a falling tear.
function spawnTear() {
  // a random sorrow sound
  playSorrowSound();

  tears.push({
    x: windowWidth / 2 + random(-35, 35),
    y: windowHeight / 1.7 + 80,
    size: random(12, 26),
    speed: random(4, 7),
    alpha: 90
  });
}


// Joy state: creates a burst of coloured particles.
function spawnJoySpray() {
  // a random joy sound
  playJoySound();

  let cx = windowWidth / 2;
  let cy = windowHeight / 1.7;

  for (let i = 0; i < 80; i++) {
    let angle = random(TWO_PI);
    let startRadius = random(140, 250);
    let speed = random(0.8, 2.8);

    let joyHues = [180, 320, 260, 50];

    joySprays.push({
      x: cx + cos(angle) * startRadius,
      y: cy + sin(angle) * startRadius,
      vx: cos(angle) * speed,
      vy: sin(angle) * speed,
      size: random(8, 26),
      h: random(joyHues),
      s: random(55, 95),
      b: random(75, 100),
      alpha: random(45, 80),
      noiseOffset: random(1000)
    });
  }
}


// Anger state: creates laser beams from the centre.
function spawnAngerLasers() {
  // a random anger sound
  playAngerSound();

  let laserWeights = [
  1,
  1.5,
  2,
  3,
  4.5,
  6,
  7
];

  for (let i = 0; i < 4; i++) {
    angerLasers.push({
      angle: random(TWO_PI),
      weight: random(laserWeights),
      birth: millis(),
      noiseOffset: random(1000),
      dead: false
    });
  }
}


// ------------------------------------------------------------
// 4. MOUSE HOVER INPUT
// Called from draw() every frame.
// When the cursor approaches the organism, it triggers:
// - visual distortion through repelFactor
// - a short flinch reaction through flinchTimer
// - hover/shaking sounds if audio is available
// ------------------------------------------------------------
function mouseHover() {
  // Mouse positioning
  let dx = mouseX - windowWidth / 2;
  let dy = mouseY - windowHeight / 1.7;
  let dist = sqrt(dx * dx + dy * dy);

  let hoverThreshold = 300; // how close mouse needs to be
  let targetRepel = dist < hoverThreshold ? map(dist, 0, hoverThreshold, 1, 0) : 0;

  //Flinch: when mouse pointer touches the organism
  if (targetRepel > 0.1 && repelFactor < 0.1) {
    flinchTimer = 15; // frames of sharp flinch

    resetInteractionTimer();
    
    // a random hover sound
    playHoverSound();
  }
  
  // create a loopp layback while the mouse is hovering on the organism
  if (targetRepel > 0) {
    // Stop the old shaking sounds when emotion changes
    if (currentEmotion !== lastEmotion) {
      for (let i = 0; i < shakingSounds.length; i++) {
        if (shakingSounds[i].isPlaying()) {
          shakingSounds[i].stop();
        }
      }
      lastEmotion = currentEmotion;
    }

    let shakingIndex = 0;
    if (currentEmotion === "joy")    shakingIndex = 1;
    if (currentEmotion === "sorrow") shakingIndex = 2;
    if (currentEmotion === "anger")  shakingIndex = 3;

    if (!shakingSounds[shakingIndex].isPlaying()) {
      shakingSounds[shakingIndex].loop();
    }
  }

  if (targetRepel === 0) {
    for (let i = 0; i < shakingSounds.length; i++) {
      if (shakingSounds[i].isPlaying()) {
        shakingSounds[i].stop();
      }
    }
    lastEmotion = currentEmotion;
  }

  if (flinchTimer > 0) {
    repelFactor = min(repelFactor + 0.3, 1.5); 
    flinchTimer--;
  } else {
    // moves away after flinching
    repelFactor = lerp(repelFactor, targetRepel, 0.05);
  }
}


// ------------------------------------------------------------
// 5. INTERACTION INSTRUCTIONS
// Called from draw() to show control instructions.
// ------------------------------------------------------------
function drawInstructions() {
  noStroke();
  fill(0, 0, 15, 70);
  textAlign(CENTER);
  textSize(14);
  textFont('Space mono');

  text(
    'Press 0 = PRIMARY | 1 = JOY | 2 = SORROW | 3 = ANGER | Click to interact',
    width / 2,
    height - 30
  );
}