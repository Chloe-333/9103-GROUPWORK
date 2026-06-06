
let yoff = 0.0;
let circles = [];
let tears = [];
let ripples = [];
let joySprays = [];
let angerLasers = [];
let currentEmotion = "neutral";

let repelFactor = 0;
let flinchTimer = 0;
let baseRadius = 250;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100, 100);
  rectMode(CENTER);
  noStroke();
  initTimeMechanic();
  //header
  let overlay = createDiv('');
  overlay.class('overlay');

  //title or a name for our concept
  let title = createElement('h1', '');
  title.html('The Dark<br>Antimatter');
  title.class('title-text');
  title.parent(overlay);

  //using storytelling to add context to the concept
  let desc = createElement(
    'p',
    "A relic of the Big Bang, dormant for 13.8 billion years inside a collapsing star 120,000 light years beyond the Milky Way. Detected in 2312 by UESS Collusionary, it defies physics: structured energy patterns, response latency of 0.3 seconds, syntax matching human neural frequency. It isn't reacting. It's answering. Establish contact."
  );
  desc.class('desc-text');
  desc.parent(overlay);

  // Stats bar — each item as a span so flex spaces them evenly
  let statsBar = createDiv('');
  statsBar.class('stats-bar');
  statsBar.parent(overlay);

  let statsItems = [
    'Temp: -420 degree celsius',
    '44678',
    'Collusion: not detected',
    'Force: CENTRIFUGAL',
    'Current distance from the Earth: 14,785,293,290 KM'
  ];

  statsItems.forEach(item => {
    let span = createElement('span', item);
    span.parent(statsBar);
  });


// play music when image loaded
 playTrack(0);
 initAudio();
}

function draw() {
  background(100);
  updateTimeMechanic();

  drawEmotionBackground();
  noStroke();
  rect(windowWidth / 2, windowHeight / 2, windowWidth, windowHeight);

  drawCircles();
  drawJoySprays();

  if (currentEmotion === "anger") {
    drawIdleAngerLasers();
  }

  mouseHover();

  drawAngerLasers();
  drawOrganism();
  drawTears();
  drawRipples();
  drawInstructions();
}

//changing background gradient argument using if, else if and else
function drawEmotionBackground() {
  //Audio drives background radius: bass energy expands the gradient
  let bassEnergy = getBassEnergy();
  let gradientRadius = map(bassEnergy, 0, 255, 700, 1000);
  
  if (currentEmotion === "joy") {
    radialGradient(
      windowWidth / 2, windowHeight / 1.7, 100,
      windowWidth / 2, windowHeight / 1.7, gradientRadius,
      color(260, 95, 95),
      color(50, 70, 100),
      color(320, 65, 85)
    );
  }

  else if (currentEmotion === "sorrow") {
    radialGradient(
      windowWidth / 2, windowHeight / 1.7, 100,
      windowWidth / 2, windowHeight / 1.7, gradientRadius,
      color(170, 35, 88),
      color(0, 0, 14),
      color(220, 20, 68)
    );
  }

  else if (currentEmotion === "anger") {
    radialGradient(
      windowWidth / 2, windowHeight / 1.7, 100,
      windowWidth / 2, windowHeight / 1.7, gradientRadius,
      color(260, 22, 48),
      color(5, 75, 100),
      color(320, 65, 85)
    );
  }

  else {
    radialGradient(
      windowWidth / 2, windowHeight / 1.7, 100,
      windowWidth / 2, windowHeight / 1.7, gradientRadius,
      color(261, 30, 50),
      color(171, 35, 94),
      color(5, 47, 99)
    );
  }
}


function drawCircles() {
  noStroke();

  for (let c of circles) {
    fill(14);
    circle(c.x, c.y, c.size);

    let angle = noise(c.noiseOffset) * TWO_PI * 4;
    let speed = 2;

    c.x -= cos(angle) * speed;
    c.y -= sin(angle) * speed;

    c.noiseOffset += 0.01;
  }
}

