// add in musics
let songs = [];
let currentTrack = null;

// 新加四组音效声
let hoverSounds = [];
let joySounds = [];
let sorrowSounds = [];
let angerSounds = [];

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

// preload musics
function preload() {
  songs[0] = loadSound('libraries/Key.mp3');
  songs[1] = loadSound('libraries/Door.mp3');
  songs[2] = loadSound('libraries/Mice.mp3');
  songs[3] = loadSound('libraries/Mine.mp3');

  // 新加hover音效
  hoverSounds[0] = loadSound('libraries/hover1.mp3');
  hoverSounds[1] = loadSound('libraries/hover2.mp3');
  hoverSounds[2] = loadSound('libraries/hover3.mp3');
  hoverSounds[3] = loadSound('libraries/hover4.mp3');

  // 新加joy音效
  joySounds[0] = loadSound('libraries/joy1.mp3');
  joySounds[1] = loadSound('libraries/joy2.mp3');
  joySounds[2] = loadSound('libraries/joy3.mp3');
  joySounds[3] = loadSound('libraries/joy4.mp3');

  // 新加sorrow音效
  sorrowSounds[0] = loadSound('libraries/drip1.mp3');
  sorrowSounds[1] = loadSound('libraries/drip2.mp3');
  sorrowSounds[2] = loadSound('libraries/drip3.mp3');
  sorrowSounds[3] = loadSound('libraries/drip4.mp3');

  // 新加anger音效
  angerSounds[0] = loadSound('libraries/anger1.mp3');
  angerSounds[1] = loadSound('libraries/anger2.mp3');
  angerSounds[2] = loadSound('libraries/anger3.mp3');
  angerSounds[3] = loadSound('libraries/anger4.mp3');
  angerSounds[4] = loadSound('libraries/anger5.mp3');
  angerSounds[5] = loadSound('libraries/anger6.mp3');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100, 100);
  rectMode(CENTER);
  noStroke();

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
}

// switch songs
function playTrack(index) {
  if (currentTrack && currentTrack.isPlaying()) {
    currentTrack.stop();
  }
  currentTrack = songs[index];
  currentTrack.loop();
}

function draw() {
  background(100);

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
  if (currentEmotion === "joy") {
    radialGradient(
      windowWidth / 2, windowHeight / 1.7, 100,
      windowWidth / 2, windowHeight / 1.7, 800,
      color(260, 95, 95),
      color(50, 70, 100),
      color(320, 65, 85)
    );
  }

  else if (currentEmotion === "sorrow") {
    radialGradient(
      windowWidth / 2, windowHeight / 1.7, 100,
      windowWidth / 2, windowHeight / 1.7, 800,
      color(170, 35, 88),
      color(0, 0, 14),
      color(220, 20, 68)
    );
  }

  else if (currentEmotion === "anger") {
    radialGradient(
      windowWidth / 2, windowHeight / 1.7, 100,
      windowWidth / 2, windowHeight / 1.7, 800,
      color(260, 22, 48),
      color(5, 75, 100),
      color(320, 65, 85)
    );
  }

  else {
    radialGradient(
      windowWidth / 2, windowHeight / 1.7, 100,
      windowWidth / 2, windowHeight / 1.7, 800,
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
    p.alpha -= 1.4;
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
    let jitter = sin(frameCount * 0.16 + i * 2.1 + angle) * 4;

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

//Oragaism made using blob: https://www.youtube.com/watch?v=rX5p-QRP6R4&t=523s
function drawOrganism() {
  push();
  translate(windowWidth / 2, windowHeight / 1.7);
  angleMode(RADIANS);

  noStroke();

  let baseRadius = 250;
  //Cower: shrink radius, amplify noise distortion
  let coweredRadius = baseRadius * map(repelFactor, 0, 1, 1, 1);
  let noiseAmp, noiseSpeed, noiseScale;

  if (currentEmotion === "anger") {
    noiseAmp   = map(repelFactor, 0, 1, 55, 105);  // jagged, volatile
    noiseSpeed = 0.04;                              // fast rippling
    noiseScale = 0.25;                              // tight, dense ripples
  } else if (currentEmotion === "joy") {
    noiseAmp   = map(repelFactor, 0, 1, 20, 70);  // bouncy but smooth
    noiseSpeed = 0.5;                             // medium pace
    noiseScale = 0.08;                              // wide, rolling waves
  } else if (currentEmotion === "sorrow") {
    noiseAmp   = map(repelFactor, 0, 1, 10, 30);  // slow, heavy drooping
    noiseSpeed = 0.005;                             // very slow
    noiseScale = 0.12;                              // gentle undulation
  } else {
    noiseAmp   = map(repelFactor, 0, 1, 30, 80);  // neutral default
    noiseSpeed = 0.01;
    noiseScale = 0.1;
  }

  for (let layer = 10; layer > 0; layer--) {
    let alpha = map(layer, 10, 0, 0, 70);

    fill(0, 0, 12, alpha);

    beginShape();

    let xoff = 0.0;

    for (let a = 0; a < TWO_PI; a += 0.1) {
      let noiseVal = noise(xoff, yoff);
      let offset = map(noiseVal, 0, 1, -noiseAmp, noiseAmp);

      let r = (coweredRadius + offset) * (layer / 10);

      vertex(r * cos(a), r * sin(a));
      xoff += 0.1;
    }

    endShape(CLOSE);
  }

  yoff += 0.01;
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
}


function mousePressed() {
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
// 新加随机播放一个sorrow音效
  let randomIndex = floor(random(4));
  if (!sorrowSounds[randomIndex].isPlaying()) {
    sorrowSounds[randomIndex].play();
  }

  tears.push({
    x: windowWidth / 2 + random(-35, 35),
    y: windowHeight / 1.7 + 80,
    size: random(18, 32),
    speed: random(4, 7),
    alpha: 90
  });
}

function spawnJoySpray() {
  // 新加随机播放一个joy音效
  let randomIndex = floor(random(4));
  if (!joySounds[randomIndex].isPlaying()) {
    joySounds[randomIndex].play();
  }

  let cx = windowWidth / 2;
  let cy = windowHeight / 1.7;

  for (let i = 0; i < 80; i++) {
    let angle = random(TWO_PI);
    let startRadius = random(140, 250);
    let speed = random(1.2, 4.2);

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
  // 新加随机播放一个anger音效
  let randomIndex = floor(random(6));
  if (!angerSounds[randomIndex].isPlaying()) {
    angerSounds[randomIndex].play();
  }

  let laserWeights = [1, 1.5, 2, 3, 5, 8];

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
  
  
  // 新加随机播放一个 hover 音效
    let randomIndex = floor(random(4));
    if (!hoverSounds[randomIndex].isPlaying()) {
      hoverSounds[randomIndex].play();
    }
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