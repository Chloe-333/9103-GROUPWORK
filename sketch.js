
let yoff = 0.0;
let circles = [];
function setup(){
  createCanvas(windowWidth, windowHeight);
  colorMode (HSB, 360, 100, 100, 100);
  rectMode(CENTER)
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
  let desc = createElement('p', 'A relic of the Big Bang, dormant for 13.8 billion years inside a collapsing star 120,000 light years beyond the Milky Way. Detected in 2312 by UESS Collusionary, it defies physics: structured energy patterns, response latency of 0.3 seconds, syntax matching human neural frequency. It isn t reacting. It s answering. Establish contact.');
  desc.class('desc-text');
  desc.parent(overlay);

  // Stats bar — each item as a span so flex spaces them evenly
  let statsBar = createDiv('');
  statsBar.class('stats-bar');
  statsBar.parent(overlay);

  let statsItems = ['Temp: -420 degree celsius','', 'JOY', 'SORROW', 'ANGER','', 'Current distance from the Earth: 14,785,293,290 KM'];
  statsItems.forEach(item => {
    let span = createElement('span', item);
    span.parent(statsBar);
  });
}

//this function adds radiant gradient fill to the elements
function radialGradient(sX, sY, sR, eX, eY, eR, colorS, colorE, colorM){
  let gradient = drawingContext.createRadialGradient(
    sX, sY, sR, eX, eY, eR
  );
  gradient.addColorStop(0, colorS);     //Start colour: Lavender
  gradient.addColorStop(0.5, colorM);     //Mid colour: Salmon Pink
  gradient.addColorStop(1, colorE);     //End colour: Cyan
 
  drawingContext.fillStyle = gradient;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function mouseDragged() {
  spawnCircle(mouseX, mouseY);
}

function spawnCircle(x, y) {
  circles.push({
    x: windowWidth/2,
    y: windowHeight/2,
    size: random(15, 60),

    // each circle gets its own noise "timeline"
    noiseOffset: random(1000)
  });
}

function draw(){
  background(100);

  //Neutral case colour gradient
  radialGradient(
    windowWidth/2, windowHeight/1.7, 100,
    windowWidth/2, windowHeight/1.7, 800,
    color(261, 30, 50),     //Lavender: end colour
    color(171, 35, 94),     //Cyan: start colour
    color(5, 47, 99),     //Salmon pink: Middle colour
  );

  //background
  rect(windowWidth/2, windowHeight/2, windowWidth, windowHeight)

for (let c of circles) {
    fill(14);
    circle(c.x, c.y, c.size);

    // Perlin noise-based direction
    let angle = noise(c.noiseOffset) * TWO_PI * 4;

    let speed = 2;

    c.x -= cos(angle) * speed;
    c.y -= sin(angle) * speed;

    // slowly evolve noise over time
    c.noiseOffset += 0.01;
  }

  //the oganism 
  push();
  translate(windowWidth / 2, windowHeight / 1.7);
  angleMode(RADIANS);

  let baseRadius = 250;

//adding concentric rings for depth and gradient effect
  for (let layer = 10; layer > 0; layer--) {
  let alpha = map(layer, 10, 0, 0, 70);

  fill(0, 0, 12, alpha); // dark glow layers

  // https://www.youtube.com/watch?v=rX5p-QRP6R4&t=523s
  beginShape(); //creates a blob using perlin noise

  let xoff = 0.0;

  for (let a = 0; a < TWO_PI; a += 0.1) {

    let noiseVal = noise(xoff, yoff);
    let offset = map(noiseVal, 0, 1, -30, 30);

    let r = (baseRadius + offset) * (layer / 10);

    let x = r * cos(a);
    let y = r * sin(a);

    vertex(x, y);
    xoff += 0.1;
   
  }

  endShape(CLOSE);
}
 yoff += 0.01;
pop();


}

// let angle = 0;
// let noiseT = 0;
// let osc1, osc2;
// let audioReady = false;

// function setup() {
//   createCanvas(600, 600);
//   colorMode(HSB, 360, 100, 100, 100);
//   angleMode(RADIANS);
//   textFont('monospace');
//   textSize(12);
//   textAlign(CENTER, CENTER);
// }

// // AUDIO 
// function initAudio() {
//   if (audioReady) return;
//   try {
//     osc1 = new p5.Oscillator('sine');
//     osc2 = new p5.Oscillator('triangle');
//     let rev = new p5.Reverb();
//     osc1.connect(rev); rev.process(osc1, 2.5, 1.8);
//     osc2.connect(rev); rev.process(osc2, 2.5, 1.8);
//     osc1.start(); osc1.amp(0);
//     osc2.start(); osc2.amp(0);
//     audioReady = true;
//   } catch (e) {}
// }

// function draw() {
//   // ── time references ──
//   let t        = millis() / 1000;          // seconds elapsed
//   noiseT       = t * 0.22;                 // noise evolution rate
//   let pulse    = sin(t * 1.8) * 0.10 + 1; // breathing: 0.90 ↔ 1.10
//   let colorOff = (t * 9) % 360;            // slow hue drift

//   // background
//   push();
//   resetMatrix();
//   noStroke();
//   fill(0, 0, 4, 28);
//   rect(0, 0, width, height);
//   pop();

//   translate(width / 2, height / 2);

//   // ── mouse-derived parameters ──
//   let mx         = mouseX - width  / 2;
//   let my         = mouseY - height / 2;
//   let mSpeed     = dist(mouseX, mouseY, pmouseX, pmouseY);
//   let rotSpeed   = map(mouseX, 0, width,  0.004, 0.028);
//   let distortion = map(mouseY, 0, height, 0.25,  2.8);

//   // ── advance rotation (time-based) ──
//   angle += rotSpeed;

//   // ── spiral config ──
//   let numArms  = 3;
//   let numBlobs = 22;
//   let minR     = 16;
//   let maxR     = 265;
//   let turns    = 2.65;

//   // ── draw each arm ──
//   for (let arm = 0; arm < numArms; arm++) {
//     let armOff = (TWO_PI / numArms) * arm;

//     for (let i = 0; i < numBlobs; i++) {
//       let frac = i / (numBlobs - 1);
//       let r    = lerp(minR, maxR, frac);
//       let a    = angle + armOff + frac * TWO_PI * turns;
//       let x    = r * cos(a);
//       let y    = r * sin(a);

//       // ── color
//       let hue, sat, bri;
//       if (frac < 0.18) {
//         hue = (340 + colorOff) % 360;
//         sat = 58; bri = 92;
//       } else if (frac < 0.50) {
//         hue = map(frac, 0.18, 0.50,
//                   (340 + colorOff) % 360,
//                   (265 + colorOff) % 360);
//         sat = map(frac, 0.18, 0.50, 48, 22);
//         bri = map(frac, 0.18, 0.50, 92, 96);
//       } else {
//         hue = map(frac, 0.50, 1.0,
//                   (220 + colorOff) % 360,
//                   (175 + colorOff) % 360);
//         sat = map(frac, 0.50, 1.0, 72, 90);
//         bri = map(frac, 0.50, 1.0, 80, 78);
//       }

//       // ── blob size (grows outward, breathes with pulse) ──
//       let bLen = map(r, minR, maxR, 9, 50) * pulse;
//       let bWid = map(r, minR, maxR, 5, 20) * pulse;

//       // ── perlin noise organic wobble (time-based) ──
//       let nv = noise(i * 0.38 + noiseT, arm * 3.2 + 0.7);
//       bLen *= map(nv, 0, 1, 1 - distortion * 0.13, 1 + distortion * 0.13);
//       bWid *= map(noise(i * 0.38 + noiseT + 60, arm * 3.2), 0, 1, 0.72, 1.28);

//       // ── mouse proximity → blobs swell and brighten ──
//       let d = dist(x, y, mx, my);
//       if (d < 95) {
//         let pull = map(d, 0, 95, 0.9, 0);
//         bLen   *= 1 + pull * 0.85;
//         bWid   *= 1 + pull * 0.55;
//         sat     = min(100, sat + pull * 38);
//         bri     = min(100, bri + pull * 14);
//       }

//       // ── draw blob ──
//       fill(hue, sat, bri, 80);
//       noStroke();
//       push();
//       translate(x, y);
//       rotate(a + HALF_PI);              // orient tangent to spiral
//       drawBlob(0, 0, bLen * 0.5, bWid * 0.5, i * 0.3 + noiseT + arm * 1.8);
//       pop();
//     }
//   }

//   // ── audio modulation ──
//   if (audioReady) {
//     let f1       = map(mouseX, 0, width, 100, 720);
//     let movAmp   = map(mSpeed, 0, 30, 0, 0.20);
//     let idleAmp  = 0.032 + sin(t * 0.6) * 0.012;
//     osc1.freq(f1 + noise(noiseT)      * 28, 0.07);
//     osc2.freq(f1 * 1.498 + noise(noiseT + 10) * 18, 0.07); // perfect fifth
//     osc1.amp(idleAmp + movAmp,          0.10);
//     osc2.amp((idleAmp + movAmp) * 0.55, 0.10);
//   }

//   // ── hint text (fades after 5 s) ──
//   if (t < 5.5) {
//     push();
//     resetMatrix();
//     let alpha = map(t, 3.5, 5.5, 90, 0);
//     fill(0, 0, 80, alpha);
//     noStroke();
//     text('click for sound  •  move mouse to interact', width / 2, height - 22);
//     pop();
//   }
// }

// // ── ORGANIC BLOB SHAPE ────────────────────────────
// // Uses curveVertex + perlin noise for wobbly edges
// function drawBlob(cx, cy, rx, ry, seed) {
//   let n   = 14;
//   let pts = [];
//   for (let i = 0; i < n; i++) {
//     let a  = map(i, 0, n, 0, TWO_PI);
//     let nv = noise(cos(a) * 0.65 + seed, sin(a) * 0.65 + seed + 8);
//     let r  = map(nv, 0.3, 0.7, 0.72, 1.30);
//     pts.push({ x: cx + cos(a) * rx * r,
//                y: cy + sin(a) * ry * r });
//   }
//   beginShape();
//   curveVertex(pts[n - 1].x, pts[n - 1].y);
//   for (let p of pts) curveVertex(p.x, p.y);
//   curveVertex(pts[0].x, pts[0].y);
//   curveVertex(pts[1].x, pts[1].y);
//   endShape();
// }

// // ── INPUT HANDLERS ────────────────────────────────
// function mousePressed()  { initAudio(); }
// function touchStarted()  { initAudio(); return false; }