function drawJoySprays() {
  noStroke();

  for (let p of joySprays) {
    fill(p.h, p.s, p.b, p.alpha);
    circle(p.x, p.y, p.size);

    let noiseAngle = noise(p.noiseOffset) * TWO_PI * 2;

    p.x += p.vx + cos(noiseAngle) * 0.6;
    p.y += p.vy + sin(noiseAngle) * 0.6;

    p.size += 0.08;
    p.alpha -= 0.25;
    p.noiseOffset += 0.02;
  }

  joySprays = joySprays.filter(p => p.alpha > 0);
}

function drawIdleAngerLasers() {
  let cx = windowWidth / 2;
  let cy = windowHeight / 1.7;
  let time = frameCount * 0.04;

  for (let i = 0; i < 16; i++) {
    let baseAngle = map(i, 0, 16, 0, TWO_PI);
    let a = baseAngle + sin(time + i * 0.7) * 0.04;

    let idleWeights = [0.8, 1, 1.2, 1.5, 2, 3, 5];
    let idleWeight = random(idleWeights);

    drawSharpLaser(
      cx, cy,
      a,
      245,
      max(width, height) * 0.75,
      180, 55, 100,
      42,
      idleWeight
    );
  }

  noStroke();
}

function drawAngerLasers() {
  for (let l of angerLasers) {
    let age = millis() - l.birth;
    let life = 6500;
    let fade = map(age, 0, life, 100, 0);

    if (age > life) {
      l.dead = true;
      continue;
    }

    let cx = windowWidth / 2;
    let cy = windowHeight / 1.7;

    let a = l.angle + sin(frameCount * 0.08 + l.noiseOffset) * 0.025;

    drawSharpLaser(
      cx, cy,
      a,
      90,
      max(width, height) * 0.9,
      345, 65, 100,
      fade,
      l.weight
    );
  }

  angerLasers = angerLasers.filter(l => !l.dead);
  noStroke();
}

function drawSharpLaser(cx, cy, angle, startR, endR, h, s, b, alpha, weight) {
  let segments = 5;

  noFill();

  stroke(h, s, b, alpha * 0.22);
  strokeWeight(weight + 8);
  beginShape();

  for (let i = 0; i <= segments; i++) {
    let t = i / segments;
    let r = lerp(startR, endR, t);
    let jitter = sin(frameCount * 0.16 + i * 2.1 + angle) * 5;

    let x = cx + cos(angle) * r + cos(angle + HALF_PI) * jitter;
    let y = cy + sin(angle) * r + sin(angle + HALF_PI) * jitter;

    vertex(x, y);
  }

  endShape();

  stroke(h, s, b, alpha);
  strokeWeight(weight);
  beginShape();

  for (let i = 0; i <= segments; i++) {
    let t = i / segments;
    let r = lerp(startR, endR, t);
    let jitter = sin(frameCount * 0.16 + i * 2.1 + angle) * 2;

    let x = cx + cos(angle) * r + cos(angle + HALF_PI) * jitter;
    let y = cy + sin(angle) * r + sin(angle + HALF_PI) * jitter;

    vertex(x, y);
  }

  endShape();

  noStroke();
}

