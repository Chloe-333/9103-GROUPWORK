// noise-mechanic.js

let yoff = 0.0;
let repelFactor = 0;
let flinchTimer = 0;
let baseRadius = 250;

let circles = [];
let tears = [];
let ripples = [];
let joySprays = [];
let angerLasers = [];
let currentEmotion = "neutral";
let lastEmotion = "neutral";

// ----------------------------------------
// 1. ORGANISM
// Draws the central blob using layered Perlin noise.
// Shape, speed, and amplitude are driven by emotion state,
// audio bass energy, and lifecycle/breathing/heartbeat scales.
// Organism made using blob using this tutorial: https://www.youtube.com/watch?v=rX5p-QRP6R4&t=523s
// AI Acknowledgement - 1
// AI Acknowledgement - 4
// ----------------------------------------

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
  // AI Acknowledgement 4: Bass energy to visual mapping
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
// ----------------------------------------
// 2. BACKGROUND GRADIENT
// Draws a radial gradient behind the organism.
// Called from sketch.js drawEmotionBackground() with
// emotion-specific colour arguments.
// Reference: https://www.youtube.com/watch?v=-MUOweQ6wac&t=1s
// ----------------------------------------
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

// ----------------------------------------
// 3. CIRCLES (neutral state)
// Draws drifting noise-steered circles on click.
// ----------------------------------------
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

// ----------------------------------------
// 4. JOY SPRAYS
// Draws expanding colour particles on click in joy state.
// Particles are spawned by spawnJoySpray() in input-mechanic.js.
// ----------------------------------------
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

// ----------------------------------------
// 5. IDLE ANGER LASERS
// Draws 16 ambient laser beams radiating from the organism
// while anger state is active. Called every frame from draw().
// ----------------------------------------
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

// ----------------------------------------
// 6. CLICK ANGER LASERS
// Draws click-spawned laser beams that fade over 6500ms.
// Lasers are spawned by spawnAngerLasers() in input-mechanic.js.
// ----------------------------------------
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

// ----------------------------------------
// 7. LASER RENDERER
// Shared helper used by both drawIdleAngerLasers() and drawAngerLasers().
// Draws a jittered two-pass laser beam (glow + core) between two radii.
// AI Acknowledgement: ChatGPT assisted organising laser logic into a reusable helper.
// ----------------------------------------
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

// ----------------------------------------
// 8. TEARS (sorrow state)
// Draws falling tear drops from the organism centre.
// Tears are spawned by spawnTear() in input-mechanic.js.
// When a tear reaches waterLevel it pushes a ripple.
// ----------------------------------------
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
      w: t.size * 1.5,
      h: t.size * 0.5,
      growth: map(t.size, 12, 26, 2, 6),
      alpha: 90
    });

      t.dead = true;
    }
  }

  tears = tears.filter(t => !t.dead);
}

// ----------------------------------------
// 9. RIPPLES (sorrow state)
// Draws expanding ellipse ripples when tears hit the water level.
// ----------------------------------------
function drawRipples() {
  noFill();

  for (let r of ripples) {
    stroke(185, 45, 95, r.alpha);
    strokeWeight(2);

    ellipse(r.x, r.y, r.w, r.h);
    ellipse(r.x, r.y, r.w * 1.6, r.h * 1.6);

   r.w += r.growth;
    r.h += r.growth * 0.3;
    r.alpha -= 2;
  }

  ripples = ripples.filter(r => r.alpha > 0);

  noStroke();
}

