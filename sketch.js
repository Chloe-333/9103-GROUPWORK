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