// Organism made using blob: https://www.youtube.com/watch?v=rX5p-QRP6R4&t=523s
function drawOrganism() {
  push();
  translate(windowWidth / 2, windowHeight / 1.7);
  angleMode(RADIANS);

  noStroke();

  // Apply lifecycle, breathing, and heartbeat scales to base radius
  let timedBaseRadius = getTimedRadius(250);
  
  // Cower: shrink radius, amplify noise distortion
  let coweredRadius = timedBaseRadius * map(repelFactor, 0, 1, 1, 1);
  let targetNoiseAmp, noiseSpeed, noiseScale;

   // Get bass energy from current background music to drive organism
  let bassEnergy = getBassEnergy();
  let audioAmp = map(bassEnergy, 0, 255, 0, 60);

  if (currentEmotion === "anger") {
    targetNoiseAmp = map(repelFactor, 0, 1, 55, 105) + audioAmp;
    noiseSpeed     = 0.04;
    noiseScale     = 0.25;
  } else if (currentEmotion === "joy") {
    targetNoiseAmp = map(repelFactor, 0, 1, 20, 70) + audioAmp;
    noiseSpeed     = 0.035;
    noiseScale     = 0.08;
  } else if (currentEmotion === "sorrow") {
    targetNoiseAmp = map(repelFactor, 0, 1, 10, 30) + audioAmp;
    noiseSpeed     = 0.005;
    noiseScale     = 0.12;
  } else {
    targetNoiseAmp = map(repelFactor, 0, 1, 30, 80) + audioAmp;
    noiseSpeed     = 0.01;
    noiseScale     = 0.1;
  }

  // Calculate baseline neutral noise for decay fallback
  let neutralNoiseAmp = map(repelFactor, 0, 1, 30, 80);

  // Blend current emotion noise back to neutral noise based on decay progress
  let finalNoiseAmp = getDecayedNoiseAmp(targetNoiseAmp, neutralNoiseAmp);

  // Get current alpha limit from lifecycle state
  let maxLifecycleAlpha = getLifecycleAlpha();

  for (let layer = 10; layer > 0; layer--) {
    // Dynamic alpha mapping driven by lifecycle state
    let alpha = map(layer, 10, 0, 0, maxLifecycleAlpha);

    // Audio changes color of the organism based on bass energy
    let bassEnergy = getBassEnergy();
    let hueShift = map(bassEnergy, 0, 255, 0, 40);

    let baseHue;
    if (currentEmotion === "joy")    baseHue = 260;
    else if (currentEmotion === "sorrow") baseHue = 185;
    else if (currentEmotion === "anger")  baseHue = 5;
    else baseHue = 261;

    let audioBrightness = map(bassEnergy, 0, 255, 12, 40);

    if (currentEmotion === "anger") {
      fill(350, 40, 40, alpha);
    } else {
      fill(baseHue + hueShift, 65, audioBrightness, alpha);
    }
    console.log(alpha);

    beginShape();

    let xoff = 0.0;

    for (let a = 0; a < TWO_PI; a += 0.1) {
      let noiseVal = noise(xoff, yoff);
      // Use decayed finalNoiseAmp for shape offsetting
      let offset = map(noiseVal, 0, 1, -finalNoiseAmp, finalNoiseAmp);

      let r = (coweredRadius + offset) * (layer / 10);

      vertex(r * cos(a), r * sin(a));
      xoff += noiseScale; // Restored original project variable step
    }

    endShape(CLOSE);
  }

  yoff += noiseSpeed; // Driven by emotion-specific speed
  pop();
}

function drawTears() {
  let waterLevel = windowHeight / 1.7 + 280;

  noStroke();

  for (let t of tears) {
    fill(185, 45, 95, t.alpha);
    ellipse(t.x, t.y, t.size * 0.55, t.size * 1.5);

    t.y += t.speed;

    if (t.y >= waterLevel) {
      ripples.push({
        x: t.x,
        y: waterLevel,
        w: 20,
        h: 6,
        alpha: 90
      });

      t.dead = true;
    }
  }

  tears = tears.filter(t => !t.dead);
}

function drawRipples() {
  noFill();

  for (let r of ripples) {
    stroke(185, 45, 95, r.alpha);
    strokeWeight(2);

    ellipse(r.x, r.y, r.w, r.h);
    ellipse(r.x, r.y, r.w * 1.6, r.h * 1.6);

    r.w += 5;
    r.h += 1.2;
    r.alpha -= 2;
  }

  ripples = ripples.filter(r => r.alpha > 0);

  noStroke();
}

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

// function spawnCircle(x, y) {
//   circles.push({
//     x: windowWidth / 2,
//     y: windowHeight / 2,
//     size: random(15, 60),
//     noiseOffset: random(1000)
//   });
// }

function spawnTear() {
  // a random sorrow sound
  playSorrowSound();

  tears.push({
    x: windowWidth / 2 + random(-35, 35),
    y: windowHeight / 1.7 + 80,
    size: random(18, 32),
    speed: random(4, 7),
    alpha: 90
  });
}

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

//https://p5js.org/reference/p5.Element/mouseOver/
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

// https://www.youtube.com/watch?v=-MUOweQ6wac&t=1s
// gradients used in the background
function radialGradient(sX, sY, sR, eX, eY, eR, colorS, colorE, colorM) {
  let gradient = drawingContext.createRadialGradient(
    sX, sY, sR,
    eX, eY, eR
  );

  gradient.addColorStop(0, colorS);
  gradient.addColorStop(0.5, colorM);
  gradient.addColorStop(1, colorE);

  drawingContext.fillStyle = gradient;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}